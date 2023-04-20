import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [inputs, setInputs]= useState({
    title: '',
    file: null
  })

  const handleChangeTitle = (event) => {
    setInputs(prevInputs => ( {...prevInputs, title: event.target.value} ))
  }

  const handleChangeFile = (event) => {
    setInputs(prevInputs => ( {...prevInputs, file: event.target.files[0]} ))
  }

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/api/photos'
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

    const apiUrl = 'http://localhost:3000/api/photos'
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: body
    });

    console.log(response)
  }

  return (
    <div className="App">
      <form className="form-container" onSubmit={handleSubmit}>
        <input onChange={handleChangeTitle} type="text" name='title' placeholder="title"/>
        <input onChange={handleChangeFile} type="file" name='file'/>
        <input className='btn-submit' type="submit" value="upload image" />
      </form>
    </div>
  )
}

export default App
