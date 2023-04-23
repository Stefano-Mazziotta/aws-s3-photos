import { useEffect, useState } from 'react'
import './App.css'
import { downloadFileToServer, getFile, getFileUrl, getFiles, uploadFileToS3 } from './services/files'

function App() {

  const [inputs, setInputs]= useState({
    title: '',
    file: null
  })

  const [ searchParams, setSearchParams ] = useState({
    fileName: ''
  })

  const [ fileUrl, setFileUrl ] = useState('')

  const handleChangeTitle = (event) => {
    setInputs(prevInputs => ( {...prevInputs, title: event.target.value} ))
  }

  const handleChangeFile = (event) => {
    setInputs(prevInputs => ( {...prevInputs, file: event.target.files[0]} ))
  }

  useEffect(() => {
    getFiles().then(
      data => console.log(data)
    )
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = uploadFileToS3(inputs)
    console.log(response)
  }

  const handleSubmitSearchFile = async (event) => {
    event.preventDefault()

    const { fileName } = searchParams 
    const file = getFile(fileName)
  }

  const handleClickDownloadFile = async () => {
    const { fileName } = searchParams 
    const response = downloadFileToServer(fileName)
  }

  const handleClickGetFileUrl = async () => {
    const { fileName } = searchParams 
    const url = getFileUrl(fileName)
    setFileUrl(url)
  }

  const handleChangeFileName = (event) => {
    setSearchParams(previousSearchParams => ( {...previousSearchParams, fileName: event.target.value} ))
  }

  return (
    <div className="App">
      <section className='section-container'>
        <form className="form-container" onSubmit={handleSubmit}>
          <input onChange={handleChangeTitle} type="text" name='title' placeholder="title"/>
          <input onChange={handleChangeFile} type="file" name='file'/>
          <input className='btn-submit' type="submit" value="upload image" />
        </form>
      </section>

      <section className='section-container'>
        <h3 className='title'>search file from S3</h3>
        <form className="form-container" onSubmit={handleSubmitSearchFile}>
          <input onChange={handleChangeFileName} type="text" name='fileName' placeholder="File name"/>
          <input className='btn-submit' type="submit" value="search file in S3" />
        </form>

        <button className='btn-submit' onClick={handleClickDownloadFile}>Download file to server</button>        
        <button className='btn-submit' onClick={handleClickGetFileUrl}>Get S3 file url</button>        
      </section>
      <img src="http://localhost:3000/horizontal-small.jpg" alt="image" />
      {fileUrl && 
        <div className='img-container'>
          <img src={fileUrl} alt="image" />
        </div>       
      }
    </div>
  )
}

export default App
