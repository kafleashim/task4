const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");
app.use(express.json());

app.use(cors({
    origin: "*"
}))

// In-memory array to store products
let products = [];

// Create (POST) a new product
app.post('/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1;
    products.push(product);
    res.status(201).json({ message: 'Product created successfully', product });
});



// Read (GET) all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Read (GET) a single product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Update (PUT) a product by ID
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        res.json({ message: 'Product updated successfully', product: products[index] });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete (DELETE) a product by ID
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        res.json({ message: 'Product deleted successfully', product: deletedProduct[0] });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
