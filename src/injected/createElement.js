const documentCreateElementOriginal = document.createElement;

// Array of video/audio elements made by Spotify's scripts
export let spotifyMediaElements = [];

export function interceptor(message) {
  // Execute the browser's original code
  const element = documentCreateElementOriginal.apply(this, arguments); 

  // Intercept `video` and `audio` elements
  if (message == 'video' || message == 'audio') {
    // Keep the reference in memory
    console.log("Caught spotify media!");
    spotifyMediaElements.push(element);
  }
  return element;
};
