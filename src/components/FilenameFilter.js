import React from 'react'

const FilenameFilter = ({filter, setFilter}) => {

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="filenameFilter1">Search filename</span>
      <input type="text" className="form-control" placeholder="Filename filter" aria-label="Filename filter" aria-describedby="filenameFilter1" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

export default FilenameFilter
