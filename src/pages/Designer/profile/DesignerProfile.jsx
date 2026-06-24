import { useState, useEffect } from "react";
import { LuSave } from "react-icons/lu";
import { FiCamera } from "react-icons/fi";
import { designerApi } from "../../../config/designer";
import "../../../styles/designer-profile.css";
import { updateUser } from "../../../global/authSlice";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector

const DesignerProfile = () => {
  const dispatch = useDispatch();

  // 1. Get the current designer user from your global state
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    bio: "",
    profilePhoto: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Double-click prevention
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // 2. Pre-fill the form fields as soon as the user navigates here
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        location: user.location || "",
        bio: user.bio || "",
        profilePhoto: user.profilePhoto || "",
      });
      if (user.profilePhoto) {
        setPreviewUrl(user.profilePhoto);
      }
    }
  }, [user]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const payload = new FormData();
    payload.append("firstName", formData.firstName);
    payload.append("lastName", formData.lastName);
    payload.append("email", formData.email);
    payload.append("bio", formData.bio);
    payload.append("location", formData.location);
    if (profilePhoto) {
      payload.append("profilePhoto", profilePhoto);
    }

    try {
      setLoading(true);
      const response = await designerApi.updateProfileSettings(payload);

      if (response.status === 200 || response.status === 201) {
        showToast("Profile updated successfully!", "success");

        // 3. Safely extract updated profile fields from API response
        const apiUserData =
          response.data?.data || response.data?.user || response.data || {};

        // 4. Update Redux immediately so the UI changes across the app
        dispatch(
          updateUser({
            ...user,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            bio: formData.bio,
            location: formData.location,
            profilePhoto:
              apiUserData.profilePhoto || previewUrl || user?.profilePhoto,
          }),
        );
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      showToast(
        error.response?.data?.message || "Failed to update profile.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="profile-settings-page">
      {toast.show && (
        <div className={`payment-toast payment-toast-${toast.type}`}>
          <span className="payment-toast-icon">
            {toast.type === "success" ? "✓" : "✕"}
          </span>
          {toast.message}
        </div>
      )}

      <section className="profile-settings-card">
        <div className="designer-photo-section">
          <h1>Add Profile Photo</h1>
          <div className="designer-photo-upload">
            <div
              className="designer-photo-bg"
              style={
                previewUrl
                  ? {
                      backgroundImage: `url(${previewUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {}
              }
            ></div>

            <label className="designer-camera-button">
              <FiCamera />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </div>

        <form className="profile-settings-form" onSubmit={handleSubmit}>
          <h1>Profile Settings</h1>

          <label className="profile-field">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              placeholder="Adebayo"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>

          <label className="profile-field">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Adebayo Styles"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>

          <label className="profile-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="adebayo@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="profile-field">
            <span>Location</span>
            <input
              type="text"
              name="location"
              placeholder="Lagos, Nigeria"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label className="profile-field">
            <span>Bio</span>
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
          </label>

          <button
            type="submit"
            className="save-profile-button"
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

export default DesignerProfile;
