import { useState } from "react";
import "../../styles/SetPassword.css";
import { IoChevronBack } from "react-icons/io5";
import InputField from "../../components/reuasbleComponents/InputField";
import AuthCard from "../../components/reuasbleComponents/AuthCard";
import AuthLayout from "../../components/reuasbleComponents/AuthLayout";


const SetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("New Password:", formData.password);

   
  };

  return (
    <AuthLayout  imageClassName="setpassword_image_section">
        <p className="back_text">
  <IoChevronBack />
  Back
</p>
      <AuthCard
        title="Set password"
        subtitle="Password requires a minimum of 8 characters and contains a capital letter, number and symbols."
        onSubmit={handleSubmit}
      >
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter new password"
        />

          <button
    className="create_btn"
    type="submit"
  >
    Continue
  </button>

       
      </AuthCard>
    </AuthLayout>
  );
};

export default SetPassword;