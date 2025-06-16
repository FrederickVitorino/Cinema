export const FileUpload = ({ onFileChange }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="file"
        className="form-control"
        id="inputGroupFile02"
        onChange={onFileChange}
      />
      <label className="input-group-text" htmlFor="inputGroupFile02">
        Upload
      </label>
    </div>
  );
};
