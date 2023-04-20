import routerPhotos from "./photos.routes.js"

export default function apiRouter(server){
    server.use('/api/photos', routerPhotos)
}