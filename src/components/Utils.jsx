import PropTypes from "prop-types";
import axios from "axios";

function Utils({ uploadedFile, setWatermarkedFile }) {
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("image", uploadedFile.file);

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: 'blob' // Ensure the response is a blob for downloading
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${uploadedFile.file.name.split('.')[0]}-watermarked.png`); // Set download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM

      // Set the watermarked file URL
      setWatermarkedFile({ fileUrl: url });
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <div className="utils">
      <div className="row">
        <input type="button" value="Create" className="btn" onClick={handleCreate} />
      </div>
      <div className="row">
        <input
          type="button"
          value="New Image"
          className="btn"
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
}

export default Utils;

Utils.propTypes = {
  uploadedFile: PropTypes.object.isRequired,
  setWatermarkedFile: PropTypes.func.isRequired,
};
