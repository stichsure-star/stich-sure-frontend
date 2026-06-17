import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "../styles/Profile.css";
import { useDispatch } from "react-redux";
import { setCredentials, updateUser } from "../global/authSlice";
import Swal from "sweetalert2";
import { designerApi } from "../config/designer";
import { Navigate } from "react-router-dom";

const Profile = ({ onNext, onPrev, designerInfo }) => {
  const dispatch = useDispatch();
  const [loading ,setLoading ] = useState("")

  const [profileImage, setProfileImage] = useState(null);
  const [selectedSpecs, setSelectedSpecs] = useState(["All"]);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");
  
  // New state to manage field error feedback
  const [errors, setErrors] = useState({});

  const fileInputRef = useRef(null);



  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Clear image error if a valid file is selected
      if (file.type.startsWith("image/")) {
        setProfileImage(file);
        setErrors((prev) => ({ ...prev, profileImage: null }));
      } else {
        setErrors((prev) => ({ ...prev, profileImage: "Please select a valid image file." }));
      }
    }
  };

  const handleSpecialization = (spec) => {
    let updated;
    if (spec === "All") {
      updated = ["All"];
    } else {
      updated = selectedSpecs.filter((item) => item !== "All");
      if (updated.includes(spec)) {
        updated = updated.filter((item) => item !== spec);
      } else {
        updated.push(spec);
      }
    }

    const finalSpecs = updated.length ? updated : ["All"];
    setSelectedSpecs(finalSpecs);
    
    // Clear error if specialization valid
    if (finalSpecs.length > 0) {
      setErrors((prev) => ({ ...prev, specialization: null }));
    }
  };

  // --- VALIDATION ENGINE ---
  const validateForm = () => {
    const newErrors = {};

    if (!profileImage) {
      newErrors.profileImage = "A profile photo is required.";
    }

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
    } else if (bio.trim().length < 20) {
      newErrors.bio = "Your bio should be at least 20 characters long.";
    }

    setErrors(newErrors);
    // If newErrors object has keys, validation failed
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Run validation checks before sending anything to the backend
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fix the errors in the form before submitting.",
      });
      return;
    }
    setLoading(true)

    try {
      const payload = new FormData();

      // previous wizard data
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
      console.log("res", res.data);
      console.log("wassup");
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
        text: error?.response?.data?.message || "Something went wrong on the server.",
      });
    }
    setLoading(false)
  };

  return (
    <div className="complete-profile-page">
      <div className="profile-content">
        <h2>Complete Your Profile</h2>

        <p className="subtitle">
          Add more information about your design business
        </p>

        <p className="photo-text">Add Profile Photo</p>

        <div className="profile-photo-container">
          <div className={`profile-photo ${errors.profileImage ? "error-border" : ""}`}>
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
        {/* Profile Image Error Message */}
        {errors.profileImage && <p className="error-text text-center">{errors.profileImage}</p>}

        <form className="profile-form">
          <p className="labed">Select Specialization</p>

          <div className="specialization-tags">
            {specializations.map((spec) => (
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
          {errors.specialization && <p className="error-text">{errors.specialization}</p>}

          {/* EXPERIENCE */}
          <p className="labed">Years Of Experience</p>
          <input
            className={`blok ${errors.experience ? "error-border" : ""}`}
            type="text"
            value={experience}
            onChange={(e) => {
              setExperience(e.target.value);
              if (e.target.value.trim()) setErrors(prev => ({ ...prev, experience: null }));
            }}
          />
          {errors.experience && <p className="error-text">{errors.experience}</p>}

          {/* BIO */}
          <p className="labed">Short Bio</p>
          <textarea
            className={errors.bio ? "error-border" : ""}
            rows="5"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
              if (e.target.value.trim()) setErrors(prev => ({ ...prev, bio: null }));
            }}
          />
          {errors.bio && <p className="error-text">{errors.bio}</p>}

          <button type="button" className="continue-btn" onClick={handleSubmit}>
          {loading ? "Verifying...":"Complete Verification"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;