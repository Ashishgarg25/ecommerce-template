const express = require("express");
const http = require('http');
// ENV Config
const dotenv = require('dotenv');
dotenv.config();

// Mongo DB Connection
const { ConnectToMongoDB } = require('./config/database');
ConnectToMongoDB();

// Import Routes
// const userRouter = require('./routes/user');
const userRoutes = require('./routes/Users');
const shopRoutes = require('./routes/Shop');
const productRoutes = require('./routes/Products');
const orderRoutes = require('./routes/Order');

const app = express();
app.use(express.json())

// const swaggerUi = require('swagger-ui-express');
// swaggerDocument = require('./swagger.json');

const appVersion = '/api/v1';

app.use(`${appVersion}/user`, userRoutes)
app.use(`${appVersion}/product`, productRoutes)
app.use(`${appVersion}/order`, orderRoutes)
app.use(`${appVersion}/shop`, shopRoutes)

// app.use(
//     '/api-docs',
//     swaggerUi.serve, 
//     swaggerUi.setup(swaggerDocument)
// );

app.get("/", (req, res) => {
    res.send(`<body style='background-color: #1E293B; padding: 16px'><h4 style='font-weight: 500; color: #FFFFFF'>Application in Development. Please find the API Docs at <a href =${process.env.URL || 'http://localhost'}:${process.env.PORT}/api-docs style='color: #FFFFFF'>Ecommerce API Docs</a></h4></body>`);
  });


// FOR PRODUCTION
// http.createServer(app).listen(port, (req, res) => {
//   console.log(`SERVER STARTED ON PORT ${port}`)
// })