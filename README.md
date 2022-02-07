# Wikipedia Scraping Microservice

This microservice scrapes Wikipedia summary content and URL based on the query parameter (keyword).

## To get started run the following command:
node index.js

## Request Endpoint
GET/info/:keyword

### Example
* GET/info/apples
* Local: localhost:8080/info/ketchup

## Response

### If the request is successful:
* Status: 200 OK
* Response format: JSON
```
{
    "summary": "Ketchup or catsup is a type of table condiment with a sweet and tangy flavor...",
    "link": "https://en.wikipedia.org/wiki/Ketchup"
}
```

### If the request is unsuccessful:
* Status: 404 Not Found
* Response format: JSON
```
{
    "Error": "The keyword was not found on Wikipedia"
}
```

## Source:
https://www.npmjs.com/package/wikijs
