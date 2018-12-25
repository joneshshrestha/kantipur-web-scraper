let pug = require ('pug')
let request = require('request')
let cheerio = require('cheerio')
let express = require('express')
let app = express()

let link;

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage'
      });
  })
   
app.listen(3000)

app.set('view engine', 'pug')

request('https://www.kantipurdaily.com/news', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        let $ = cheerio.load(html)

        $('.teaser.offset').each((i, el) => {
            let title = $(el)
                .find('h2')
                .text()
            let link = $(el)
                .find('a')
                .attr('href')
            let heading = $(el)
                .find('p')
                .text()
            //console.log(title)
            //console.log(link) 
            console.log(heading)
            console.log('\n')
        })
    }
})
console.log(link)
