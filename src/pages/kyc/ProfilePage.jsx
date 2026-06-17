import React from "react";
import Profile from "../../components/Profile";
import Header from "../../components/reuasbleComponents/Header";
import Footer from "../../components/reuasbleComponents/Footer";

const ProfilePage = ({ onNext, onPrev, designerInfo, setDesignerInfo }) => {
  return (
    <div>
      <Profile
        onNext={onNext}
        onPrev={onPrev}
        designerInfo={designerInfo}
        setDesignerInfo={setDesignerInfo}
      />
    </div>
  );
};

export default ProfilePage;
