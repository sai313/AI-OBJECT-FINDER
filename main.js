objects = [];
status = "";

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
}

function start() {
    object_detector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects.."
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        object_detector.detect(video, gotResults);
        for (var i = 0;i < objects.length;i++) {
            document.getElementById("status").innerHTML = "Object Detected";
            fill("#5D8598");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label+"  "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("#5D8598");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (object_name == objects[i]) {
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name+" found";
            } else {
                document.getElementById("object_status").innerHTML = object_name+" not found";
            }
        }
    }
}