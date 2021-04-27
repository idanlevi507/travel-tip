import { util } from './util.js';
import { storage } from './storage.js';
export const locService = {
    getLocs,
    createLocation
}
const gLocs = []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}

// function locations() {

// }

function createLocation(lat,lng) {
console.log('createLocation');
    let location = {
        id: util.makeId(),
        name: 'name',
        lat,
        lng,
        weather:'sun',
        createdAt: Date.now(),
        updatedAt:'10:00'
    }
    gLocs.push(location);
    storage.saveToStorage('locations', gLocs);

}


