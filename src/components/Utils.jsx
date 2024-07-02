import PropTypes from "prop-types";
import Watermark from "./Watermark";

function Utils({ handleRefresh }) {
  return (
    <div className="utils">
      <div className="row">
        <Watermark />
        <Watermark />
        <Watermark />
        <Watermark />
      </div>
      <div className="row">
        <input type="text" name="textbox" id="" />
      </div>
      <div className="row">
        <input type="button" value="Create" className="btn" />
      </div>
      <div className="row">
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
  handleRefresh: PropTypes.func.isRequired,
};
