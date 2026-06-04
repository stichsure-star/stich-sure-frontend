import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
// import "../../styles/Profile.css"
import "../styles/Profile.css"


const steps = [1, 2, 3, 4, 5];

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="complete-profile-page">

      <div className="progress-wrapper">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-step ${
              step <= currentStep ? "active" : ""
            }`}
          />
        ))}
      </div>
      <div className="profile-content" >
        <h2>Complete Your Profile</h2>

        <p className="subtitle">
          Add more information about your design business
        </p>

        <p className="photo-text">Add Profile Photo</p>

        <div className="profile-photo-container">
          <div className="profile-photo">
               {profileImage ? (
               <img src={profileImage} alt="profile" />
            ) : null}
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
           <button type="button">All</button>
          <button type="button">Traditional</button>
          <button type="button">Bridal</button>
          <button type="button">Corporate</button>
          <button type="button">Casual</button>
          <button type="button">Accessories</button>
        </div>

        <p  className="labed">Years Of Experience</p>
        <input className="blok" type="text" />

        <p  className="labed">Short Bio</p>
        <textarea rows="4"></textarea>

        <button className="submit-btn">
          Complete Profile
        </button>

      </form>

      </div>

      
    </div>
  );
}

export default Profile;