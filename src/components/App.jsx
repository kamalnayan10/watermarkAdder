import Input from "./Input";
import Image from "./Image";
import { useState } from "react";
import Title from "./Title";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <>
      <Title />
      <div className="App">
        {uploadedFiles.length == 0 ? (
          <Input
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        ) : (
          <Image image={URL.createObjectURL(uploadedFiles[0])} />
        )}
      </div>
    </>
  );
}

export default App;
