import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [inputs, setInputs]= useState({
    title: '',
    file: null
  })

  const [ searchParams, setSearchParams ] = useState({
    fileName: ''
  })

  const handleChangeTitle = (event) => {
    setInputs(prevInputs => ( {...prevInputs, title: event.target.value} ))
  }

  const handleChangeFile = (event) => {
    setInputs(prevInputs => ( {...prevInputs, file: event.target.files[0]} ))
  }

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/api/files'
    fetch(apiUrl)
      .then(data => data.json())
      .then(data => console.log(data));
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault()

    const body = new FormData()
    for(const name in inputs) {
      body.append(name, inputs[name]);
    }

    const apiUrl = 'http://localhost:3000/api/files'
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: body
    });

    console.log(response)
  }

  const handleSubmitSearchFile = async (event) => {
    event.preventDefault()

    const { fileName } = searchParams 
    
    const apiUrl = `http://localhost:3000/api/files/${fileName}`
    const response = await fetch(apiUrl)

    console.log(response)

  }

  const handleClickDownloadFile = async () => {

    const { fileName } = searchParams 
    
    const apiUrl = `http://localhost:3000/api/files/download/${fileName}`
    const response = await fetch(apiUrl)

    console.log(response)
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
          <input className='btn-submit' type="submit" value="search file" />
        </form>

        <button className='btn-submit' onClick={handleClickDownloadFile}>Download file</button>        
      </section>
      <img src="http://localhost:3000/horizontal-small.jpg" alt="as" />
    </div>
  )
}

export default App
