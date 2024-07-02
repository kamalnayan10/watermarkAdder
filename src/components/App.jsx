import Input from "./Input";
import Image from "./Image";
import { useState } from "react";
import Title from "./Title";
import Footer from "./Footer";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [watermarkedFile, setWatermarkedFile] = useState(null);

  return (
    <>
      <Title handleRefresh={() => { setUploadedFiles([]); setWatermarkedFile(null); }} />
      <div className="App">
        {uploadedFiles.length === 0 ? (
          <Input setUploadedFiles={setUploadedFiles} />
        ) : (
          <Image
            image={uploadedFiles[0]}
            uploadedFile={uploadedFiles[0]}
            setWatermarkedFile={setWatermarkedFile}
            watermarkedFile={watermarkedFile}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;