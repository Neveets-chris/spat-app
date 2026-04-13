import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";

const API_BASE = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const IconBot = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 3v5M9 3h6"/><circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/><path d="M9 18h6"/></svg>;
const IconSend = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const IconMic = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="21" x2="12" y2="17"/><line x1="8" y1="21" x2="16" y2="21"/></svg>;
const IconClose = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IconAlert = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;

export default function Logi() {
  // ← rafraichirMateriaux vient du contexte
  const { materiaux, ajouterMouvement, ajouterMateriau, logements, rafraichirMateriaux } = useApp();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Bonjour ! Je suis **Logi**, votre assistant logistique. Dites-moi par exemple : *«entrée de 50 parpaings»* ou *«quel est le stock actuel ?»*" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(null);
  const [micActive, setMicActive] = useState(false);
  const [micError, setMicError] = useState(null);
  const [alertCount, setAlertCount] = useState(0);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognRef = useRef(null);
  const historyRef = useRef([]);

  useEffect(() => {
    setAlertCount(materiaux.filter((m) => m.stock <= m.seuil).length);
  }, [materiaux]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // ── Appel Django → Groq ───────────────────────────────────────────────────
  const callClaude = async (userMessage) => {
    historyRef.current = [...historyRef.current, { role: "user", content: userMessage }];

    const res = await fetch(`${API_BASE}/api/logi/chat/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: historyRef.current }),
    });

    const data = await res.json();
    const raw = data.content || '{"texte":"Erreur de communication.","action":null,"confirmation":false}';

    let parsed;
    try { parsed = JSON.parse(raw); }
    catch { parsed = { texte: raw, action: null, confirmation: false }; }

    historyRef.current = [...historyRef.current, { role: "assistant", content: raw }];
    return parsed;
  };

  // ── Exécuter une action ───────────────────────────────────────────────────
  const executerAction = async (action) => {
    if (!action) return null;

    if (action.type === "stock") {
      try {
        const res = await fetch(`${API_BASE}/api/logi/stock/`);
        const data = await res.json();
        const lines = data.map((m) => `• **${m.nom}** : ${m.stock} ${m.unite}${m.en_alerte ? " ⚠️" : ""}`).join("\n");
        return `📦 **Stock actuel :**\n${lines}`;
      } catch { return "❌ Impossible de joindre le serveur."; }
    }

    if (action.type === "alertes") {
      try {
        const res = await fetch(`${API_BASE}/api/logi/alertes/`);
        const data = await res.json();
        if (!data.length) return "✅ Aucune alerte — tout est bien approvisionné.";
        return "⚠️ **Stocks bas :**\n" + data.map((m) => `• **${m.nom}** : ${m.stock}/${m.seuil} ${m.unite}`).join("\n");
      } catch { return "❌ Impossible de joindre le serveur."; }
    }

    if (action.type === "mouvement") {
      const d = action.data;
      try {
        const res = await fetch(`${API_BASE}/api/logi/mouvement/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            materiau: d.materiau,
            type: d.typeOp,
            quantite: Number(d.quantite),
            logement: d.logement || logements[0]?.id || "LOG-001",
            fournisseur: d.typeOp === "Entrée" ? (d.fournisseur || "Non précisé") : "",
          }),
        });
        const data = await res.json();
        if (!res.ok) return `❌ Erreur : ${data.error}`;
        const m = data.stock_mis_a_jour;
        // ← Met à jour le contexte React + recharge depuis Django
        ajouterMouvement({
          materiau: d.materiau, type: d.typeOp, quantite: Number(d.quantite),
          date: new Date().toLocaleDateString("fr-FR"),
          logement: d.logement || logements[0]?.id || "LOG-001",
          fournisseur: d.typeOp === "Entrée" ? (d.fournisseur || "Non précisé") : null,
        });
        await rafraichirMateriaux(); // ← recharge la page Matériaux
        return `${d.typeOp === "Entrée" ? "✅" : "📤"} **${d.typeOp} enregistrée** — ${m.nom} : nouveau stock = ${m.stock} ${m.unite}`;
      } catch { return "❌ Impossible de joindre le serveur."; }
    }

    if (action.type === "nouveau_materiau") {
      const d = action.data;
      try {
        const res = await fetch(`${API_BASE}/api/logi/creer-et-mouvement/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d),
        });
        const data = await res.json();
        if (!res.ok) return `❌ Erreur : ${data.error}`;
        const m = data.stock_mis_a_jour;
        // ← Si nouveau matériau, l'ajoute aussi dans le contexte React
        if (data.cree) {
          ajouterMateriau({
            id: m.id, nom: m.nom, categorie: m.categorie,
            stock: m.stock, seuil: m.seuil, unite: m.unite, prix: m.prix,
          });
        }
        ajouterMouvement({
          materiau: m.nom, type: d.typeOp, quantite: Number(d.quantite),
          date: new Date().toLocaleDateString("fr-FR"),
          logement: d.logement || "LOG-001",
          fournisseur: d.fournisseur || "Non précisé",
        });
        await rafraichirMateriaux(); // ← recharge la page Matériaux
        return `✅ **Entrée enregistrée** — ${m.nom} : stock = ${m.stock} ${m.unite}${data.cree ? `\n🆕 Nouveau matériau créé : **${m.nom}** (${m.categorie})` : ""}`;
      } catch { return "❌ Impossible de joindre le serveur."; }
    }

    return null;
  };

  // ── Envoyer un message ────────────────────────────────────────────────────
  const envoyer = async (texte) => {
    const msg = (texte || input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const reponse = await callClaude(msg);

      if (pending && !reponse.confirmation) {
        const resultat = await executerAction(reponse.action || pending.action);
        setPending(null);
        setMessages((prev) => [...prev,
          { role: "assistant", content: reponse.texte },
          ...(resultat ? [{ role: "system", content: resultat }] : []),
        ]);
      } else if (reponse.confirmation && reponse.action) {
        setPending({ action: reponse.action });
        setMessages((prev) => [...prev, { role: "assistant", content: reponse.texte }]);
      } else {
        const resultat = await executerAction(reponse.action);
        setPending(null);
        setMessages((prev) => [...prev,
          { role: "assistant", content: reponse.texte },
          ...(resultat ? [{ role: "system", content: resultat }] : []),
        ]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "❌ Erreur réseau. Vérifiez votre connexion." }]);
    } finally {
      setLoading(false);
    }
  };

  const startMic = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setMicError("Utilisez Chrome ou Edge."); return; }
    setMicError(null);
    const recog = new SR();
    recog.lang = "fr-FR";
    recog.interimResults = false;
    recog.onresult = (e) => { const t = e.results[0][0].transcript; setInput(t); envoyer(t); };
    recog.onerror = () => setMicError("Micro non disponible.");
    recog.onend = () => setMicActive(false);
    recog.start();
    recognRef.current = recog;
    setMicActive(true);
  };
  const stopMic = () => { recognRef.current?.stop(); setMicActive(false); };

  const renderMsg = (msg, i) => {
    const isUser = msg.role === "user";
    const isSystem = msg.role === "system";
    const renderText = (text) =>
      text.split("\n").map((line, li, arr) => {
        const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, pi) => {
          if (part.startsWith("**") && part.endsWith("**")) return <strong key={pi}>{part.slice(2, -2)}</strong>;
          if (part.startsWith("*") && part.endsWith("*")) return <em key={pi}>{part.slice(1, -1)}</em>;
          return part;
        });
        return <span key={li}>{parts}{li < arr.length - 1 && <br />}</span>;
      });

    if (isSystem) return (
      <div key={i} className="my-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
        {renderText(msg.content)}
      </div>
    );
    return (
      <div key={i} className={`flex my-1 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 flex-shrink-0">L</div>}
        <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${isUser ? "bg-blue-600 text-white rounded-tr-sm" : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"}`}>
          {renderText(msg.content)}
        </div>
      </div>
    );
  };

  return (
    <>
      <button onClick={() => setOpen((v) => !v)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center">
        {open ? <IconClose /> : <IconBot />}
        {!open && alertCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{alertCount}</span>}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200" style={{ animation: "logiSlideIn 0.2s ease-out" }}>
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">L</div>
            <div className="flex-1">
              <div className="font-semibold text-sm">Logi — Assistant Logistique</div>
              <div className="text-xs opacity-75 flex items-center gap-1">
                {alertCount > 0 ? <><IconAlert />{alertCount} alerte{alertCount > 1 ? "s" : ""} stock</> : "✓ Stocks OK"}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="opacity-75 hover:opacity-100 transition-opacity"><IconClose /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1 bg-gray-50">
            {messages.map(renderMsg)}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">L</div>
                <div className="flex gap-1 bg-white border border-gray-100 px-3 py-2 rounded-2xl shadow-sm">
                  {[0, 1, 2].map((i) => <span key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}
            {pending && !loading && (
              <div className="flex gap-2 mt-2 justify-end">
                <button onClick={() => { setPending(null); setMessages((p) => [...p, { role: "system", content: "❌ Action annulée." }]); }} className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">Annuler</button>
                <button onClick={() => envoyer("oui, confirme")} className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">✓ Confirmer</button>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {micError && <div className="px-4 py-1 text-xs text-red-500 bg-red-50 text-center">{micError}</div>}

          <div className="px-3 py-3 border-t border-gray-100 bg-white flex items-center gap-2">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && envoyer()}
              placeholder="Tapez une action ou une question…"
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
              disabled={loading} />
            <button onMouseDown={startMic} onMouseUp={stopMic} onTouchStart={startMic} onTouchEnd={stopMic}
              className={`p-2 rounded-xl transition-all ${micActive ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500"}`}
              disabled={loading}><IconMic /></button>
            <button onClick={() => envoyer()} disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"><IconSend /></button>
          </div>
        </div>
      )}
      <style>{`@keyframes logiSlideIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
    </>
  );
}