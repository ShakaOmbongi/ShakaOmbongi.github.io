const path = require('path');
// Import the model using the correct file name and relative path.
// Since your file is named "Products.js" (with capital P and s), we use:
const Product = require(path.join(__dirname, '..', 'models', 'Products'));

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    // Instead of "shop.html", use "productList.html" because that's the file that exists.
    res.sendFile(path.join(__dirname, '..', 'views', 'productList.html'));
  } catch (err) {
    console.error("Error retrieving products:", err);
    res.status(500).send("Error retrieving products.");
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    // Use "productDetails.html" (based on your views folder)
    res.sendFile(path.join(__dirname, '..', 'views', 'productDetails.html'));
  } catch (err) {
    console.error("Error retrieving product:", err);
    res.status(500).send("Error retrieving product.");
  }
};

exports.getAdminProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    // Use "admin-products.html" as that is the file you have
    res.sendFile(path.join(__dirname, '..', 'views', 'admin-products.html'));
  } catch (err) {
    console.error("Error retrieving admin products:", err);
    res.status(500).send("Error retrieving admin products.");
  }
};

exports.addProduct = async (req, res) => {
  try {
    await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      category: req.body.category // include only if your model supports it
    });
    res.redirect('/admin/products');
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).send("Error adding product.");
  }
};
