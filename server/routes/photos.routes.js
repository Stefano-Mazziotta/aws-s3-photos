import { Router } from "express"; 

const routerPhotos = Router();
routerPhotos.post("/", (request, response) => {
    // const { title, file } = request.body
    console.log('upload photo')
    console.log(request.body)
    console.log(request.files)
    response.json('upload photo')
});

routerPhotos.get("/", (request, response) => {  
    response.send('get photo')
});

    
export default routerPhotos;