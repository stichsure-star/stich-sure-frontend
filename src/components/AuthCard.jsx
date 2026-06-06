import "../../styles/AuthCard.css";

const AuthCard = ({
  title,
  subtitle,
  children,
  onSubmit,
}) => {
  return (
    <div className="auth_card">
      <h2 className="auth_title">{title}</h2>

      <p className="auth_subtitle">{subtitle}</p>

      <form
        className="auth_form"
        onSubmit={onSubmit}
      >
        {children}

        {/* <button
          className="create_btn"
          type="submit"
        >
          {buttonText}
        </button> */}
      </form>
    </div>
  );
};

export default AuthCard;