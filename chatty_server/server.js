// server.js

const express = require('express');
const WebSocket = require('ws');
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new WebSocket.Server({ server });

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const color = getRandomColor();
  ws.send(JSON.stringify({type: 'setColor', color}));
  wss.clients.forEach((client) => {
    client.send(JSON.stringify({type: 'incomingUserChange', count: wss.clients.size}));
  });
  ws.on('message', (data) => {
    const event = JSON.parse(data);
    switch (event.type) {
      case 'postMessage':
        event.type = 'incomingMessage';
        event.id = uuid.v1();
        break;
      case 'postNotification':
        event.type = 'incomingNotification';
        break;
      default:
        throw new Error('Unknown data type ' + event.type);
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(event));
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({type: 'incomingUserChange', count: wss.clients.size}))
    });
  });
});
