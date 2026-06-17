import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
import { authApi } from "../../../config/customer";
import "../../../styles/customer-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials, updateUser } from "../../../global/authSlice";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= PREFILL FORM =================
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        profilePhoto: "",
      });
    }
  }, [user]);

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE HANDLER =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  // ================= VALIDATION =================
  const validate = () => {
    if (!form.firstName.trim()) {
      alert("First name is required");
      return false;
    }

    if (!form.lastName.trim()) {
      alert("Last name is required");
      return false;
    }

    if (!form.email.trim()) {
      alert("Email is required");
      return false;
    }

    if (!form.email.includes("@")) {
      alert("Enter a valid email");
      return false;
    }

    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("profilePhoto", "");

      if (image) {
        formData.append("profilePhoto", image);
      }

      const res = await authApi.updateprofile(user?.id, formData);

      console.log("SUCCESS:", res.data);

      dispatch(
        updateUser({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          profilePhoto: image ? URL.createObjectURL(image) : user?.profilePhoto,
        }),
      );
      console.log("updateUser", updateUser);

      alert("Profile updated successfully");
      navigate("/user/dashboard");
    } catch (error) {
      console.log("API ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="customer-profile-page">
      <section className="customer-profile-card">
        {/* IMAGE UPLOAD */}
        <div className="customer-photo-section">
          <h2>Add Profile Photo</h2>

          <div className="customer-photo-upload">
            <div className="customer-photo-bg">
              {image && <img src={URL.createObjectURL(image)} alt="preview" />}
            </div>

            <input
              type="file"
              accept="image/*"
              id="profileImage"
              hidden
              onChange={handleImageChange}
            />

            <label htmlFor="profileImage" className="customer-camera-button">
              <FiCamera />
            </label>
          </div>
        </div>

        {/* FORM */}
        <form className="customer-profile-form" onSubmit={handleSubmit}>
          <h1>Profile Settings</h1>

          <label className="customer-profile-field">
            <span>First Name</span>
            <input
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
            />
          </label>

          <label className="customer-profile-field">
            <span>Last Name</span>
            <input
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
            />
          </label>

          <label className="customer-profile-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </label>

          <button
            type="submit"
            className="customer-save-button"
            disabled={loading}
          >
            <LuSave />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </form>
      </section>
    </main>
  );
};

export default CustomerProfile;
