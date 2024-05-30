import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/api/notification', async (req, res) => {
    const { mail } = req.body;

    try {
        const url = process.env.NOTIFICATION_URL;
        console.log(url);
        const response = await axios.post(url, {
            mail: mail
        });
        res.send(response.data);
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});