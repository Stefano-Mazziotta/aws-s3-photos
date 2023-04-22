import { Router } from "express"; 
import { getFileFromS3, getFilesFromS3, uploadFileToS3 } from "../s3.js";

const routerPhotos = Router();
routerPhotos.post("/", async (request, response) => {
    const { body, files } = request
    
    const responseS3 = await uploadFileToS3(files.file)
    response.json(responseS3)
});

routerPhotos.get("/", async (request, response) => {  
    console.log('get all photos')

    const responseS3 = await getFilesFromS3();
    response.json(responseS3.Contents)
});

routerPhotos.get("/:fileName", async (request, response) => {  
    
    const { fileName } = request.params
    console.log(`get "${fileName}" photo`)

    const responseS3 = await getFileFromS3(fileName)
    response.json(responseS3.$metadata)
});

    
export default routerPhotos;