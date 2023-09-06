import 'dotenv/config'
import express from "express";
import fetch from 'node-fetch';
import bodyParser from "body-parser";
import pug from "pug";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','pug');

app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/users', async (req, res) => {
    const { username } = req.body;
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    const profile  = pug.compileFile('views/components/profile.pug');

    console.log(profile(data));
    res.send(profile(data));
});

app.listen(PORT);

console.log(`root app listening http://localhost:${PORT}`);
