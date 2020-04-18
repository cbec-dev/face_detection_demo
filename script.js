
// Primero se obtiene el elemento video (se creó con la id webcam-video)
const video = document.getElementById('webcam-video')

// Promise para cargar webcam al cargar los modelos
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(startVideo)


// Conexión a webcam
function startVideo() {
    navigator.getUserMedia(
        { video: {}},
        stream => video.srcObject = stream,
        err => console.error(err)
        )
}

// Se agrega listener para obtener detecciones y dibujar sobre el video
video.addEventListener('play', () => {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(detections)
    }, 100)
})


