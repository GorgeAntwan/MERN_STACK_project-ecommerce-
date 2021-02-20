import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import products from'./data/products.js';
import connectDB from './config/db.js';
import Colors from 'colors';
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes  from "./routes/orderRoutes.js"
import uploadRoutes  from "./routes/uploadRoutes.js"
import { errorHandler,notfoundHandler } from './middelware/errorMiddelware.js';
import morgan from 'morgan';
const app = express();
dotenv.config();  
connectDB(); 

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  }); 
  if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
  }
  app.use(express.json());
app.get('/',(req,res)=>{
   res.send("API Is Running");
});
app.use('/api/products',productRoutes);
app.use('/api/users/',userRoutes);
app.use('/api/orders/',orderRoutes);
app.use('/api/upload/',uploadRoutes);
app.get('/api/config/paypal',(req,res)=>{ 
  res.send(process.env.PAYPAL_CLIENT_ID)
})
const __dirname = path.resolve();
app.use('/upload',express.static(path.join(__dirname,'/upload')))
app.use(notfoundHandler);// to handle not found response with response 404
app.use(errorHandler);// to handle server error with response 500


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server is running in ${process.env.NODE_ENV} Mode On  port ${PORT}`.yellow.underline)); 