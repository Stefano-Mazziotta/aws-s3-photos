import { Router } from "express"; 
import fs from 'fs'
import { getFileFromS3, getFilesFromS3, uploadFileToS3, getFileUrl } from "../s3.js";

const routerFiles = Router();
routerFiles.post("/", async (request, response) => {
    const { body, files } = request
    
    const responseS3 = await uploadFileToS3(files.file)
    response.json(responseS3)
});

routerFiles.get("/", async (request, response) => {  
    console.log('get all Files')

    const responseS3 = await getFilesFromS3();
    response.json(responseS3.Contents)
});

routerFiles.get("/:fileName", async (request, response) => {  
    
    const { fileName } = request.params
    console.log(`get "${fileName}" file`)

    const responseS3 = await getFileFromS3(fileName)
    response.json(responseS3.$metadata)
});

routerFiles.get("/download/:fileName", async (request, response) => {
    const { fileName } = request.params
    console.log(`download "${fileName}" file`)

    const responseS3 = await getFileFromS3(fileName)
    responseS3.Body.pipe(fs.createWriteStream(`./files/${fileName}`))
    response.json({message: "Archivo descargado"})
})

routerFiles.get("/url/:fileName", async (request, response) => {
    const { fileName } = request.params
    console.log(`get "${fileName} url."`)

    const url = await getFileUrl(fileName)
    response.json(url)
})
    
export default routerFiles;