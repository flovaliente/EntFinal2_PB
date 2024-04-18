import { Router } from 'express';
//import ProductManagerFS from '../clases/ProductManagerFS.js';
import ProductManagerDB from '../dao/ProductManagerDB.js';

const productManager = new ProductManagerDB();

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', {products, title: "Products", style: "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error.');
  }
  
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products, title: "RealTime-Products", style: "https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error.');
  }
  
});


export default router;