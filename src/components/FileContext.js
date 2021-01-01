import React, { useEffect , useState } from 'react'
import FileUpload from './FileUpload'
import FileList from './FileList'
import { getFilenames, uploadFile } from './../api'

const FileContext = () => {

  const [filenames, setFilenames] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(1)
  const [scrollListLength, setScrollListLength] = useState(10)
  const [isLastSet, setIsLastSet] = useState(false)

  useEffect(() => {
    getFilenames(scrollIndex, scrollListLength)
      .then((fileList) => {
        setFilenames([...filenames, ...fileList.Images])
        setIsLastSet(fileList.IsLastSet)
      })
  }, [isUploaded, scrollIndex])

  const onUpload = (form) => {
    return uploadFile(form)
      .then(() => {
        setIsUploaded(!isUploaded)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const scrolled = () => {
    const updScrollIndex = scrollIndex + 1
    setScrollIndex(updScrollIndex)
  }

  return (
    <>
      <FileUpload onUpload={onUpload} isUploaded={isUploaded} />
      <FileList filenames={filenames} scrolled={scrolled} isLastSet={isLastSet} />
    </>
  )
}

export default FileContext