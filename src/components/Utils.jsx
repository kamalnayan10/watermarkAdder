import PropTypes from "prop-types";
import axios from "axios";
import Watermark from "./Watermark";

function Utils({ uploadedFile, setWatermarkedFile, handleRefresh }) {
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("image", uploadedFile.file);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Ensure the response is a blob for downloading
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${uploadedFile.file.name.split(".")[0]}-watermarked.png`
      ); // Set download filename
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
        <Watermark />
        <Watermark />
        <Watermark />
        <Watermark />
      </div>
      <div className="row">
        <input type="text" placeholder="text" />
      </div>
      <div className="row">
        <input
          type="button"
          value="Create"
          className="btn create"
          onClick={handleCreate}
        />
        <input
          type="button"
          value="New Image"
          className="btn"
          onClick={handleRefresh}
        />
      </div>
    </div>
  );
}

export default Utils;

Utils.propTypes = {
  uploadedFile: PropTypes.object.isRequired,
  setWatermarkedFile: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};
