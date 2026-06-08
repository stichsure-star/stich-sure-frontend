const IncomingCollab = () => {
  return (
    <section className="Cards_container">
      <div className="Profile_card">
        <h3>New Collaboration Request</h3>

        <p className="Profile_text">
          A designer wants to work with you on a new project.
        </p>

        <div className="Profile_buttons">
          <button>Reject</button>

          <button className="primary">Accept</button>
        </div>
      </div>
    </section>
  );
};

export default IncomingCollab;
