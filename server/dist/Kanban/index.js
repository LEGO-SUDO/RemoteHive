import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
const port = 5002 || process.env.PORT;
app.listen(port, () => {
    // connect()
    console.log(`Kanban service is listening on PORT: ${port}!`);
});
//# sourceMappingURL=index.js.map