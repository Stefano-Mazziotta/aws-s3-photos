import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import apiRouter from './routes/router.js'

function runServer(){
    
    const PORT = 3000

    const whitelist = ['http://127.0.0.1:5173', 'http://localhost:5173']
    const corsOptions = {
        origin: function (origin, callback) {
            const existOrigin = whitelist.indexOf(origin)

            if ( existOrigin === -1) {
                callback(new Error('Not allowed by CORS'))
                return;
            }

            callback(null, true)
        }
    }

    const server = express()   

    server.use(express.static('files'))
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
