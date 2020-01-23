const pug = require ('pug')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
app.set('view engine', 'pug')

const getNews = (callback) => {
    request('https://www.kantipurdaily.com/news', (error, response, html) => {
        if(!error && response.statusCode == 200) {
            const news = []
            const $ = cheerio.load(html)

            $('.teaser.offset').each((i, el) => {
                const title = $(el)
                    .find('h2')
                    .text()
                const link = $(el)
                    .find('a')
                    .attr('href')
                const heading = $(el)
                    .find('p')
                    .text()
                news.push({ title, link, heading })
            })
            callback(news)
        }
    })
}

// const getNews = (callback) => {
//     request('https://www.kantipurdaily.com/news', (error, response, html) => {
//         if(!error && response.statusCode == 200) {
//             const news = []
//             const $ = cheerio.load(html)

//             $('.teaser.offset').each((i, el) => {
//                 const title = $(el)
//                     .find('h2')
//                     .text()
//                 const link = $(el)
//                     .find('a')
//                     .attr('href')
//                 const heading = $(el)
//                     .find('p')
//                     .text()
//                 news.push({ title, link, heading })
//             })
//             callback(news)
//         }
//     })
// }

app.get('/', (req, res) => {
    getNews(news => {
        res.render('index', {
            news 
        })
    })
})

app.listen(process.env.PORT || 3000 , () => {
    console.log('Listening at port')
})
