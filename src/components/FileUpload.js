import React, { useState } from 'react'

const FileUpload = ({ onUpload, isUploaded }) => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [imageName, setImageName] = useState('')
  const [imageUploaded, setImageUploaded] = useState(false)

  const onFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
      setPreviewImage(URL.createObjectURL(event.target.files[0]))
      setImageName(event.target.files[0].name)
    }
  }

  const onSubmitClick = (event) => {
    const form = new FormData();
    form.append(
      "uploadedFile",
      selectedFile,
      selectedFile.name,
    )

    form.append("customFileName", imageName)

    onUpload(form)
      .then(() => {
        setImageName('')
        setPreviewImage(null)
        setSelectedFile(null)
        toggleImageUploaded(true)        
      })
  }

  const canSubmit = () => {
    return selectedFile !== null && imageName !== ''
  }

  const toggleImageUploaded = (isUpload) => {
    setImageUploaded(isUpload)
    setTimeout(() => setImageUploaded(false), 5000)
  }

  return (
    <form>
    <h1>Upload file</h1>
      <div className="row">
        <div className="col-sm">
          <div className="mb-3">
            <label htmlFor="imageInput" className="form-label">Select image</label>
            <input type="file" onChange={onFileChange} className="form-control" id="imageInput" />
          </div>

          <div className="mb-3">
            <label htmlFor="imageName" className="form-label">File name</label>
            <input type="text" value={imageName} onChange={(e) => setImageName(e.target.value)} className="form-control" />
          </div>
          
          <div className="mb-3">
            <input type="button" onClick={onSubmitClick} value="Submit" disabled={!canSubmit()} className="form-control" />
            { selectedFile !== null &&
            <p>You must select Submit to upload the image.</p>
            }
          </div>
        </div>
        <div className="col-sm">
          <div className="image-upload">
            { previewImage != null &&
              <img src={previewImage} alt="A preview of bakery item to be uploaded"/>
            }
          </div>
          { imageUploaded === true &&
          <div className="alert alert-primary" role="alert">
            The image has been uploaded.
          </div>
          }
        </div>

      </div>
    </form>
  )
}

export default FileUpload
