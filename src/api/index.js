const baseUrl = 'http://localhost:8080'

const uploadFile = (formData) => {
  const options = {
    method: "POST",
    body: formData
  }

  return fetch(`${baseUrl}/upload`, options)
    .then(() => console.log("uploaded"))
    .catch((err) => console.log(err))
}

const getFilenames = (index, length, filter) => {
  const options = {
    method: "GET"
  }

  let url = `${baseUrl}/images?index=${index}&length=${length}`
  if (filter !== '' && filter !== null && filter !== undefined){
    url = `${url}&filter=${filter}`
  }

  return fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  getFilenames,
  uploadFile,
}