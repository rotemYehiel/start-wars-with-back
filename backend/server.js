const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const personsRoutes = require('./api/person/person.routes')


app.use(express.json());

// const books = require('./data/book.json');

app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/person', personsRoutes)


const port = process.env.PORT || 5000;
console.log(process.env.PORT)
app.listen(port, () => console.log(`listening on port ${port}...`));
