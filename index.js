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
        return 'There has been an error'
    }
}

async function get_link(keyword) {
    try {
        const page = await wiki()
            .page(keyword);
        const link = page.url();
        return link;
    } catch (err) {
        return 'There has been an error'
    }
}

app.get('/', (req, res) => {
    res.status(200).send("Wikipedia Scraper")
})

app.get('/:keyword', (req, res) => {
    get_summary(req.params.keyword).then(summary => {
        get_link(req.params.keyword).then(link => {
            res.json({
                summary: summary,
                link: link
            })
        })
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