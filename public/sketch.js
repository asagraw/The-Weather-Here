// function setup() {
//     const canvas = createCanvas(160, 120);
//     pixelDensity(1);
//     background(0);
// noCanvas();
// const video = createCapture(VIDEO);
// video.size(320,240);
let lat, lon;
const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    // const mood = document.getElementById('mood').value;
    // canvas.loadPixels();
    // video.loadPixels();
    // const image64 = canvas.elt.toDataURL();
    // const image64 = video.canvas.toDataURL();
    // const data = { lat, lon, mood, image64 };
    const data = { lat, lon };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
});

if ('geolocation' in navigator) {

    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            console.log(lat, lon);
            document.getElementById('latitude').textContent = lat.toFixed(2);
            document.getElementById('longitude').textContent = lon.toFixed(2);
            const api_url = `weather/${lat},${lon}`;
            // const api_url = `/weather`;
            const api_resp = await fetch(api_url);
            const json = await api_resp.json();
            weather = json.weather.currently;
            air = json.air_quality.results[0].measurements[0];
            document.getElementById('summary').textContent = weather.summary;
            document.getElementById('temp').textContent = weather.temperature;
            // document.getElementById('CurrentTemp').textContent = weather.apparentTemperature;
            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;
            console.log(json);
        } catch (error) {
            console.error(error);
            air = { value: -1 };
            document.getElementById('aq_value').textContent = 'NO READING';
        }
    });
} else {
    console.log('geolocation not available');
}
// }
// function keyPressed() {
//     if (key == 'c') {
//         background(0);
//     }
// }

// function draw() {
//     stroke(255);
//     strokeWeight(8);
//     if (mouseIsPressed) {
//         line(pmouseX, pmouseY, mouseX, mouseY);
//     }
// }
//   <img src="" id="rainbow" width="480" />
//   <script>
//       console.log("About to fetch an image");
//       catchRainbow().then(response => {
//           console.log("Yay")
//       }).catch(error => {
//           console.log("Error!");
//           console.log(error);
//       });


//       async function catchRainbow() {
//           const response = await fetch('rainbow.jpg');
//           const blob = await response.blob();
//           document.getElementById("rainbow").src = URL.createObjectURL(blob);
//       }
//   </script> -->
//   <!-- <div><a href="/">Hello</a> | <a href="goodbye.html">goodbye</a></div>
//   <p>Hello!</p>

// document.getElementById('test').addEventListener('click', event => {
        //     if ("geolocation" in navigator) {
        //         console.log('geolocation available');
        //         navigator.geolocation.getCurrentPosition(async position => {
        //             // console.log(position);
        //             const lat = position.coords.latitude;
        //             const lon = position.coords.longitude;
        //             document.getElementById('latitude').textContent = lat;
        //             document.getElementById('longitude').textContent = lon;
        //             const data = { lat, lon };
        //             const options = {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'Application/json'
        //                 },
        //                 body: JSON.stringify(data)
        //             };
        //             const response = await fetch('/api', options);
        //             const json = await response.json();
        //             console.log(json);
        //         });
        //     } else {
        //         console.log('geolocation not available');
        //     };
        // });
        // press: function(evt){
        //     console.log("from event")
        // }