import "../../../paymentInStich-sure/styles/section-card.css"

const SectionCard = ({ title, children }) => {
  return (
    <div className="section-card">
      {title && <h3 className="section-title">{title}</h3>}

      {children}
    </div>
  );
};

export default SectionCard;