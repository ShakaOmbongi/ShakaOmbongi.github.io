const Product = require('../models/products');

exports.uploadProducts = (req, res) => {
  // Process the uploaded file (JSON/CSV) and bulk create products
  console.log("Uploading products bulk file");
  // For now, just redirect back to the admin page
  res.redirect('/admin/products');
  
};

exports.editProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
      },
      { where: { id: productId } }
    );
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
};
