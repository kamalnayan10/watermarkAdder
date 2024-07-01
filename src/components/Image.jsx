import PropTypes from "prop-types";
import Utils from "./Utils";

function Image({ image }) {
  return (
    <div className="container">
      <div className="img">
        <img src={image} alt="uploaded image" />
      </div>
      <Utils />
    </div>
  );
}

export default Image;

Image.propTypes = {
  image: PropTypes.func.isRequired,
};
