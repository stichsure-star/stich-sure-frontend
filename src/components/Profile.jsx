import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import "../styles/Profile.css";
import { useDispatch } from "react-redux";
import { setCredentials, updateUser } from "../global/authSlice";
import Swal from "sweetalert2";
import { designerApi } from "../config/designer";
import { Navigate } from "react-router-dom";

const Profile = ({ onNext, onPrev, designerInfo }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const [profileImage, setProfileImage] = useState(null);

  // FIX 1: Initialized as empty array instead of ["All"] so it starts unselected
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const [errors, setErrors] = useState({});

  const specializationOptions = [
    "Traditional",
    "Bridal",
    "Corporate",
    "Casual",
    "Accesories",
  ];

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        setProfileImage(file);
        setErrors((prev) => ({ ...prev, profileImage: null }));
      } else {
        setErrors((prev) => ({
          ...prev,
          profileImage: "Please select a valid image file.",
        }));
      }
    }
  };

  // FIX 2: Simplified tag selection logic. Removes "All" condition completely.
  const handleSpecialization = (spec) => {
    let updated;

    if (selectedSpecs.includes(spec)) {
      // Unselect if already clicked
      updated = selectedSpecs.filter((item) => item !== spec);
    } else {
      // Add specialization to array
      updated = [...selectedSpecs, spec];
    }

    setSelectedSpecs(updated);

    // Clear error dynamically if they select at least one item
    if (updated.length > 0) {
      setErrors((prev) => ({ ...prev, specialization: null }));
    }
  };

  // --- VALIDATION ENGINE ---
  const validateForm = () => {
    const newErrors = {};

    if (!profileImage) {
      newErrors.profileImage = "A profile photo is required.";
    }

    // FIX 3: Enforces that at least 1 item is chosen from the array
    if (selectedSpecs.length === 0) {
      newErrors.specialization = "Please select at least one specialization.";
    }

    if (!experience.trim()) {
      newErrors.experience = "Years of experience is required.";
    } else if (isNaN(experience) || Number(experience) < 0) {
      newErrors.experience = "Please enter a valid number of years.";
    }

    if (!bio.trim()) {
      newErrors.bio = "A short bio helps clients learn about you.";
    } else if (wordCount < 20) {
      newErrors.bio = "Your bio should be at least 20 words long.";
    } else if (wordCount > 50) {
      newErrors.bio = "Your bio should not exceed 50 words."; // Fixed string error message here too (was 20)
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fix the errors in the form before submitting.",
      });
      return;
    }
    setLoading(true);

    try {
      const payload = new FormData();

      Object.entries(designerInfo).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });

      payload.append("profilePhoto", profileImage);
      payload.append("specialization", selectedSpecs.join(", "));
      payload.append("shortBio", bio.trim());
      payload.append("yearsOfExperience", Number(experience));

      const res = await designerApi.setUpProfile(payload);
      dispatch(updateUser(res.data.data));

      onNext();

      Swal.fire({
        icon: "success",
        title: "Profile Completed",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error?.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error?.response?.data?.message ||
          "Something went wrong on the server.",
      });
    }
    setLoading(false);
  };

  return (
    <div className="complete-profile-page">
      <div className="profile-content">
        <button type="button" className="wizard-back-icon" onClick={onPrev}>
          <IoChevronBack />
        </button>

        <h2>Complete Your Profile</h2>

        <p className="subtitle">
          Add more information about your design business
        </p>

        <p className="photo-text">Add Profile Photo</p>

        <div className="profile-photo-container">
          <div
            className={`profile-photo ${errors.profileImage ? "error-border" : ""}`}
          >
            {profileImage && (
              <img src={URL.createObjectURL(profileImage)} alt="profile" />
            )}
          </div>

          <button
            type="button"
            className="camera-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <FaCamera />
          </button>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />
        </div>
        {errors.profileImage && (
          <p className="error-text text-center">{errors.profileImage}</p>
        )}

        <form className="profile-form">
          <p className="labed">Select Specialization</p>

          <div className="specialization-tags">
            {specializationOptions.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => handleSpecialization(spec)}
                className={selectedSpecs.includes(spec) ? "active" : ""}
              >
                {spec}
              </button>
            ))}
          </div>
          {errors.specialization && (
            <p className="error-text">{errors.specialization}</p>
          )}

          {/* EXPERIENCE */}
          <p className="labed">Years Of Experience</p>
          <input
            className={`blok ${errors.experience ? "error-border" : ""}`}
            type="text"
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              if (e.target.value.trim())
                setErrors((prev) => ({ ...prev, experience: null }));
            }}
          />
          {errors.experience && (
            <p className="error-text">{errors.experience}</p>
          )}

          {/* BIO */}
          <p className="labed">Short Bio</p>
          <textarea
            className={errors.bio ? "error-border" : ""}
            rows="5"
            value={bio}
            onChange={(e) => {
              const text = e.target.value;
              setBio(text);
              const words = text.trim().split(/\s+/).filter(Boolean);
              setWordCount(words.length);

              if (text.trim()) {
                setErrors((prev) => ({
                  ...prev,
                  bio: null,
                }));
              }
            }}
          />

          <p className="word-count">{wordCount}/20 words</p>
          {errors.bio && <p className="error-text">{errors.bio}</p>}

          <button type="button" className="continue-btn" onClick={handleSubmit}>
            {loading ? "Verifying..." : "Complete Verification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
