import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const FileList = ({ filenames, scrolled, isLastSet}) => {

  console.log(filenames)
  return (
    <InfiniteScroll
      dataLength={filenames.length}
      next={scrolled}
      hasMore={!isLastSet}
      loader={<h4>Loading</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
        <b>No more images to display</b>
      </p>
      }>
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
    </InfiniteScroll>
  )
}

export default FileList