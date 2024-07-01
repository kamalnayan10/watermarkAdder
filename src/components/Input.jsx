import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

function Input({ setUploadedFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      // upload image to be processed here
    },
  });
  return (
    <div {...getRootProps()} className="drop-box">
      <input {...getInputProps()} />
      <span className="material-symbols-outlined big">upload</span>
      <p>Drag and drop files here or click to browse.</p>
    </div>
  );
}
export default Input;

Input.propTypes = {
  setUploadedFiles: PropTypes.func.isRequired,
};
