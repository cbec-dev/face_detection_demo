
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
    const canvas = faceapi.createCanvasFromMedia(video)
    // document.body.append(canvas)
    const webcamWrapper = document.getElementById('webcam-wrapper')
    webcamWrapper.append(canvas)
    const size = {width: video.width, height: video.height}
    faceapi.matchDimensions(canvas, size)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, size)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})


