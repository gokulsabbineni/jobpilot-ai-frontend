interface AdminStatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: string;
  }
  
  export default function AdminStatCard({
    title,
    value,
    description,
    icon,
  }: AdminStatCardProps) {
    return (
      <div className="admin-stat-card">
        <div className="admin-stat-card-top">
          <div className="admin-stat-icon">
            {icon}
          </div>
  
          <span className="admin-stat-label">
            {title}
          </span>
        </div>
  
        <div className="admin-stat-value">
          {value}
        </div>
  
        <div className="admin-stat-description">
          {description}
        </div>
      </div>
    );
  }