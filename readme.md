# heyCloud recrutment - Bartosz Ratajczyk

Tools used:

Client:

  * HTML
  * CSS
  * JavaScript

Server:

  * docker-compose
  * PostgreSQL in docker container
  * pgAdmin4 in docker container
  * node.js
  * express.js
    
Prerequisites:
 * docker
 * docker-compose-plugin
 * node.js
 * local server for client side (in development I used Live Server extension in vs code)

Instruction:

  1. ``` docker compose up ``` - open docker containers with database.
  2. ``` cd server ``` - open server directory.
  3. ``` npm i ``` - install server dependency. 
  4. ``` node index.js ``` - open local server at localhost:3000.
  6. Open index.html from client directory in local server (e.g. Live Server).
  
