const SaveInfoCheckbox = () => {
  return (
    <div className="save-info">
      <input
        type="checkbox"
        id="saveInfo"
      />

      <label htmlFor="saveInfo">
        Save this information for next time
      </label>
    </div>
  );
};

export default SaveInfoCheckbox;