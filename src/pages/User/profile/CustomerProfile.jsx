import { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import { LuSave } from "react-icons/lu";
import { customerApi } from "../../../config/customer";
import "../../../styles/customer-profile.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../../global/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    phone: "",
    address: "",
    profilePhoto: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        // email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profilePhoto: user.profilePhoto || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validate = () => {
    let temp = {};

    if (!form.firstName.trim()) {
      temp.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      temp.lastName = "Last name is required";
    }

    // if (!form.email.trim()) {
    //   temp.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    //   temp.email = "Enter a valid email";
    // }

    const cleanPhone = form.phone.replace(/\s/g, "");

    if (!cleanPhone) {
      temp.phone = "Phone number is required";
    } else if (!/^(\+234|234|0)\d{10}$/.test(cleanPhone)) {
      temp.phone = "Enter a valid Nigerian phone number";
    }

    if (!form.address.trim()) {
      temp.address = "Address is required";
    }

    if (image) {
      if (!image.type.startsWith("image/")) {
        temp.image = "Only image files allowed";
      }

      if (image.size > 2 * 1024 * 1024) {
        temp.image = "Image must be less than 2MB";
      }
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      // formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);

      if (image) {
        formData.append("profilePhoto", image);
      }

      const res = await customerApi.updateprofile(user?.id, formData);

      console.log(res.data);

      dispatch(
        updateUser({
          firstName: form.firstName,
          lastName: form.lastName,
          // email: form.email,
          phone: form.phone,
          address: form.address,
          profilePhoto: image ? URL.createObjectURL(image) : user?.profilePhoto,
        }),
      );

      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/user/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);

      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Update failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="customer-profile-page">
      <section className="customer-profile-card">
        <div className="customer-photo-section">
          <h2>Add Profile Photo</h2>

          <div className="customer-photo-upload">
            <div className="customer-photo-bg">
              {image && <img src={URL.createObjectURL(image)} alt="preview" />}

              {!image && form.profilePhoto && (
                <img src={form.profilePhoto} alt="profile" />
              )}
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

          {errors.image && <p className="error">{errors.image}</p>}
        </div>

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

            {errors.firstName && <p className="error">{errors.firstName}</p>}
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

            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </label>

          <label className="customer-profile-field">
            <span>Email</span>

            <input
              name="email"
              type="email"
              value={user.email}
              // onChange={handleChange}
              placeholder="Email"
              readOnly
            />

            {errors.email && <p className="error">{errors.email}</p>}
          </label>

          <label className="customer-profile-field">
            <span>Phone</span>

            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={(e) => {
                let value = e.target.value;

                // Allow only digits and a single leading +
                value = value.replace(/[^\d+]/g, "");

                if (value.includes("+")) {
                  value = "+" + value.replace(/\+/g, "").replace(/^\+/, "");
                }

                setForm((prev) => ({
                  ...prev,
                  phone: value,
                }));

                setErrors((prev) => ({
                  ...prev,
                  phone: "",
                }));
              }}
              placeholder="+2348080000000"
            />

            {errors.phone && <p className="error">{errors.phone}</p>}
          </label>

          <label className="customer-profile-field">
            <span>Address</span>

            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
            />

            {errors.address && <p className="error">{errors.address}</p>}
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
