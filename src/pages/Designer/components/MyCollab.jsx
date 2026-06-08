import Ccard from "../../../components/reuasbleComponents/Ccard";
import "../css/MyCollab.css";

const MyCollab = () => {
  return (
    <section>
      <div class="filter-tabs">
        <button class="tab-btn" data-filter="all">
          All
        </button>
        <button class="tab-btn" data-filter="active">
          Active
        </button>
        <button class="tab-btn active" data-filter="pending">
          Pending
        </button>
        <button class="tab-btn" data-filter="review">
          In Review
        </button>
      </div>

      <div class="cards-grid">
        <div class="collab-card" data-status="pending">
          <div class="card-header">
            <div class="profile-area">
              <img
                src="https://via.placeholder.com/80"
                alt="Adebayo Styles"
                class="profile-img"
              />
              <div class="profile-info">
                <h2 class="profile-name">Adebayo Styles</h2>
                <div class="profile-location">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="icon-location"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Lagos State</span>
                </div>
              </div>
            </div>
            <span class="status-badge pending">Pending</span>
          </div>
          <div class="card-body">
            <p class="collab-text">
              "Hi! I'm currently overloaded with 12 active bridal orders..."
            </p>
          </div>
          <div class="card-footer">
            <div class="tag">
              <span class="tag-icon">✂</span>
              <span>Bridal Gown</span>
            </div>
          </div>
        </div>

        <div class="collab-card" data-status="active">
          <Ccard />
        </div>
      </div>
    </section>
  );
};

export default MyCollab;
