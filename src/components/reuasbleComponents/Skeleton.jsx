import "../../styles/Skeleton.css";

export const Skeleton = ({
  className = "",
  style = {},
  width,
  height,
  circle = false,
}) => (
  <div
    className={`ss-skeleton ${circle ? "ss-skeleton-circle" : ""} ${className}`}
    style={{ width, height, ...style }}
  />
);

export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`ss-skeleton-text ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        height={12}
        style={{ width: index === lines - 1 ? "60%" : "100%" }}
      />
    ))}
  </div>
);

export const SkeletonCardGrid = ({ count = 6, className = "" }) => (
  <div className={`ss-skeleton-card-grid ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="ss-skeleton-card">
        <Skeleton className="ss-skeleton-card-image" height={200} />
        <div className="ss-skeleton-card-body">
          <Skeleton height={16} style={{ width: "70%" }} />
          <Skeleton height={12} style={{ width: "45%" }} />
          <Skeleton height={12} style={{ width: "30%" }} />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTableRows = ({ rows = 5, cols = 5, className = "" }) => (
  <div
    className={`ss-skeleton-table ${className}`}
    style={{ "--ss-cols": cols }}
  >
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="ss-skeleton-table-row">
        {Array.from({ length: cols }).map((__, colIndex) => (
          <Skeleton
            key={colIndex}
            height={14}
            style={{ width: colIndex === 0 ? "80%" : "100%" }}
          />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonOrderList = ({ count = 3, className = "" }) => (
  <div className={`ss-skeleton-order-list ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="ss-skeleton-order-item">
        <Skeleton height={16} style={{ width: "55%" }} />
        <Skeleton height={12} style={{ width: "40%" }} />
        <Skeleton height={12} style={{ width: "35%" }} />
      </div>
    ))}
  </div>
);

export const SkeletonPage = ({ className = "" }) => (
  <div className={`ss-skeleton-page ${className}`}>
    <Skeleton height={28} style={{ width: "40%" }} />
    <SkeletonText lines={4} />
    <Skeleton height={200} />
  </div>
);

export const SkeletonOrderTracker = ({ className = "" }) => (
  <div className={`ss-skeleton-order-tracker ${className}`}>
    <div className="ss-skeleton-order-header">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <Skeleton height={24} style={{ width: "50%" }} />
        <Skeleton height={14} style={{ width: "35%" }} />
        <Skeleton height={14} style={{ width: "30%" }} />
      </div>
      <div className="ss-skeleton-order-header-right">
        <Skeleton height={22} style={{ width: 80 }} />
        <Skeleton height={24} style={{ width: 90, borderRadius: 20 }} />
        <Skeleton height={12} style={{ width: 100 }} />
      </div>
    </div>

    <div className="ss-skeleton-order-card">
      <Skeleton height={18} style={{ width: "40%" }} />
      <div className="ss-skeleton-measurement-grid">
        <SkeletonText lines={6} />
        <Skeleton height={126} />
      </div>
      <SkeletonText lines={3} />
      <Skeleton height={80} />
    </div>

    <Skeleton height={44} style={{ width: 120, borderRadius: 8 }} />
  </div>
);

export const SkeletonCheckout = ({ className = "" }) => (
  <div className={`ss-skeleton-checkout ${className}`}>
    <div className="ss-skeleton-checkout-left">
      <div className="ss-skeleton-checkout-card">
        <Skeleton height={18} style={{ width: "50%" }} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </div>
      <div className="ss-skeleton-checkout-card">
        <Skeleton height={18} style={{ width: "45%" }} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <div style={{ display: "flex", gap: 12 }}>
          <Skeleton height={40} style={{ flex: 1 }} />
          <Skeleton height={40} style={{ flex: 1 }} />
        </div>
      </div>
    </div>

    <div className="ss-skeleton-checkout-order">
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Skeleton width={80} height={80} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton height={18} style={{ width: "70%" }} />
          <Skeleton height={16} style={{ width: "40%" }} />
        </div>
      </div>
      <SkeletonText lines={4} />
      <Skeleton height={44} style={{ width: "100%", borderRadius: 8 }} />
    </div>
  </div>
);

export const SkeletonProfile = ({ className = "" }) => (
  <div className={`ss-skeleton-profile ${className}`}>
    <div className="ss-skeleton-profile-header">
      <Skeleton width={120} height={120} circle />
      <div className="ss-skeleton-profile-info">
        <Skeleton height={28} style={{ width: "45%" }} />
        <Skeleton height={16} style={{ width: "35%" }} />
        <SkeletonText lines={2} />
        <Skeleton height={12} style={{ width: "60%" }} />
      </div>
    </div>
    <SkeletonCardGrid count={4} />
  </div>
);

export const SkeletonDashboard = ({ className = "" }) => (
  <div className={`ss-skeleton-dashboard ${className}`}>
    <div className="ss-skeleton-dashboard-stats">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="ss-skeleton-stat-card">
          <Skeleton height={14} style={{ width: "50%" }} />
          <Skeleton height={24} style={{ width: "35%" }} />
        </div>
      ))}
    </div>
    <SkeletonOrderList count={2} />
    <SkeletonCardGrid count={3} />
  </div>
);
