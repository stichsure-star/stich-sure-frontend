const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const role = localStorage.getItem("role") || "customer";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      Swal.fire({
        icon: "warning",
        title: "Email required",
      });
      return;
    }

    try {
      await authApi.forgotPassword(role, {
        email: formData.email,
      });

      Swal.fire({
        icon: "success",
        title: "Reset link sent",
        timer: 1500,
        showConfirmButton: false,
      });

      localStorage.setItem("email", formData.email);

      // ✅ FIX IS HERE
      navigate("/verification", {
        state: {
          flow: "forget-password",
          role, // 👈 dynamic now
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message,
      });
    }
  };

  return (
    <AuthCard onSubmit={handleSubmit}>
      <InputField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <button className="create_btn" type="submit">
        Continue
      </button>
    </AuthCard>
  );
};

export default ForgotPassword;
