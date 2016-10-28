var TEXT = 'abcdefghijklmnopqrstuvwxyz';
var PIXEL_SIZE = 0.5;

var scene = document.querySelector('a-scene');
var cursor = 0;


for (var i = 0; i < TEXT.length; i++) {
    var character = TEXT.charAt(i);
    if (!letters.hasOwnProperty(character)) {
        continue;
    }
    var letter = letters[character];

    for (var row = 0; row < letter.data.length; row++) {
        for (var column = 0; column < letter.data[row].length; column++) {
            if (letter.data[row][column] === 0) {
                continue;
            }

            var pixel = document.createElement('a-box');
            pixel.setAttribute('width', PIXEL_SIZE);
            pixel.setAttribute('height', PIXEL_SIZE);
            pixel.setAttribute('depth', PIXEL_SIZE);
            pixel.setAttribute('color', '#ff0000');
            pixel.setAttribute('position', [
                (cursor * PIXEL_SIZE) + (column * PIXEL_SIZE) - 60,
                (-row * PIXEL_SIZE) - (letter.top * PIXEL_SIZE) + 3,
                -7
            ].join(' '));
            scene.appendChild(pixel);
        }
    }
    cursor += letter.data[0].length + 1;
}
