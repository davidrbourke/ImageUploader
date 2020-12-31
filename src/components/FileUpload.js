import React, { useState } from 'react'

const FileUpload = ({ onUpload, isUploaded }) => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState('')
  const [imageUploaded, setImageUploaded] = useState(false)

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    setPreviewImage(URL.createObjectURL(event.target.files[0]))
  }

  const onSubmitClick = (event) => {
    const form = new FormData();
    form.append(
      "uploadedFile",
      selectedFile,
      selectedFile.name
    )

    onUpload(form)
      .then(() => {
        setImageName('')
        setPreviewImage(null)
        setSelectedFile(null)
        setImageUploaded(true)
      })
  }

  const canSubmit = () => {
    return selectedFile !== null && imageName !== ''
  }

  return (
    <div>
    <h1>Upload file</h1>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
      <div>
        { selectedFile !== null &&
        <p>You must select Submit to upload the image.</p>
        }
        <input type="button" onClick={onSubmitClick} value="Submit" disabled={!canSubmit()} />
      </div>
      <div>
        <span>Image file name</span>
        <input type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} />
        { previewImage != null &&
        <img src={previewImage} alt="A preview of bakery item to be uploaded"/>
        }
      </div>
      { imageUploaded === true &&
      <p>Image uploaded</p>
      }
    </div>
  )
}

export default FileUpload
