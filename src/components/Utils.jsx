import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "./Button";

import watermark1 from "../assets/images/watermark1.png";
import watermark2 from "../assets/images/watermark2.png";
import watermark3 from "../assets/images/watermark3.png";
import watermark4 from "../assets/images/watermark4.jpg";

function Utils({
  uploadedFile,
  setWatermarkedFile,
  handleRefresh,
  handleText,
  text,
  template,
  setTemplate,
}) {
  const buttonsRef = useRef([]);

  useEffect(() => {
    // Select the first watermark by default if none is selected
    if (template === 0) {
      buttonsRef.current[0].classList.add("selected");
      setTemplate(1); // Set the selected template (1-based index)
    }
  }, [template, setTemplate]);

  const handleCreate = async () => {
    if (!text) {
      alert("Please enter the watermark text.");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadedFile.file);
    formData.append("template", template); // Add the selected template
    formData.append("text", text); // Add the entered text

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

  const images = [watermark1, watermark2, watermark3, watermark4];

  const handleClick = (value, index) => {
    // Remove 'selected' class from all buttons
    buttonsRef.current.forEach((button) => button.classList.remove("selected"));
    // Add 'selected' class to the clicked button
    buttonsRef.current[index].classList.add("selected");
    setTemplate(value + 1); // Set the selected template (1-based index)
  };

  return (
    <div className="utils">
      <div className="row">
        {[0, 1, 2, 3].map((value, index) => (
          <input
            key={value}
            type="button"
            className="watermark"
            ref={(el) => (buttonsRef.current[index] = el)}
            onClick={() => handleClick(value, index)}
            style={{
              backgroundImage: `url(${images[index]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Enter watermark text"
          value={text}
          onChange={(e) => handleText(e.target.value)}
          required
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
  text: PropTypes.string.isRequired,
  template: PropTypes.number.isRequired,
  setTemplate: PropTypes.func.isRequired,
};
