const API_URL = 'http://localhost:3000/api/files'
const API_URL_FILES = `${API_URL}/files`

export async function getFiles(){
    const apiUrl = 'http://localhost:3000/api/files'
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data      
}

export async function getFile(fileName){
    const apiUrl = `${API_URL_FILES}/${fileName}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}

export async function getFileUrl(fileName){
    const apiUrl = `${API_URL_FILES}/url/${fileName}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}

export async function uploadFileToS3(inputs){

    const body = new FormData()
    for(const name in inputs) {
      body.append(name, inputs[name]);
    }
    
    const response = await fetch(API_URL_FILES, {
      method: 'POST',
      body: body
    });
    const data = await response.json()

    return data
}

export async function downloadFileToServer(fileName){
    const apiUrl = `${API_URL_FILES}/download/${fileName}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
}