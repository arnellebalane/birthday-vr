var TEXT = 'happy\nbirthday\njulia';
var PIXEL_SIZE = 0.5;
var LINE_HEIGHT = 9;

var scene = document.querySelector('a-scene');
var cursor = { x: 0, y: 0 };


for (var i = 0; i < TEXT.length; i++) {
    var character = TEXT.charAt(i);
    if (character === '\n') {
        cursor.x = 0;
        cursor.y -= LINE_HEIGHT + 1;
        continue;
    } else if (!letters.hasOwnProperty(character)) {
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
                (cursor.x * PIXEL_SIZE) + (column * PIXEL_SIZE) - 5,
                (cursor.y * PIXEL_SIZE) + ((-row * PIXEL_SIZE) - (letter.top * PIXEL_SIZE)),
                -7
            ].join(' '));
            scene.appendChild(pixel);
        }
    }
    cursor.x += letter.data[0].length + 1;
}
