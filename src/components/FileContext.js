import React, { useEffect , useState } from 'react'
import FileUpload from './FileUpload'
import FileList from './FileList'
import { getFilenames, uploadFile } from './../api'
import FilenameFilter from './FilenameFilter'

const FileContext = () => {

  const [filenames, setFilenames] = useState([])
  const [isUploaded, setIsUploaded] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(1)
  const [scrollListLength, setScrollListLength] = useState(10)
  const [filenameFilter, setFilenameFilter] = useState('')
  const [isLastSet, setIsLastSet] = useState(false)

  useEffect(() => {
    getFilenames(scrollIndex, scrollListLength, filenameFilter)
      .then((fileList) => {
        setFilenames([...filenames, ...fileList.Images])
        setIsLastSet(fileList.IsLastSet)
      })
  }, [isUploaded, scrollIndex])

  useEffect(() => {
    const defaultScrollIndex = 1
    const defaultScrollListLength = 10
    setScrollIndex(defaultScrollIndex)
    setScrollListLength(defaultScrollListLength)
    getFilenames(defaultScrollIndex, defaultScrollListLength, filenameFilter)
      .then((fileList) => {
        setFilenames(fileList.Images)
        setIsLastSet(fileList.IsLastSet)
      })
  }, [filenameFilter])

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
      <FilenameFilter filter={filenameFilter} setFilter={setFilenameFilter} />
      <FileList filenames={filenames} scrolled={scrolled} isLastSet={isLastSet} />
    </>
  )
}

export default FileContext