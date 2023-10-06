import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import listingRouter from './routes/listing.router.js'

dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());




app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({success: false, statusCode , message});
});