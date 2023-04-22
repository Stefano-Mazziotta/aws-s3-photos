import routerFiles from "./files.routes.js"

export default function apiRouter(server){
    server.use('/api/files', routerFiles)
}