// Express app serving index.html to port 3001
const express = require('express');
const cors = require('cors');
const movies = require('./movies');


// express app
const app = express();
const PORT = process.env.PORT || 3001

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

//middleware & static files
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json( movies );
});

// listen for requests
app.listen(PORT);
console.log("Server is running on port " + PORT );

