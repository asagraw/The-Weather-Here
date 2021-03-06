const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
var co_data = new Datastore('database.db');
co_data.loadDatabase();
app.get('/api', (request, response) => {
    co_data.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        } else {
            response.json(data);
        }
    })
});
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    co_data.insert(data);
    response.json({
        "fulfillmentText": "This is for Dialog Flow from My App on Heroku",
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        `Lattitude is 37.774929 and longitude is -122.419416`
                    ]
                }
            }
        ],
        "source": "",
        status: 'Success',
        latitude: data.lat || 37.774929,
        longitude: data.lon || -122.419416,
        timestamp: data.timestamp
    });
    // response.json({
    //     status: 'Success',
    //     latitude: data.lat || 37.774929,
    //     longitude: data.lon || -122.419416,
    //     timestamp: data.timestamp
    // });
})

app.get('/weather/:latlon', async (request, response) => {
    console.log(request.params);
    const latlon = request.params.latlon.split(',');
    console.log(latlon);
    const lat = latlon[0];
    const lon = latlon[1];
    console.log(lat, lon);
    // const api_url = 'https://api.darksky.net/forecast/3b3efcdbed54ae20f862a34b0fbd5b16/37.8267,-122.4233';
    const api_url = `https://api.darksky.net/forecast/3b3efcdbed54ae20f862a34b0fbd5b16/${lat},${lon}/?units=si`;
    console.log(api_url);
    const api_resp = await fetch(api_url);
    const api_json = await api_resp.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();
    const data = {
        weather: api_json,
        air_quality: aq_data
    }
    response.json(data);
})
