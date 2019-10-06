import { interceptor } from './createElement';
import * as Speed from './speed';
import * as Pitch from './pitch';

// Acts as a middleware, before the brower's original `creatElement` function
document.createElement = interceptor;

window.onload = () => {
    const validateAndChangeSpeed = (newSpeed) => {
      // val must be in format 0.0625 - 16.0 https://stackoverflow.com/a/32320020
      const val = parseFloat(newSpeed || (speedInput.value / 100));
      if (!isNaN(val)) { /* check if val is a number */
        Speed.update(val);
      }
    };
    const validateAndChangePitch = (newPitch) => {
      const val = parseFloat(newPitch || (pitchInput.value * 100));
      if (!isNaN(val)) { /* check if val is a number */
        Pitch.update(val);
      }
    };

    // GUI stuff

    /* Building our playback speed input element */
    const speedInput = Speed.createButton();
    speedInput.oninput = (_) => {
      validateAndChangeSpeed();
    };
    const pitchInput = Pitch.createButton();
    pitchInput.oninput = (_) => {
      validateAndChangePitch();
    }

    // Engine stuff

    // Helps with caching
    let speedInputCache = null;
    let pitchInputCache = null;

    // This function is called by itself over and over
    const timeout = () => {
      // If the GUI is not displayed, add it to the page
      if (!speedInputCache) {
        speedInputCache = document.getElementById(speedInput.id);
        if (!speedInputCache) {
          document.getElementsByClassName('now-playing-bar__right')[0].appendChild(speedInput);
        }
      }
      if (!pitchInputCache) {
        pitchInputCache = document.getElementById(pitchInput.id);
        if (!pitchInputCache) {
          document.getElementsByClassName('now-playing-bar__right')[0].appendChild(pitchInput);
        }
      }


      // setTimeout is a delayed call(500 milliseconds) to the code below
      setTimeout(() => {
        try {
          validateAndChangeSpeed(Speed.getLastSpeed());
        } catch{
          // Ignore errors
        }

        timeout();
      }, 500);
  }

  timeout();
}
