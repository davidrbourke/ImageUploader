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

const getFilenames = () => {
  const options = {
    method: "GET"
  }

  return fetch(`${baseUrl}/images`, options)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export {
  getFilenames,
  uploadFile,
}