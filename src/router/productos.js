const { Router } = require('express');
const ProductApi = require('../utils/productApi');

const router = Router();
const productApi = new ProductApi();

router.get('/tableProd', (req, res) => {
    const allProducts = productApi.getAll();
    res.render('table',  { productList: allProducts, emptyList: allProducts.length === 0 });
});

router.get('/productos', (req, res) => {
    const allProducts = productApi.getAll();
    res.render(allProducts);
});

router.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const productById = productApi.getById(id);
    if (productById === null) {
        const error = 'Producto no encontrado.';
        res.send({ error });
        return;
    }
    res.send(productById);
});

router.post('/productos', (req, res) => {
    const product = req.body;
    const resultado = productApi.save(product);
    if (resultado.error) {
        res.render('error', resultado);
        return;
    }
    res.redirect('/');
});

router.put('/productos/:id', (req, res) => {
    const product = req.body;
    const id = req.params.id;
    const productoActualizado = productApi.updateByID(id, product);
    if (productoActualizado !== null) {
        res.send({ productoActualizado })
        return;
    }
    const error = 'Producto no encontrado. No se pudo actualizar.';
    res.send({ error });
});

router.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const resultado = productApi.deleteById(id);
    if (resultado === -1) {
        const error = 'Producto no encontrado. No se pudo eliminar.';
        res.send({ error });
        return;
    }
    res.send({idProductoEliminido: resultado})
});

module.exports = router;