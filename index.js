// Reference: https://www.npmjs.com/package/wikijs

const express = require('express');
const app = express();
const wiki = require('wikijs').default;


// Gets summary content of the requested keyword from Wikipedia
async function get_summary(keyword) {
    try {
        const page = await wiki()
            .page(keyword);
        const summary = await page.summary();
        return summary;
    } catch (err) {
        return 'Error'
    }
}

// Gets the Wikipedia URL of the requested keyword
async function get_link(keyword) {
    try {
        const page = await wiki()
            .page(keyword);
        const link = page.url();
        return link;
    } catch (err) {
        return 'Error'
    }
}

app.get('/', (req, res) => {
    res.status(200).send("Wikipedia Scraper")
})

app.get('/info/:keyword', (req, res) => {
    get_summary(req.params.keyword).then(summary => {
        get_link(req.params.keyword).then(link => {
            if (link === 'Error' || summary === 'Error') {
                res.status(404).json({
                    'Error': 'The keyword was not found on Wikipedia'
                })
            } else {
                res.status(200).json({
                    summary: summary,
                    link: link
                })
            }
        })
    })
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});