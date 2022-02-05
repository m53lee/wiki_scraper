const express = require('express');
const app = express();
const wiki = require('wikijs').default;


// Gets summary content of the requested keyword from Wikipedia
async function get_summary(keyword) {
    const page = await wiki()
        .page(keyword);
    const summary = await page.summary();
    return summary;
}

async function get_link(keyword) {
    const page = await wiki()
        .page(keyword);
    const link = page.url();
    return link
}

app.get('/', (req, res) => {
    res.status(200).send("Wikipedia Scraper")
})

app.get('/summary/:keyword', (req, res) => {
    get_summary(req.params.keyword).then(summary => {
        res.send(summary)
    })
})

app.get('/link/:keyword', (req, res) => {
    get_link(req.params.keyword).then(link => {
        res.send(link)
    })
})

// Error handler
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        error: 'Not found'
    })
})

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});