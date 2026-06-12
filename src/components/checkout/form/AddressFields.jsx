const AddressFields = () => {
  return (
    <>
      <div className="form-row">
        <div className="form-group">
          <label>City</label>
          <input placeholder="Enter city" />
        </div>

        <div className="form-group">
          <label>State</label>
          <input placeholder="Enter state" />
        </div>
      </div>

      {/* <div className="form-group">
        <label>Phone Number</label>
        <input placeholder="Enter phone number" />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input placeholder="Enter email" />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input placeholder="Enter address" />
      </div>

      <div className="form-group">
        <label>Country</label>
        <input placeholder="Enter country" />
      </div> */}
    </>
  );
};

export default AddressFields;