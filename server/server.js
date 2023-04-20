import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import apiRouter from './routes/router.js'

function runServer(){
    
    const PORT = 3000
    const corsOptions = {
        origin: 'http://127.0.0.1:5173'
    }

    config()
    const server = express()   

    server.use(cors(corsOptions))
    server.use(fileUpload({
        useTempFiles : true,
        tempFileDir : './tmp'
    }))

    apiRouter(server)
    
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

runServer()
