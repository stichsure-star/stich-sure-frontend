import React, { use, useState } from "react";
import "../styles/Upload.css";
import { BsUpload } from "react-icons/bs";
import { designerApi } from "../config/designer";
import DesignPublished from "../popups/DesignPublished";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../global/authSlice";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showPublished, setShowPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  console.log("user");
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    designTitle: "",
    category: "",
    price: "",
    description: "",
    id: "",
  });

  const [errors, setErrors] = useState({});

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      const imageUrl = URL.createObjectURL(file);

      setImage(imageUrl);
      setFileName(file.name);

      setErrors({
        ...errors,
        image: "",
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!imageFile) {
      newErrors.image = "Please upload a design image";
    }

    if (!form.designTitle.trim()) {
      newErrors.designTitle = "Design title is required";
    }

    if (!form.category) {
      newErrors.category = "Select a category";
    }

    if (!form.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(form.price)) {
      newErrors.price = "Price must be a number";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const designerId = user.id;

      const formData = new FormData();

      formData.append("designTitle", form.designTitle);

      formData.append("category", form.category);

      formData.append("price", form.price);

      formData.append("description", form.description);

      formData.append("designImage", imageFile);
      formData.append("designerId", designerId);

      const res = await designerApi.uploadDesign(formData);

      dispatch(
        updateUser({
          ...user,
          designs: [...(user?.designs || []), res.data.data],
        }),
      );

      setShowPublished(true);
    } catch (error) {
      console.log(error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Design Publish Failed",
      });
    }
    setLoading(false);
  };

  return (
    <div className="Design_page">
      <div className="Design_box">
        {/* IMAGE UPLOAD */}

        <div className="Image_upload">
          <h2>Add New Design</h2>

          <div className="Upload_box">
            <input
              id="design-upload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

            <label htmlFor="design-upload" className="Upload_Container_Label">
              <div className="Upload_com">
                {image ? (
                  <div className="Upload_Image">
                    <img src={image} alt="preview" className="Image_iipload" />
                  </div>
                ) : (
                  <div className="Upload_area">
                    <p>
                      <BsUpload className="upload-icon" />
                    </p>

                    <span>
                      {fileName ? fileName : "Choose a design file..."}
                    </span>

                    <small>PNG, JPG up to 10MB each</small>
                  </div>
                )}
              </div>
            </label>
          </div>

          {errors.image && <p className="error-text">{errors.image}</p>}
        </div>

        {/* INPUT FIELDS */}

        <div className="Input_fields">
          <div className="Input_box">
            <label>Design Title</label>

            <input
              name="designTitle"
              value={form.designTitle}
              onChange={handleChange}
              placeholder="e.g Formal Agbada with Gold Embroidery"
            />

            {errors.designTitle && (
              <small className="error-text">{errors.designTitle}</small>
            )}
          </div>

          <div className="Input_box">
            <label>Category</label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>

              <option value="Traditional">Traditional</option>

              <option value="Bridal">Bridal</option>

              <option value="Corporate">Corporate</option>

              <option value="Accessories">Accessories</option>
            </select>

            {errors.category && (
              <small className="error-text">{errors.category}</small>
            )}
          </div>

          <div className="Input_box">
            <label>Price</label>

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₦75000"
            />

            {errors.price && (
              <small className="error-text">{errors.price}</small>
            )}
          </div>

          <div className="Input_bxed">
            <label>Description</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the design..."
              className="boxted"
            />

            {errors.description && (
              <small className="error-text">{errors.description}</small>
            )}
          </div>
        </div>

        {/* MEASUREMENTS */}

        <div className="Measurement">
          <h4>Input needed measurements from customer</h4>

          {[
            "Chest",
            "Shoulder",
            "Sleeve length",
            "Top-length",
            "Neck",
            "Bust",
            "Waist",
            "Hips",
            "Length",
          ].map((item) => (
            <div className="Measurement_box" key={item}>
              <p>{item}:</p>

              <input />
            </div>
          ))}
        </div>

        <button
          onClick={handlePublish}
          className="Publish"
          style={{ cursor: "pointer" }}
        >
          {loading ? "Publishing..." : " Publish Design"}
        </button>
      </div>

      {showPublished && (
        <DesignPublished onClose={() => setShowPublished(false)} />
      )}
    </div>
  );
};

export default Upload;
