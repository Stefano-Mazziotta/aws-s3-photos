import { Router } from "express"; 
import { uploadFileToS3 } from "../s3.js";

const routerPhotos = Router();
routerPhotos.post("/", async (request, response) => {
    const { body, files } = request
    
    const responseS3 = await uploadFileToS3(files.file)
    response.json(responseS3)
});

routerPhotos.get("/", (request, response) => {  
    response.send('get photo')
});

    
export default routerPhotos;