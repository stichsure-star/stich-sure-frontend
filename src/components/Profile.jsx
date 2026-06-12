import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "../styles/Profile.css";

const Profile = ({ onNext , onPrev }) => {
  // Profile image state
  const [profileImage, setProfileImage] = useState(null);

  // Selected specializations
  const [selectedSpecs, setSelectedSpecs] = useState(["All"]);

  // Available specializations
  const specializations = [
    "All",
    "Traditional",
    "Bridal",
    "Corporate",
    "Casual",
    "Accessories",
  ];

  const fileInputRef = useRef(null);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle specialization selection
  const handleSpecialization = (spec) => {
    // If All is clicked
    if (spec === "All") {
      setSelectedSpecs(["All"]);
      return;
    }

    // Remove All when another option is clicked
    let updated = selectedSpecs.filter((item) => item !== "All");

    // Toggle selection
    if (updated.includes(spec)) {
      updated = updated.filter((item) => item !== spec);
    } else {
      updated.push(spec);
    }

    // If none selected, return to All
    setSelectedSpecs(updated.length ? updated : ["All"]);
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
              <img src={profileImage} alt="profile" />
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
                className=
                {
                  selectedSpecs.includes(spec) ? "active" : ""
                }
              >
                {spec}
              </button>
            ))}
          </div>

          <p className="labed">Years Of Experience</p>
          <input className="blok" type="text" />

          <p className="labed">Short Bio</p>
          <textarea rows="5"></textarea>

          <button
            type="button"
            className="continue-btn"
            onClick={onNext}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;