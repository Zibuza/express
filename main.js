const express = require('express');
const userRouter = require('./users/user.route');
const connectToDb = require('./db/connectToDB');
const authRouter = require('./auth/auth.route');
const isAuth = require('./middlewares/isAuth.middleware');
const postRouter = require("./posts/posts.router");

const app = express();

// Connect to MongoDB
connectToDb();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/users', isAuth, userRouter);
app.use('/posts', isAuth, postRouter);
app.use('/auth', authRouter);

// Test route
app.get('/', (req, res) => {
    res.send('hello world');
});

// Start the server
app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
