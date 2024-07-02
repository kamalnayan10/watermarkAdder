import PropTypes from "prop-types";
import Utils from "./Utils";

function Image({ image, handleRefresh }) {
  return (
    <div className="container">
      <div className="img">
        <img src={image} alt="uploaded image" />
      </div>
      <Utils handleRefresh={handleRefresh} />
    </div>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.string.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};
