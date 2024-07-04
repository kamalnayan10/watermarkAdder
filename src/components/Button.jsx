import PropTypes from "prop-types";

function Button({ clickFunc, val, extra }) {
  return (
    <input
      type="button"
      value={val}
      className={`btn ${extra}`}
      onClick={clickFunc}
    ></input>
  );
}

export default Button;

Button.propTypes = {
  clickFunc: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
  extra: PropTypes.string,
};
