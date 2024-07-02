import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

function Input({ setUploadedFiles }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setUploadedFiles([{ file, fileUrl }]);
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
