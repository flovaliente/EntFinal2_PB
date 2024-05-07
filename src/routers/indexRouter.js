import { Router } from 'express';
//import ProductManagerFS from '../clases/ProductManagerFS.js';
import ProductManagerDB from '../dao/ProductManagerDB.js';
import productModel from '../dao/models/productModel.js';
import CartManagerDB from '../dao/CartManagerDB.js';

const productManager = new ProductManagerDB();
const cartManager = new CartManagerDB();

const router = Router();

router.get('/', async (req, res) => {
  try {
    let products = await productModel.find();
    products = products.map((p) => p.toJSON());
    res.render("home", { title: "MongoDB Deploy ", products });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error.');
  }
  
});

router.get('/products', async (req, res) => {
  try {
    let { limit = 5, page = 1 } = req.query;
    //let products = await productManager.getProducts(limit, page);
    let products = await productModel.find();
    products = products.map((p) => p.toJSON());
    res.render("products", { title: "Products w paginate", products });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error.');
  }
  
});

router.get('/cart/:cid', async (req, res) =>{
  try {
    let { cid } = req.query;
    let cart = await cartManager.getCartById(cid, true);
    res.render("cart", { title: "Cart view", cart });
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