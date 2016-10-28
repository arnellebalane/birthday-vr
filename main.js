var TEXT = 'happy\nbirthday\njedijulia';
var PIXEL_SIZE = 0.5;
var LINE_HEIGHT = 9;
var MOBILE = 'ontouchstart' in window;

var scene = document.querySelector('a-scene');
var cursor = { x: 0, y: 0 };


// calculate total dimensions of rendered message
var dimensions = { width: 0, height: 0 };
var tempWidth = 0;

for (var i = 0; i < TEXT.length; i++) {
    var character = TEXT.charAt(i);
    if (character === '\n') {
        dimensions.height += LINE_HEIGHT;
        tempWidth = 0;
        continue;
    } else if (!letters.hasOwnProperty(character)) {
        continue;
    }
    var letter = letters[character];
    tempWidth += letter.data[0].length;

    if (tempWidth > dimensions.width) {
        dimensions.width = tempWidth;
    }
}


// calculate offsets in order to center the rendered message
var offsets = {
    x: -dimensions.width / 2 * PIXEL_SIZE,
    y: dimensions.height / 2 * PIXEL_SIZE + 3.6
};


// actual rendering of each text character
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
            scene.appendChild(pixel);

            pixel.setAttribute('width', PIXEL_SIZE);
            pixel.setAttribute('height', PIXEL_SIZE);
            pixel.setAttribute('depth', PIXEL_SIZE);
            pixel.setAttribute('color', '#ff0000');
            pixel.setAttribute('position', [
                (cursor.x * PIXEL_SIZE) + (column * PIXEL_SIZE) + offsets.x,
                (cursor.y * PIXEL_SIZE) + ((-row * PIXEL_SIZE) - (letter.top * PIXEL_SIZE)) + offsets.y,
                -10
            ].join(' '));
        }
    }
    cursor.x += letter.data[0].length + 1;
}
