var SEGMENTS_COUNT = 72;
var VISUALIZATION_RADIUS = 5;

var scene = document.querySelector('a-scene');
var segments = [];

generateAudioVisualizationSegments(scene);


var audio = new Audio();
audio.src = 'audio/happy-birthday.mp3';
audio.autoplay = true;
audio.loop = true;

var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

var timeDomainData = new Uint8Array(analyser.fftSize);
var audioDataIndexInterval = Math.floor(analyser.fftSize / SEGMENTS_COUNT);

var frameTimestamp = new Date();
(function visualize() {
    requestAnimationFrame(visualize);
    analyser.getByteTimeDomainData(timeDomainData);

    segments.forEach(function(segment, i) {
        var data = timeDomainData[i * audioDataIndexInterval] - 128;
        segment.setAttribute('height', Math.max(0, data / 10));
    });
})();



function generateAudioVisualizationSegments(container) {
    for (var i = 0; i < SEGMENTS_COUNT; i++) {
        var segment = generateAudioVisualizationSegment(i);
        segments.push(segment);
        scene.appendChild(segment);
    }
}


function generateAudioVisualizationSegment(index) {
    var angle = calculateAngleAtIndex(index);
    var position =  calculatePointAtAngle(degreesToRadians(angle), VISUALIZATION_RADIUS);
    var segment = document.createElement('a-box');
    segment.setAttribute('color', '#aa0000');
    segment.setAttribute('width', 0.25);
    segment.setAttribute('height', 0.25);
    segment.setAttribute('depth', 0.25);
    segment.setAttribute('position', [
        position.x,
        'ontouchstart' in window ? 0 : 1.6,
        position.y
    ].join(' '));
    segment.setAttribute('rotation', [0, -angle, 0].join(' '));
    console.log(angle);
    return segment;
}


function calculatePointAtAngle(angle, distance) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
        x: x < 0.00001 && x > -0.00001 ? 0 : x,
        y: y < 0.00001 && y > -0.00001 ? 0 : y
    };
}


function calculateAngleAtIndex(index) {
    return 360 / SEGMENTS_COUNT * index;
}


function degreesToRadians(angle) {
    return angle * Math.PI / 180;
}
