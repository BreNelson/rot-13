const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dao = require('./mysqlDao.js');
//const dao = require('./sqliteDao.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/encrypt', (request, response)  => {
    var plaintext = request.query.plaintext;
    var ciphertext = "";

    ciphertext = rotate(plaintext);

    response.status(200).send(ciphertext);
})


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');   
});




const KEY = 13;
			
function rotate(str) { 
    		return str.split('').map(x => rotate.lookup[x] || x).join('')
  				}
  			rotate.input  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  			rotate.output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'.split('')
  			rotate.lookup = rotate.input.reduce((m,k,i) => Object.assign(m, {[k]: rotate.output[i]}), {})
				


app.listen(3000, () => console.log('Server started on port 3000'));