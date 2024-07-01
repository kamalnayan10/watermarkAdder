import Input from "./Input";
import { useState } from "react";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div className="App">
      <Input
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </div>
  );
}

export default App;
