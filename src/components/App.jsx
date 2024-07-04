import Input from "./Input";
import Image from "./Image";
import { useState } from "react";
import Title from "./Title";
import Footer from "./Footer";

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [watermarkedFile, setWatermarkedFile] = useState(null);
  const [text, setText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function handleRefresh() {
    setUploadedFiles([]);
    setWatermarkedFile(null);
    setSelectedTemplate(null);
    setText("");
  }

  function handleText(prompt) {
    setText(prompt);
  }

  function handleTemplate(x) {
    setSelectedTemplate(x);
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
            handleRefresh={handleRefresh}
            handleText={handleText}
            handleTemplate={handleTemplate}
            text={text}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
