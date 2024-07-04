import { useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "./Button";

function Utils({
  uploadedFile,
  setWatermarkedFile,
  handleRefresh,
  handleText,
  handleTemplate,
  text,
}) {
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

  const buttonsRef = useRef([]);

  const handleClick = (value, index) => {
    // Remove 'selected' class from all buttons
    buttonsRef.current.forEach((button) => button.classList.remove("selected"));
    // Add 'selected' class to the clicked button
    buttonsRef.current[index].classList.add("selected");
  };

  const handleAction = (value, index) => {
    handleTemplate(value);
    handleClick(value, index);
  };

  return (
    <div className="utils">
      <div className="row">
        {[0, 1, 2, 3].map((value, index) => (
          <input
            key={value}
            type="button"
            value={value}
            className="watermark"
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => handleAction(value, index)}
          />
        ))}
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="text"
          value={text}
          onChange={(e) => handleText(e.target.value)}
        />
      </div>
      <div className="row">
        <Button clickFunc={handleCreate} extra={"create"} val={"Create"} />
        <Button clickFunc={handleRefresh} val={"New Image"} />
      </div>
    </div>
  );
}

export default Utils;

Utils.propTypes = {
  uploadedFile: PropTypes.object.isRequired,
  setWatermarkedFile: PropTypes.func.isRequired,
  handleRefresh: PropTypes.func.isRequired,
  handleText: PropTypes.func.isRequired,
  handleTemplate: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
