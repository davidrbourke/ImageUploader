import React from 'react'

const FileList = ({ filenames }) => {
  console.log(filenames)
  return (
    <div>
      <ol>
      {filenames.map((filename) => <li key={filename}>{filename}</li>)}
      </ol>
    </div>
  )
}

export default FileList