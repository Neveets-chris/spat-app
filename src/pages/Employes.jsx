import { useState } from "react";
import {
  BarChart2, User, HandCoins, Scale, Anchor, Wrench, Landmark,
  ChevronDown, Pencil, Plus, Trash2, Search, Layers, X, Check,
} from "lucide-react";

const ICON_OPTIONS = [
  { label: "BarChart2", Icon: BarChart2 },
  { label: "User", Icon: User },
  { label: "Handcoins", Icon: HandCoins},
  { label: "Scale", Icon: Scale },
  { label: "Anchor", Icon: Anchor },
  { label: "Wrench", Icon: Wrench },
  { label: "Landmark", Icon: Landmark},
];

const COLOR_OPTIONS = [
  { color: "#dbeafe", iconColor: "#1e40af" },
  { color: "#ede9fe", iconColor: "#5b21b6" },
  { color: "#d1fae5", iconColor: "#065f46" },
  { color: "#fef3c7", iconColor: "#92400e" },
  { color: "#cffafe", iconColor: "#0e7490" },
  { color: "#fee2e2", iconColor: "#991b1b" },
  { color: "#fce7f3", iconColor: "#9d174d" },
];

const INITIAL_DEPARTMENTS = [
  {
    code: "DSIA", name: "DSIA",
    fullName: "Direction Système d'Information et Audit",
    Icon: BarChart2, color: "#dbeafe", iconColor: "#1e40af",
    services: ["Contrôle de gestion", "Audit", "Organisation", "Informatique et télécom"],
  },
  {
    code: "DRH", name: "DRH",
    fullName: "Direction des Ressources Humaines",
    Icon: User, color: "#ede9fe", iconColor: "#5b21b6",
    services: ["Département Développement des RH", "Département Administration et Paie", "Centre de perfectionnement et Appui RH", "Département Médecine et pharmacie"],
  },
  {
    code: "DAF", name: "DAF",
    fullName: "Direction Administrative et Financière",
    Icon: HandCoins, color: "#d1fae5", iconColor: "#065f46",
    services: ["Finances", "Recouvrement", "Comptabilité", "Comptabilité en devises et suivi de projets", "Fiscalité"],
  },
  {
    code: "DAJPP", name: "DAJPP",
    fullName: "Direction des Affaires Juridiques et du Patrimoine Portuaire",
    Icon: Scale, color: "#fef3c7", iconColor: "#92400e",
    services: ["Contrats et Patrimoine Portuaire", "Analyse économique et expansion", "Contentieux", "Facturation"],
  },
  {
    code: "CAP", name: "Direction CAP",
    fullName: "Direction Capitainerie et Affaires Portuaires",
    Icon: Anchor, color: "#cffafe", iconColor: "#0e7490",
    services: ["Trafic maritime", "Police portuaire", "Sécurité espace maritime, secours et intervention", "Armement"],
  },
  {
    code: "DT", name: "DT",
    fullName: "Direction Technique",
    Icon: Wrench, color: "#fee2e2", iconColor: "#991b1b",
    services: ["Maintenances", "Travaux neufs", "Études et planification", "Installation et matériels spécialisés"],
  },
  {
    code: "DAGE", name: "DAGE",
    fullName: "Direction Administration Générale et Engagement",
    Icon: Landmark, color: "#fce7f3", iconColor: "#9d174d",
    services: ["Marketing et Développement", "HST E", "Engagement social (RSE)", "CSCS, Com interne et relations avec les organisations"],
  },
];

/* ─── Modal ─────────────────────────────────────────────────────────── */
function Modal({ title, onClose, onConfirm, children, confirmLabel = "Ajouter", confirmDisabled = false }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#ffffff", borderRadius: "16px",
          width: "100%", maxWidth: "440px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 14px" }}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#111827" }}>{title}</span>
          <button
            onClick={onClose}
            style={{ background: "#f3f4f6", border: "none", borderRadius: "7px", width: "30px", height: "30px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6b7280" }}
          >
            <X size={15} />
          </button>
        </div>

        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: "8px", padding: "14px 20px", borderTop: "1px solid #f3f4f6", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #e5e7eb", background: "#ffffff", color: "#374151", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            style={{
              padding: "8px 18px", borderRadius: "8px", border: "none",
              background: confirmDisabled ? "#d1d5db" : "#1e40af",
              color: "#ffffff", fontSize: "13px", fontWeight: "600",
              cursor: confirmDisabled ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <Check size={13} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "9px 12px", borderRadius: "8px",
          border: "1px solid #e5e7eb", fontSize: "13px",
          color: "#111827", outline: "none", boxSizing: "border-box",
          fontFamily: "'Segoe UI', sans-serif",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#1e40af")}
        onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
      />
    </div>
  );
}

/* ─── Department Card ────────────────────────────────────────────────── */
function DepartmentCard({ dept, onAddService }) {
  const [open, setOpen] = useState(false);
  const { Icon } = dept;

  return (
    <div
      style={{
        background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "14px",
        overflow: "hidden",
        boxShadow: open ? "0 4px 20px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "14px",
          padding: "14px 18px", cursor: "pointer", userSelect: "none",
          background: open ? "#fafafa" : "#ffffff", transition: "background 0.2s",
        }}
      >
        <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: dept.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={20} color={dept.iconColor} strokeWidth={1.8} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>{dept.name}</span>
            <span style={{ fontSize: "11px", fontWeight: "600", color: dept.iconColor, background: dept.color, padding: "2px 8px", borderRadius: "20px" }}>
              {dept.services.length} services
            </span>
          </div>
          <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {dept.fullName}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button title="Modifier" style={{ width: "30px", height: "30px", borderRadius: "7px", border: "none", cursor: "pointer", background: "#d1fae5", color: "#065f46", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pencil size={13} strokeWidth={2} />
          </button>
          <button
            title="Ajouter un service"
            onClick={() => onAddService(dept.code)}
            style={{ width: "30px", height: "30px", borderRadius: "7px", border: "none", cursor: "pointer", background: "#dbeafe", color: "#1e40af", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <Plus size={15} strokeWidth={2.5} />
          </button>
          <button title="Supprimer" style={{ width: "30px", height: "30px", borderRadius: "7px", border: "none", cursor: "pointer", background: "#fee2e2", color: "#991b1b", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>

        <div style={{ width: "30px", height: "30px", borderRadius: "7px", border: "1px solid #e5e7eb", background: "transparent", color: "#6b7280", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ChevronDown size={15} strokeWidth={2} />
        </div>
      </div>

      {/* Dropdown */}
      <div style={{ maxHeight: open ? `${dept.services.length * 56 + 52}px` : "0px", overflow: "hidden", transition: "max-height 0.35s ease", borderTop: open ? "1px solid #f3f4f6" : "none" }}>
        <div style={{ padding: "10px 16px 16px" }}>
          <div style={{ fontSize: "10px", fontWeight: "700", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 2px 8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Layers size={11} color="#9ca3af" />
            Services rattachés
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {dept.services.map((service, si) => (
              <div
                key={si}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", borderRadius: "9px", background: "#f9fafb", border: "1px solid #f3f4f6", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f2f5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#f9fafb")}
              >
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: dept.iconColor, flexShrink: 0, opacity: 0.65 }} />
                <span style={{ fontSize: "13px", fontWeight: "500", color: "#1f2937", flex: 1 }}>{service}</span>
                <span style={{ fontSize: "11px", color: dept.iconColor, background: dept.color, padding: "2px 8px", borderRadius: "20px", fontWeight: "600" }}>S{si + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────── */
export default function DepartementsSPAT() {
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [search, setSearch] = useState("");

  // Modal state
  const [modal, setModal] = useState(null);
  // modal = { type: "service", deptCode } | { type: "department" }

  // Add service form
  const [newServiceName, setNewServiceName] = useState("");

  // Add department form
  const [newDept, setNewDept] = useState({ code: "", name: "", fullName: "", selectedIcon: 0, selectedColor: 0 });

  const openAddService = (deptCode) => {
    setNewServiceName("");
    setModal({ type: "service", deptCode });
  };

  const openAddDepartment = () => {
    setNewDept({ code: "", name: "", fullName: "", selectedIcon: 0, selectedColor: 0 });
    setModal({ type: "department" });
  };

  const closeModal = () => setModal(null);

  const confirmAddService = () => {
    if (!newServiceName.trim()) return;
    setDepartments((prev) =>
      prev.map((d) =>
        d.code === modal.deptCode
          ? { ...d, services: [...d.services, newServiceName.trim()] }
          : d
      )
    );
    closeModal();
  };

  const confirmAddDepartment = () => {
    if (!newDept.code.trim() || !newDept.name.trim()) return;
    const { Icon } = ICON_OPTIONS[newDept.selectedIcon];
    const { color, iconColor } = COLOR_OPTIONS[newDept.selectedColor];
    setDepartments((prev) => [
      ...prev,
      {
        code: newDept.code.trim(),
        name: newDept.name.trim(),
        fullName: newDept.fullName.trim() || newDept.name.trim(),
        Icon,
        color,
        iconColor,
        services: [],
      },
    ]);
    closeModal();
  };

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.services.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const totalServices = departments.reduce((acc, d) => acc + d.services.length, 0);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f3f4f6", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: "700", color: "#111827", margin: 0 }}>
              Gestion des départements
            </h1>
            <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "4px" }}>
              {departments.length} directions — {totalServices} services au total
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <Search size={14} color="#9ca3af" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "9px 14px 9px 30px", borderRadius: "9px", border: "1px solid #e5e7eb", fontSize: "13px", background: "#ffffff", color: "#111827", outline: "none", width: "220px", fontFamily: "'Segoe UI', sans-serif" }}
              />
            </div>

            {/* Add department button */}
            <button
              onClick={openAddDepartment}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 16px", borderRadius: "9px", border: "none", background: "#1e40af", color: "#ffffff", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
            >
              <Plus size={15} strokeWidth={2.5} />
              Nouveau département
            </button>
          </div>
        </div>

        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 24px", color: "#9ca3af", fontSize: "14px", background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb" }}>
              Aucun résultat pour « {search} »
            </div>
          ) : (
            filtered.map((dept) => (
              <DepartmentCard key={dept.code} dept={dept} onAddService={openAddService} />
            ))
          )}
        </div>
      </div>

      {/* ── Modal: Add service ── */}
      {modal?.type === "service" && (
        <Modal
          title={`Ajouter un service — ${departments.find((d) => d.code === modal.deptCode)?.name}`}
          onClose={closeModal}
          onConfirm={confirmAddService}
          confirmDisabled={!newServiceName.trim()}
        >
          <InputField
            label="Nom du service"
            value={newServiceName}
            onChange={setNewServiceName}
            placeholder="Ex : Contrôle qualité"
          />
        </Modal>
      )}

      {/* ── Modal: Add department ── */}
      {modal?.type === "department" && (
        <Modal
          title="Nouveau département"
          onClose={closeModal}
          onConfirm={confirmAddDepartment}
          confirmDisabled={!newDept.code.trim() || !newDept.name.trim()}
        >
          <InputField label="Code" value={newDept.code} onChange={(v) => setNewDept((p) => ({ ...p, code: v }))} placeholder="Ex : DG" />
          <InputField label="Nom affiché" value={newDept.name} onChange={(v) => setNewDept((p) => ({ ...p, name: v }))} placeholder="Ex : Direction Générale" />
          <InputField label="Nom complet (optionnel)" value={newDept.fullName} onChange={(v) => setNewDept((p) => ({ ...p, fullName: v }))} placeholder="Ex : Direction Générale et Stratégie" />

          {/* Icon picker */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>Icône</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {ICON_OPTIONS.map(({ label, Icon }, i) => (
                <button
                  key={label}
                  onClick={() => setNewDept((p) => ({ ...p, selectedIcon: i }))}
                  style={{
                    width: "38px", height: "38px", borderRadius: "9px", border: newDept.selectedIcon === i ? "2px solid #1e40af" : "1px solid #e5e7eb",
                    background: newDept.selectedIcon === i ? "#dbeafe" : "#f9fafb",
                    color: newDept.selectedIcon === i ? "#1e40af" : "#6b7280",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <Icon size={17} strokeWidth={1.8} />
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "600", color: "#374151", display: "block", marginBottom: "8px" }}>Couleur</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {COLOR_OPTIONS.map(({ color, iconColor }, i) => (
                <button
                  key={i}
                  onClick={() => setNewDept((p) => ({ ...p, selectedColor: i }))}
                  style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: color, border: newDept.selectedColor === i ? `3px solid ${iconColor}` : "2px solid transparent",
                    cursor: "pointer", outline: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {newDept.selectedColor === i && <Check size={13} color={iconColor} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {(newDept.name || newDept.code) && (
            <div style={{ padding: "12px 14px", borderRadius: "10px", background: "#f9fafb", border: "1px solid #f3f4f6", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "9px", background: COLOR_OPTIONS[newDept.selectedColor].color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {(() => { const { Icon } = ICON_OPTIONS[newDept.selectedIcon]; return <Icon size={18} color={COLOR_OPTIONS[newDept.selectedColor].iconColor} strokeWidth={1.8} />; })()}
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>{newDept.name || "—"}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>{newDept.fullName || newDept.code || "—"}</div>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}