// --------- NODE EXPRESS FRAMEWORK


// Express is a powerful but flexible Javascript framework for creating web 
// servers and APIs. It can be used for everything from simple static file 
// servers to JSON APIs to full production servers. 

// START SERVER 

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// ------ Express Routes

// Express uses app.get() to register routes to match GET requests. Express 
// routes (including app.get()) usually take two arguments, a path (usually 
// a string), and a callback function to handle the request and send a response.

const moods = [{ mood: 'excited about express!'}, { mood: 'route-tastic!' }];
app.get('/moods', (req, res, next) => {
  // Here we would send back the moods array in response
});

// The route above will match any GET request to '/moods' and call the callback 
// function, passing in two objects as the first two arguments. These objects 
// represent the request sent to the server and the response that the Express 
// server should eventually send to the client.

// If no routes are matched on a client request, the Express server will handle 
// sending a 404 Not Found response to the client.
