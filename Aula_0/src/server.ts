import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! in Typescript');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});