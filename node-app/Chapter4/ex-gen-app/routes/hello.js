const express = require('express');
const router = express.Router();
const http = require('https');
const parseString = require('xml2js').parseString;

router.get('/', (req, res, next) => {
    const opt = {
        host: 'news.google.com',
        port: 443,
        path: '/rss/search?hl=ja&gl=JP&ceid=JP:ja&q=""'
    };
    http.get(opt, (res2) => {
        let body = '';
        res2.on('data', (data) => {
            body += data;
        });
        res2.on('end', () => {
            parseString(body.trim(), (error, result) => {
                const data = {
                    title: 'Google News',
                    content: result.rss.channel[0].item
                };
                res.render('hello', data);
            });
        });
    });
});

module.exports = router;
