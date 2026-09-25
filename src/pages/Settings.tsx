import { Bell, Moon, Shield, User } from "lucide-react";
export default function Settings() {
  return <>
    <div className="page-title-row"><div><span className="eyebrow">Account</span><h1>Settings</h1><p>Manage your profile, notifications and agent controls.</p></div></div>
    <div className="settings-list">
      <section className="panel settings-section"><div className="settings-icon"><User size={19}/></div><div className="settings-content"><span className="eyebrow">Account</span><h2>Profile</h2><div className="form-fields two"><label>Name<input defaultValue="Gokul Sai Sabbineni"/></label><label>Email<input defaultValue="gokul@example.com"/></label></div></div></section>
      <section className="panel settings-section"><div className="settings-icon"><Bell size={19}/></div><div className="settings-content"><span className="eyebrow">Notifications</span><h2>Stay informed</h2>{["Application submitted","Agent needs approval","Agent errors","New matching jobs"].map(x=><div className="toggle-row" key={x}><strong>{x}</strong><input type="checkbox" defaultChecked/></div>)}</div></section>
      <section className="panel settings-section"><div className="settings-icon"><Moon size={19}/></div><div className="settings-content"><span className="eyebrow">Appearance</span><h2>Theme</h2><div className="choice-grid"><label className="choice"><input type="radio" name="theme" defaultChecked/><span>Light</span></label><label className="choice"><input type="radio" name="theme"/><span>Dark</span></label><label className="choice"><input type="radio" name="theme"/><span>System</span></label></div></div></section>
      <section className="panel settings-section danger"><div className="settings-icon"><Shield size={19}/></div><div className="settings-content"><span className="eyebrow">Privacy</span><h2>Data & security</h2><p>Your resume and application information should be treated as sensitive data. Keep credentials and API keys on the backend.</p><button className="danger-btn">Delete Account</button></div></section>
    </div>
  </>;
}