const http = require('http');
const app = require('./app');
require('dotenv').config()


// app.set('port', process.env.PORT || 5000);
const port =  process.env.PORT || 5000
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running at server started at ${port}`);
});