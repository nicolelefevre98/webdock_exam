const express = require('express');
// const https = require('https');
// const fs = require('fs');
const cors = require('cors');
const router = require('./routes/index');
const { sequelize } = require('./models');

// const options = {
//    key: fs.readFileSync('/etc/letsencrypt/live/davidsserver.vps.webdock.cloud/privkey.pem'),
//    cert: fs.readFileSync('/etc/letsencrypt/live/davidsserver.vps.webdock.cloud/fullchain.pem')
// };

const app = express();
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));
app.use((req, res, next) => {
    console.log('Origin Requesting:', req.get('origin'));
    next();
});
app.use(express.json());

sequelize.sync();

app.use('/', router);

// Option 2: Create an HTTP server and listen on port 3001
app.listen(3002, () => console.log('Server running on port 3002'));
