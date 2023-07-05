
const express = require('express');
const cors = require('cors');


const appRouter = require('./Router/index.js');

const port = process.env.PORT || 8080;
//const host = 'localhost';
const host = '0.0.0.0';

const app = express();

//to avoid CORS errors
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use('/', appRouter);

app.listen(port, host, () => {
    console.log(`Server is running on ${host}: ${port}`);
})


