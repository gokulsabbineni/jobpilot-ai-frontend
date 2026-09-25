import { Bell, Menu, Search } from "lucide-react";

export default function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="header">
      <button className="icon-button menu-button" onClick={onMenu}><Menu size={21}/></button>
      <div className="header-search">
        <Search size={17} />
        <input placeholder="Search jobs, companies, applications..." />
        <kbd>⌘ K</kbd>
      </div>
      <div className="header-actions">
        <button className="icon-button notification"><Bell size={19}/><i /></button>
        <div className="avatar small">GS</div>
      </div>
    </header>
  );
}