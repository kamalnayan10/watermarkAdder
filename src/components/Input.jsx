import { useDropzone } from "react-dropzone";

function Input({ uploadedFiles, setUploadedFiles }) {
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
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default Input;
