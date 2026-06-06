import React, { useState } from "react";
import "../styles/Upload.css";
import { MdLogout } from "react-icons/md";
import { BsUpload } from "react-icons/bs";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(""); // Fixed: Declared the missing fileName state

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileName(file.name); // Store the file name when selected
    }
  };

  return (
    <div className="Design_page">
      <div className="Design_box">
        {/* IMAGE UPLOAD SECTION */}
        <div className="Image_upload">
          <h2>Add New Design</h2>
          <div className="Upload_box">
            <h4>Design Image</h4>

            {/* The label acts as our main interactive custom container */}
            <label className="Upload_Container_Label">
              {/* Hide the native input completely using an inline style */}
              <input
                type="file"
                onChange={handleImage}
                className="input"
                style={{ display: "none" }}
              />

              <div className="Upload_com">
                {image ? (
                  <div className="Upload_Image">
                    <img src={image} alt="preview" className="Image_upload" />
                  </div>
                ) : (
                  /* Combined all placeholder elements cleanly inside a single block */
                  <div className="Upload_area">
                    <p>
                      <BsUpload className="upload-icon" />
                    </p>
                    <span
                      className={`upload-text ${fileName ? "selected" : "placeholder"}`}
                    >
                      {fileName
                        ? fileName
                        : "Choose a design file... (Placeholder)"}
                    </span>
                    <small>PNG, JPG up to 10MB each</small>
                  </div>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* INPUT FIELDS SECTION */}
        <div className="Input_fields">
          <div className="Input_box">
            <label>Design Title</label>
            <input placeholder="e.g Formal Agbada with Gold Embroidery" />
          </div>

          <div className="Input_box">
            <label>Category</label>
            <input />
          </div>

          <div className="Input_box">
            <label>Price</label>
            <input placeholder="₦75,000" />
          </div>

          <div className="Input_box">
            <label>Description</label>
            <textarea placeholder="Describe the design..." />
          </div>
        </div>

        {/* MEASUREMENTS SECTION */}
        <div className="Measurement">
          <h4>Input needed measurements from customer</h4>
          <div className="Measurement_box">
            <p>Chest:</p>
            <input placeholder="eg." />
          </div>
          <div className="Measurement_box">
            <p>Shoulder:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Sleeve length:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Top-length:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Neck:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Bust:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Waist:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Hips:</p>
            <input />
          </div>
          <div className="Measurement_box">
            <p>Length:</p>
            <input />
          </div>
        </div>

        <button className="Publish">Publish Design</button>
      </div>
    </div>
  );
};

export default Upload;
