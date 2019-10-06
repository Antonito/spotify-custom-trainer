import { spotifyMediaElements } from './createElement';

const defaultPitch = 0.0;
let lastPitch = defaultPitch;

export const getLastPitch = () => lastPitch;

export const update = (newPitch) => {
  spotifyMediaElements.forEach((_, ndx) => {

    // Sets for Chrome
    // See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
    if (spotifyMediaElements[ndx].webkitPreservesPitch !== undefined) {
        spotifyMediaElements[ndx].webkitPreservesPitch = true
    }

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
