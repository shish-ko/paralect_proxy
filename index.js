import express from 'express';
import proxy from 'express-http-proxy'; 
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const port = 3000;
const corsOptions = {
  origin: 'http://localhost:5173/',
};

const app=express();

app.use(cors(corsOptions));
app.get('/media/:id', (req, res)=> res(proxy(`https://image.tmdb.org/t/p/original/${req.params.id}`)));
app.use(proxy('https://api.themoviedb.org', {
  
  proxyReqOptDecorator: (proxyReqOpts) => {
    proxyReqOpts.headers['Authorization'] = process.env.API_KEY
    return proxyReqOpts;
  }
  
}))
// app.get('/search', (req, res)=> res(proxy(`https://image.tmdb.org/t/p/original/${req.params.id}`)))

app.listen(port);
