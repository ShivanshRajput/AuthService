const express = require('express');
const { PORT } = require('./config/serverConfig');
const app = express();

const prepareAndStartSerrver = async() => {
    app.listen(PORT, () => {
        console.log(`Server Started @ port ${PORT}`);
    })
}

prepareAndStartSerrver();