import React, { useEffect, useState } from 'react'
import { getFilenames } from './../api'

const FileList = () => {

  const [filenames, setFilenames] = useState([])

  useEffect(() => {
    getFilenames()
      .then((fileList) => {
        console.log(fileList)
        setFilenames(fileList)
      })
  }, [])

  return (
    <div>
      <ol>
      {filenames.map((filename) => <li>{filename}</li>)}
      </ol>
    </div>
  )
}

export default FileList