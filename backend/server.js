import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req,res) => res.send('OK'));

app.post('/echo', (req,res) => res.json(req.body));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});