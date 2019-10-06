import { interceptor } from './createElement';
import * as Speed from './speed';

// Acts as a middleware, before the brower's original `creatElement` function
document.createElement = interceptor;

window.onload = () => {
    const validateAndChangeSpeed = (newSpeed) => {
      // val must be in format 0.0625 - 16.0 https://stackoverflow.com/a/32320020
      const val = parseFloat(newSpeed || (input.value / 100));
      if (!isNaN(val)) { /* check if val is a number */
        Speed.update(val);
      }
    };

    // GUI stuff

    /* Building our playback speed input element */
    const speedInput = Speed.createButton();
    speedInput.oninput = (_) => {
      validateAndChangeSpeed();
    };

    // Engine stuff

    // Helps with caching
    let speedInputCache = null;

    // This function is called by itself over and over
    const timeout = () => {
      // If the GUI is not displayed, add it to the page
      if (!speedInputCache) {
        speedInputCache = document.getElementById('speed-extension-input');
        if (!speedInputCache) {
          document.getElementsByClassName('now-playing-bar__right')[0].appendChild(speedInput);
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

  console.log("Starting timeout");
  timeout();
}
