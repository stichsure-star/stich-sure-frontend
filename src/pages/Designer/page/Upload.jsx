import React from "react";
import "../../Designer/css/Upload.css";

const Upload = () => {
  return (
    <div className="Design_page">
      <div className="Design_box">
        <h2>Add New Design</h2>

        <div className="Image_upload">
          <div>
            <h4>Design Image</h4>

            <div className="Upload_area">
              <p>⬆</p>
              <span>Click to upload images</span>
              <small>PNG, JPG up to 10MB each</small>

              <button>Upload</button>
            </div>
          </div>
        </div>

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

        <div className="Measurement">
          <h4>Input needed measurements from customer</h4>

          <p>Chest</p>
          <p>Shoulder</p>
          <p>Sleeve Length</p>
          <p>Top Length</p>
          <p>Neck</p>
          <p>Bust</p>
        </div>

        <button className="Publish">Publish Design</button>
      </div>
    </div>
  );
};

export default Upload;
