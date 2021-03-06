import { locService } from './loc.service.js';
import { controller } from '../app.controller.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
  pickLocation,
};

var gMap;

function initMap() {
  const myLatlng = { lat: 32.0749831, lng: 34.9120554 };
  console.log('InitMap');

  return _connectGoogleApi().then(() => {
    console.log('google available');
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: myLatlng,
      zoom: 15,
    });
    console.log('Map!', gMap);
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function pickLocation() {
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: 'Click the map to get Lat/Lng!',
    position: gMap.myLatlng,
  });
  infoWindow.open(gMap);
  // Configure the click listener.
  gMap.addListener('click', (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(gMap);
    locService.createLocation(
      mapsMouseEvent.latLng.toJSON().lat,
      mapsMouseEvent.latLng.toJSON().lng
    );

    // controller.renderLocationTable(lat,lng);
  });
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = 'AIzaSyDeQYf-EFYik8C7xR2f_xM70asOlVcT_7Q';
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}
