import App from "./App.js";

const serverURL = "http://localhost:3000/person";
// the url should be in env file but for the sake of presentation
// I implemented it directly

new App(serverURL);
