import Watermark from "./Watermark";

function Utils() {
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
        <input type="button" value="create" className="btn" />
      </div>
      <div className="row">
        <input type="button" value="reverse" className="btn" />
      </div>
    </div>
  );
}

export default Utils;
