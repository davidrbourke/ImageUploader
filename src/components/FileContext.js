import React, { useEffect , useState } from 'react'
import FileUpload from './FileUpload'
import FileList from './FileList'
import { getFilenames, uploadFile } from './../api'

const FileContext = () => {

  const [filenames, setFilenames] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)

  useEffect(() => {
    getFilenames()
      .then((fileList) => {
        setFilenames(fileList)
      })
  }, [isUploaded])

  const onUpload = (form) => {
    return uploadFile(form)
      .then(() => {
        setIsUploaded(!isUploaded)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <FileUpload onUpload={onUpload} isUploaded={isUploaded} />
      <FileList filenames={filenames} />
    </>
  )
}

export default FileContext