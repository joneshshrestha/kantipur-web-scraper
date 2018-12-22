let request = require('request')
let cheerio = require('cheerio')

request('https://www.kantipurdaily.com/news', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        let $ = cheerio.load(html)

        let siteHeading = $('.teaser.offset')
        //console.log(siteHeading.text())

        //let output = siteHeading.find('h2').text()
        //let output = siteHeading.children('h2').text()
        let output = siteHeading
            .children('h2')
            .parent()
            .text()
        console.log(output)
    }
})