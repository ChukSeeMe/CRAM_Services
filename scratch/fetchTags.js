const https = require('https');

function fetchUnsplash(query) {
    return new Promise((resolve) => {
        https.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=1M2Q0E2Q3HZYJ1p8q16S0j-Yg8p88m2pQ2A48K-hZfQ&per_page=4`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const urls = parsed.results.map(r => r.urls.regular);
                    resolve({ query, urls });
                } catch(e) { resolve({ query, urls: []}); }
            });
        });
    });
}

Promise.all([
    fetchUnsplash('roles%20royce'),
    fetchUnsplash('porsche%20911'),
    fetchUnsplash('ferrari'),
    fetchUnsplash('delivery%20vans')
]).then(res => console.log(JSON.stringify(res, null, 2)));
