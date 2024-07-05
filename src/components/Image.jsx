import PropTypes from "prop-types";
import Utils from "./Utils";

function Image({
  image,
  uploadedFile,
  setWatermarkedFile,
  handleRefresh,
  handleText,
  handleTemplate,
  text,
  selectedTemplate,
}) {
  return (
    <div className="container">
      <div className="img">
        <img src={image.fileUrl} alt="uploaded image" />
      </div>
      <Utils
        uploadedFile={uploadedFile}
        setWatermarkedFile={setWatermarkedFile}
        handleRefresh={handleRefresh}
        handleText={handleText}
        handleTemplate={handleTemplate}
        text={text}
        template={selectedTemplate}
        setTemplate={handleTemplate}
      />
    </div>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.object.isRequired,
  uploadedFile: PropTypes.object.isRequired,
  setWatermarkedFile: PropTypes.func.isRequired,
  watermarkedFile: PropTypes.object,
  handleRefresh: PropTypes.func.isRequired,
  handleText: PropTypes.func.isRequired,
  handleTemplate: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  selectedTemplate: PropTypes.number.isRequired,
};
