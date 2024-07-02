import PropTypes from "prop-types";
import Utils from "./Utils";

function Image({ image, uploadedFile, setWatermarkedFile, watermarkedFile }) {
  return (
    <div className="container">
      <div className="img">
        <img src={image.fileUrl} alt="uploaded image" />
      </div>
      <Utils uploadedFile={uploadedFile} setWatermarkedFile={setWatermarkedFile} />
      {watermarkedFile && (
        <div className="img">
          <img src={watermarkedFile.fileUrl} alt="watermarked image" />
        </div>
      )}
    </div>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.object.isRequired,
  uploadedFile: PropTypes.object.isRequired,
  setWatermarkedFile: PropTypes.func.isRequired,
  watermarkedFile: PropTypes.object,
};
