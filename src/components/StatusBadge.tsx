import type { ApplicationStatus } from "../types";

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={`status-badge ${status.toLowerCase().replaceAll(" ", "-")}`}><i />{status}</span>;
}