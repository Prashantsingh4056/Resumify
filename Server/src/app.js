import express from 'express'
import authRouter from './routes/auth.routes.js';
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import interviewRouter from './routes/interview.routes.js';


const app = express();

app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

export default app;

