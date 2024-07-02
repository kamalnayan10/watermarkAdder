import Input from "./Input";
import Image from "./Image";
import { useState } from "react";
import Title from "./Title";
import Footer from "./Footer";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  function handleRefresh() {
    setUploadedFiles([]);
  }

  return (
    <>
      <Title handleRefresh={handleRefresh} />
      <div className="App">
        {uploadedFiles.length == 0 ? (
          <Input
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        ) : (
          <Image
            image={URL.createObjectURL(uploadedFiles[0])}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
