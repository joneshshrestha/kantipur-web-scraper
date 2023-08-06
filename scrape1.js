const pug = require('pug')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
app.set('view engine', 'pug')

const getNews = (callback) => {
  request('https://ekantipur.com/news', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const news = []
      const $ = cheerio.load(html)

      $('.teaser.offset').each((i, el) => {
        const title = $(el).find('h2').text()
        const link = $(el).find('a').attr('href')
        const heading = $(el).find('p').text()
        news.push({ title, link, heading })
      })
      callback(news)
    }
  })
}

const getKPNews = (callback) => {
  request('https://kathmandupost.com/national', (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const KPnews = []
      const $ = cheerio.load(html)

      $('.article-image').each((i, el) => {
        const title = $(el).find('h3').text()
        const link = $(el).find('a').attr('href')
        const heading = $(el).find('p').text()
        if (!title) {
          console.log(this.title)
        } else {
          KPnews.push({ title, link, heading })
        }
      })
      callback(KPnews)
    }
  })
}

app.get('/', (req, res) => {
  getNews((news) => {
    res.render('index', {})
  })
})

app.get('/kantipur', (req, res) => {
  getNews((news) => {
    res.render('kantipur', {
      news,
    })
  })
})

app.get('/kathmandupost', (req, res) => {
  getKPNews((KPnews) => {
    res.render('kathmandupost', {
      KPnews,
    })
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening at port')
})
