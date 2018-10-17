import GeoLocation from '../../models/GeoLocation.js';

export function getCoords(): Promise<GeoLocation> {
  return new Promise((resolve, reject) => {
    if (navigator && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(GeoLocation.fromJs(position.coords));
      });
    } else {
      reject(GeoLocation());
    }
  })
}
