Webcam.set({
    width: 350,
    height: 270,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured-img' src='" + data_uri + "'/>";
    });
}

console.log("ml5 version:", ml5.version);
var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0TwCf0DeC/model.json', modelloaded);

function modelloaded() {
    console.log('Model Is Loaded');
}

function indentifySnapshot() {
    var img = document.getElementById("captured-img");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error)
    } else {
        console.log(result);
    }
    document.getElementById("resultObjectName").innerHTML = result[0].label;
    document.getElementById("resultObjectAccuracy").innerHTML = result[0].confidence.toFixed(3);
}