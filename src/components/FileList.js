import React from 'react'

const FileList = ({ filenames }) => {
  console.log(filenames)
  return (
    <div>
      <ol>
      {filenames.map((filename) => {
        return (
        <li key={filename.ImageName}>
          <div>{filename.ImageName}</div>
          <div>
            <img src={filename.ImageURL} alt={filename.ImageName} />
          </div>
        </li>)})
      }
      </ol>
    </div>
  )
}

export default FileList