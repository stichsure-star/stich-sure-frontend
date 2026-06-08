import "../../../styles/designer-security.css"

const DesignerSecurity = () => {
  return (
    <main className="designer-security-page">
      <section className="designer-security-panel">
        <h1>Security Settings</h1>

        <form className="designer-security-form">
          <label className="security-field">
            <span>Current Password</span>
            <input type="password" />
          </label>

          <label className="security-field">
            <span>New Password</span>
            <input type="password" />
          </label>

          <label className="security-field">
            <span>Confirm New Password</span>
            <input type="password" />
          </label>

          <button type="submit" className="security-update-button">
            Update Password
          </button>
        </form>
      </section>
    </main>
  );
};

export default DesignerSecurity;