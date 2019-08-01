const express = require('express')
const fetch = require('node-fetch')
const app = express();
const apiKey = '_WobXiZPIZDcbd8yfEnheZM2Zic-WiIE-ITtLM-jqEE-wn-Nu2wFu1wZrs2z-h6CZfURGVkw903yjxBS24ZqNcZZ6332WY6v2DSLLlpGYXA5lmmag-XWs8gLtM5AXXYx';
const bodyparser = require('body-parser')
const path = require('path');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.post('/api', (req, res)=>{
    let url = "https://api.yelp.com/v3/businesses/search?"+"term="+req.body.term+"&"+"location="+req.body.zipcode;
    let bearer = 'Bearer ' + apiKey;
    // console.log('-----------------------------')
    // console.log(req.body)
    console.log(url)
    fetch(url, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
            }
    }).then(response =>response.json())
    .then(data=>{ 
        res.json(data.businesses); 
        console.log(data.businesses[0])
    }).catch(err=>{
        console.log("we get error", err)
    });
})
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, './dist/index.html'))
})
const port = 3000;

app.listen(port, ()=>console.log(`starting server on port ${port}`))
