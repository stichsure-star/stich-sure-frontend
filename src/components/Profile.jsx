import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "../styles/Profile.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../global/authSlice";
import Swal from "sweetalert2";
import { designerApi } from "../config/designer";

const Profile = ({ onNext, onPrev, designerInfo }) => {
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const [selectedSpecs, setSelectedSpecs] = useState(["All"]);
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef(null);

  const specializations = [
    "All",
    "Traditional",
    "Bridal",
    "Corporate",
    "Casual",
    "Accessories",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file); // store file for backend
    }
  };

  const handleSpecialization = (spec) => {
    if (spec === "All") {
      setSelectedSpecs(["All"]);
      return;
    }

    let updated = selectedSpecs.filter((item) => item !== "All");

    if (updated.includes(spec)) {
      updated = updated.filter((item) => item !== spec);
    } else {
      updated.push(spec);
    }

    setSelectedSpecs(updated.length ? updated : ["All"]);
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();

      // previous wizard data
      Object.entries(designerInfo).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          payload.append(key, value);
        }
      });

      // experience
      // FILE (must match backend name EXACTLY)
      payload.append("profilePhoto", profileImage); // 👈 CHANGE THIS KEY if backend differs

      // specialization (safe choice)
      payload.append("specialization", selectedSpecs.join(", "));

      // bio
      if (bio.trim()) {
        payload.append("shortBio", bio);
      }

      // experience
      if (experience.trim()) {
        payload.append("yearsOfExperience", Number(experience));
      }

      const res = await designerApi.setUpProfile(payload);
      console.log("res", res.data);
      console.log("wassup");

      dispatch(
        setCredentials({
          user: res.data.data,
        }),
      );

      Swal.fire({
        icon: "success",
        title: "Profile Completed",
        timer: 1500,
        showConfirmButton: false,
      });

      onNext();
    } catch (error) {
      console.log(error?.response?.data || error);
    }
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
          <div className="profile-photo">
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

          {/* EXPERIENCE (NOW CONTROLLED) */}
          <p className="labed">Years Of Experience</p>
          <input
            className="blok"
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />

          {/* BIO (NOW CONTROLLED) */}
          <p className="labed">Short Bio</p>
          <textarea
            rows="5"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button type="button" className="continue-btn" onClick={handleSubmit}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
