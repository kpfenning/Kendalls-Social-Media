const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { connection } = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(routes);



connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});