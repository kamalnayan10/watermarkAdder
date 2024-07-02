import PropTypes from "prop-types";

function Title({ handleRefresh }) {
  return (
    <h1 className="title" onClick={handleRefresh}>
      Watermark Adder
    </h1>
  );
}

export default Title;

Title.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};
