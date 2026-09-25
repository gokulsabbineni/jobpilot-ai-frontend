import type { LucideIcon } from "lucide-react";

export default function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: LucideIcon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={19}/></div>
      <div className="stat-body"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
    </div>
  );
}