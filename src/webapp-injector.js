import scriptContentString from '!!raw-loader!../dist/spotify-custom.js'

const script = document.createElement('script');

script.type = "text/javascript";
script.id = "spotify-injector";
script.async = false
script.defer = false
script.textContent = scriptContentString;

document.body.appendChild(script);
// (document.head||document.documentElement).appendChild(script);
