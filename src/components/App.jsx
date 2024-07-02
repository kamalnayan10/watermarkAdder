import Input from "./Input";
import Image from "./Image";
import { useState } from "react";
import Title from "./Title";
import Footer from "./Footer";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [watermarkedFile, setWatermarkedFile] = useState(null);

  function handleRefresh() {
    setUploadedFiles([]);
    setWatermarkedFile(null);
  }

  return (
    <>
      <Title handleRefresh={handleRefresh} />
      <div className="App">
        {uploadedFiles.length === 0 ? (
          <Input setUploadedFiles={setUploadedFiles} />
        ) : (
          <Image
            image={uploadedFiles[0]}
            uploadedFile={uploadedFiles[0]}
            setWatermarkedFile={setWatermarkedFile}
            watermarkedFile={watermarkedFile}
            handleRefresh={handleRefresh}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
