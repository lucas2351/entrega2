// src/controllers/productsController.js
const multer = require('multer');
const Product = require('../src/models/Product');

// Configuración de Multer para manejar la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const createProduct = upload.single('image'), (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file.filename; // Nombre del archivo de imagen subido

  const newProduct = new Product({ name, price, description, image });
  newProduct.save((err, product) => {
    if (err) {
      console.error('Error saving product to database:', err);
      res.status(500).json({ message: 'Something went wrong' });
    } else {
      res.status(201).json(product);
    }
  });
};

const getAllProducts = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.error('Error fetching products from database:', err);
      res.status(500).json({ message: 'Something went wrong' });
    } else {
      res.json(products);
    }
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId, (err, product) => {
    if (err) {
      console.error('Error fetching product from database:', err);
      res.status(500).json({ message: 'Something went wrong' });
    } else if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
