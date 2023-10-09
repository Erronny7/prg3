const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);


app.use(express.static("."));

app.get('/', (req, res)=>{
    res.redirect('index.html')
})


server.listen(7000, ()=>{
    console.log('Server is working on port 7000');
    
})