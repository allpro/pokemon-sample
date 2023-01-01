import { openDB } from 'idb';

const dbPromise = openDB('pokemon-store', 1, {
  upgrade(db) {
    db.createObjectStore('pokemon');
  },
});

const ready = callback => dbPromise.then(callback);

const get =        key => ready(() => dbPromise.get('pokemon', key));
const set = (key, val) => ready(() => dbPromise.put('pokemon', val, key));
const del =        key => ready(() => dbPromise.delete('pokemon', key));
const clear =       () => ready(() => dbPromise.clear('pokemon'));
const keys =        () => ready(() => dbPromise.getAllKeys('pokemon'));

const indexedDB = { get, set, del, clear, keys };

export default indexedDB;
