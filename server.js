const { nanoid } = require('nanoid');
const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/react-shopping-cart-db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const schema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String],
});
const Product = mongoose.model('products', schema);

app.get('/api/products', async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.send(saveProduct);
});

app.delete('/api/products/:id', async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deleteProduct);
});

app.listen(port, () => console.log(`port is running at ${port}`));
