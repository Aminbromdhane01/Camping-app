const express = require('express')
const bodyParser = require ( 'body-parser')
const cors = require('cors')
const articleApi = require ('./router/article')
const authorApi = require('./router/author')
const commandeApi = require('./router/commande')
require('./config/connect')
const cassandra = require('cassandra-driver');

require('dotenv').config();



const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())








app.use('/article' , articleApi) ; 
app.use('/author' , authorApi) ;
app.use('/commande' , commandeApi);

app.use('/getimage' , express.static('./uploads'));






const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'], // replace with your CassandraDB cluster contact points
    localDataCenter: 'datacenter1', // replace with your CassandraDB data center name
    keyspace: 'keyspace1' // replace with your keyspace name
 });
 client.connect(function (err) {
    if (err) throw err;
    console.log('Connected to CassandraDB!');
 });
 app.get('/api/mydata', function(req, res) {
    client.execute('SELECT * FROM post', function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result.rows));
    });
  });







app.listen(process.env.PORT, () =>
{
    console.log(`App workin on Port ${process.env.PORT}`);
})