const express = require('express');
const app = express();
const Datastore = require('nedb');
app.listen(3000, ()=> console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
var co_data = new Datastore('database.db');
co_data.loadDatabase();
app.get('/api', (request, response) => {
    co_data.find({}, (err,data)=>{
        if(err){
            response.end();
            return;
        }else{
            response.json(data);
        }
    })
});
app.post('/api', (request, response)=>{
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    co_data.insert(data);
    response.json({
        status:'Success',
        latitude: data.lat,
        longitude: data.lon,
        timestamp: data.timestamp
    });
})
