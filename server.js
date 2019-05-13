const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const devicesApi = require('./routes/devicesApi');


app.use(bodyParser.json());
app.use('/api/devices', devicesApi);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));