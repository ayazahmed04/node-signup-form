// PREFIX = (nod) 
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const https = require('https')
/* URL ENDCODED used method in the most best way  */
app.use(bodyParser.urlencoded({ extended: true }))

/* Using app.use to render our website */

app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

app.post('/', (req, res) => {
    let fName = req.body.fName
    let lName = req.body.lName
    let email = req.body.email
    // console.log(fName, lName, email);
    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    let jsonData = JSON.stringify(data)
    const url = 'https://us14.api.mailchimp.com/3.0/lists/02397f2949'
    const options = {
        method: 'POST',
        auth: "yAAzII:4f8ed5042bb5959a011783496d1c818d-us144"
    }
    const request = https.request(url, options, (response) => {
        response.on('data', (data) => {
            // console.log(JSON.parse(data));

            // response.statusCode === 200 ? res.send('Status code is 200') : res.send('Status code isn\'t 200')
            // console.log(response.statusCode);
            // console.log(response);
            if (response.statusCode == 200) {
                res.sendFile(__dirname + '/success.html')
            } else {
                res.sendFile(__dirname + '/failed.html')
            }
        })
    })
    request.write(jsonData)
    request.end()
})
app.post('/failure', (req, res) => {
    res.redirect('/')
})
/* Listen to the port 3434 */
app.listen(process.env.PORT || 3000, () => {
    console.log("App is Listen at the port 3000");
})


// API_KEY=4f8ed5042bb5959a011783496d1c818d-us14
// 02397f2949
// 02397f2949.