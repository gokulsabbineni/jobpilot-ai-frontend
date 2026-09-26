import {
    Link,
    useParams,
  } from "react-router-dom";
  
  import AdminHeader from "../../components/admin/AdminHeader";
  
  export default function UserDetails() {
    const { id } = useParams();
  
    return (
      <div className="admin-page">
        <AdminHeader
          title="User Details"
          description={`Viewing account ${id}`}
        />
  
        <div className="admin-back-link">
          <Link to="/admin/users">
            ← Back to Users
          </Link>
        </div>
  
        <div className="admin-detail-grid">
          <section className="admin-detail-card">
            <h2>
              Account Information
            </h2>
  
            <div className="detail-row">
              <span>Name</span>
              <strong>
                John Doe
              </strong>
            </div>
  
            <div className="detail-row">
              <span>Email</span>
              <strong>
                john.doe@gmail.com
              </strong>
            </div>
  
            <div className="detail-row">
              <span>Status</span>
              <strong>
                Active
              </strong>
            </div>
  
            <div className="detail-row">
              <span>Job Type</span>
              <strong>
                Full Time
              </strong>
            </div>
          </section>
  
          <section className="admin-detail-card">
            <h2>
              Application Statistics
            </h2>
  
            <div className="detail-row">
              <span>
                Total Applications
              </span>
              <strong>24</strong>
            </div>
  
            <div className="detail-row">
              <span>
                Submitted
              </span>
              <strong>19</strong>
            </div>
  
            <div className="detail-row">
              <span>
                Failed
              </span>
              <strong>3</strong>
            </div>
  
            <div className="detail-row">
              <span>
                Action Required
              </span>
              <strong>2</strong>
            </div>
          </section>
  
          <section className="admin-detail-card">
            <h2>
              Resume
            </h2>
  
            <p>
              John_Doe_Resume.pdf
            </p>
  
            <button className="table-action-button">
              View Resume
            </button>
          </section>
  
          <section className="admin-detail-card">
            <h2>
              Job Preferences
            </h2>
  
            <div className="detail-row">
              <span>
                Target Role
              </span>
              <strong>
                Golang Developer
              </strong>
            </div>
  
            <div className="detail-row">
              <span>
                Location
              </span>
              <strong>
                United States
              </strong>
            </div>
  
            <div className="detail-row">
              <span>
                Remote
              </span>
              <strong>
                Yes
              </strong>
            </div>
          </section>
        </div>
      </div>
    );
  }