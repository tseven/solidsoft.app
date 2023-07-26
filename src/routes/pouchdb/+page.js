import { dev, browser } from '$app/environment';
// import PouchDB from "pouchdb";
// import PouchDB from "pouchdb/lib/index-browser.es.js";
// import PouchDB from "pouchdb/lib/index-browser.es.js";
// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = true;

// const db = new PouchDB('kittens');
// console.log(db)

console.log('hi')