import React, { useState } from 'react';

const FileUpload = () => {

  const [selectedFile, setSelectedFile] = useState(null)

  const onFileChange = (event) => {
    console.log(event)
    setSelectedFile(event.target.files[0])
  }

  const onSubmitClick = (event) => {
    console.log(selectedFile)
    const form = new FormData();
    form.append(
      "uploadedFile",
      selectedFile,
      selectedFile.name
    )

    const options = {
      method: "POST",
      body: form
    }

    fetch("http://localhost:8080/upload", options)
      .then(() => console.log("uploaded"))
      .catch((err) => console.log(err))
  }

  return (
    <div>
    <h1>Upload file</h1>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
      <div>
        <input type="button" onClick={onSubmitClick} value="Submit" />
      </div>
    </div>
  )
}

export default FileUpload