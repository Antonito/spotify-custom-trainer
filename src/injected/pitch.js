import { spotifyMediaElements } from './createElement';

const defaultPitch = 0.0;
let lastPitch = defaultPitch;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let sources = [];

export const getLastPitch = () => lastPitch;

export const update = (newPitch) => {
  spotifyMediaElements.forEach((_, ndx) => {

    // Sets for Chrome
    // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    if (spotifyMediaElements[ndx].webkitPreservesPitch !== undefined) {
        spotifyMediaElements[ndx].webkitPreservesPitch = true
    }

    if (!sources[ndx]) {
      const mediaSrc = audioCtx.createMediaElementSource(spotifyMediaElements[ndx]);
      sources[ndx] = audioCtx.createBiquadFilter();
      sources[ndx].type = 'allpass';
      // found out about detune here: http://chimera.labs.oreilly.com/books/1234000001552/ch04.html
      mediaSrc.connect(sources[ndx]);

      sources[ndx].connect(audioCtx.destination);
    }

    const source = sources[ndx];
    source.detune.value = newPitch;

    if (newPitch !== lastPitch) {
        lastPitch = newPitch;
    }
  });
};

export const createButton = () => {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'spotify-custom-pitch-slider';
  input.style = 'background-color: #08080859;'
    + 'border: #823333;'
    + 'width: 45px;'
    + 'margin: 5px;';
  input.value = getLastPitch();

  return input;
}
