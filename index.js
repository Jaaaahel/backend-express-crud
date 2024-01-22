import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/routes.js";
import { verifyToken } from './middlewares/verifyToken.js';

const app = express();
const port = process.env.PORT || '5000';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(verifyToken);
app.use(router);

app.use((req, res, next) => res.status(404).send('404 Not Found'));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: err.message });
    }
    next();
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));