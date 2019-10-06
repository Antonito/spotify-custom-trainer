import { spotifyMediaElements } from './createElement';

const defaultSpeed = 1.0;
let lastSpeed = defaultSpeed;

export const getLastSpeed = () => lastSpeed;

export const update = (newSpeed) => {
  spotifyMediaElements.forEach((_, ndx) => {
    spotifyMediaElements[ndx].playbackRate = newSpeed;
    if (newSpeed !== lastSpeed) {
      lastSpeed = newSpeed;
    }
  });
};

export const createButton = () => {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = 'spotify-custom-speed-slider';
  input.style = 'background-color: #08080859;'
    + 'border: #823333;'
    + 'width: 45px;'
    + 'margin: 5px;';
  input.value = getLastSpeed() * 100;

  return input;
}
