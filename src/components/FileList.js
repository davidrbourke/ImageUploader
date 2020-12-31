import React from 'react'

const FileList = ({ filenames }) => {
  console.log(filenames)
  return (
    <div>
      {filenames.map((filename) => {
        return (
          <div className="row" key={filename.ImageName}>
            <div className="col-sm">
              <div className="card mt-3">
                <img src={filename.ImageURL} alt={filename.ImageName} className="card-img-top"/>
                <div className="card-body">
                  <h5 className="card-title">
                    {filename.ImageName}
                  </h5>
                </div>
              </div>
            </div>
            <div className="col-sm">
            </div>
          </div>)
        })
      }
    </div>
  )
}

export default FileList