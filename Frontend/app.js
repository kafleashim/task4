const API_URL = 'http://localhost:3000/products';

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('productId').value;
        if (id) {
            updateProduct(id);
        } else {
            createProduct();
        }
    });
});

function loadProducts() {
    fetch(API_URL)
        .then(response => response.json())
        .then(products => {
            const productsTable = document.getElementById('productsTable');
            productsTable.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td class="actions">
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                productsTable.appendChild(row);
            });
        });
}

function createProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('productForm').reset();
            loadProducts();
        });
}

function editProduct(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById('productId').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('price').value = product.price;
        });
}

function updateProduct(id) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('productForm').reset();
            loadProducts();
        });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                loadProducts();
            });
    }
}
