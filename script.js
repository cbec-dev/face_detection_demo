
// Primero se obtiene el elemento video (se creó con la id webcam-video)
const video = document.getElementById('webcam-video')




// Conexión a webcam
function startVideo() {
    navigator.getUserMedia(
        { video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
        )
}

startVideo()