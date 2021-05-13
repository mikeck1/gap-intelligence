const express = require('express')
// use process.env variables to keep private variables,
// be sure to ignore the .env file in github
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

const npr = { 'name': 'NPR', 'link': 'https://feeds.npr.org/1001/rss.xml' };
const bbc = { 'name': 'BBC', 'link': 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml' };
const nyt = { 'name': 'NYT', 'link': 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml' };
const cnn = { 'name': 'CNN', 'link': 'http://rss.cnn.com/rss/cnn_topstories.rss' };
const usa = { 'name': 'USAT', 'link': 'http://rssfeeds.usatoday.com/usatoday-NewsTopStories' };
const newsOrgs = [npr, bbc, nyt, cnn, usa];

var parseString = require('xml2js').parseString;


const rp = require('request-promise');



const update = (res) => {
  newsOrgs.forEach(el => {
    let newsOrg = el['name'];
    let url = el['link']
    rp(url)
      .then(function (html) { //success!
        parseString(html, function (err, result) {
          const json = JSON.parse(JSON.stringify(result));
          const data = Array.from(json['rss']['channel'][0]['item'], (val, _) => val);

          data.forEach(element => {
            const date = new Date(element['pubDate'][0]).toGMTString() // Always have same GMT time
            let timestamp = new Date(element['pubDate'][0]).getTime(element['pubDate'][0]);
            let arr = [element['title'][0], date, newsOrg, timestamp, element['link'][0]];
            main.postNewsData(arr, db);
          });
          console.log(data);
        });
      })
      .catch(function (err) { //handle error
        console.log(err);
      });
  });

  res.status(200).json({ dbError: 'Updated!' })
}

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'gap-intelligence'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main')

// App
const app = express()
app.use(cors());
// App Middleware
const { createProxyMiddleware } = require('http-proxy-middleware');
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/update', (req, res) => update(res))
app.get('/news', (req, res) => main.getNewsData(req, res, db))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3001, () => {
  console.log(`app is running on port ${process.env.PORT || 3001}`)
})