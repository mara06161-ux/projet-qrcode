const express = require('express');
const qrcode = require('qrcode');

const app = express();

app.use(express.urlencoded({ extended: true }));

const monMiddleware = (req, res, next) => {
    console.log("Requête :", req.method, req.url);
    next();
};

app.use(monMiddleware);

app.get('/', (req, res) => {
    res.send(`
        <form action="/generer" method="POST">
            <input type="text" name="url" placeholder="URL du site" required>
            <button type="submit">Generer</button>
        </form>
    `);
});

app.post('/generer', async (req, res) => {
    const siteUrl = req.body.url;
    let qrimage = await qrcode.toDataURL(siteUrl);
    res.send(`<img src="${qrimage}">`);
});

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});