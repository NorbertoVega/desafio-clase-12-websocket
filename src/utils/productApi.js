class ProductApi {

    constructor() {
        this.products = [  
            {
                "title": " Monitor Samsung C24RG5",
                "price": 25499,
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_896735-MLA45212708765_032021-F.webp",
                "id": 1
            },
            {
                "title": "Procesador gamer AMD Ryzen 5 5600X",
                "price": 46500,
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_806834-MLA44347094824_122020-F.webp",
                "id": 2
            },
            {
                "title": "Motherboard Mother Asus Prime A320m-k",
                "price": 7500,
                "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_2X_814476-MLA47101074241_082021-F.webp",
                "id": 3
            }
        ];
    }

    static cuentaGlobal = 3;

    getAll() {
        return this.products;
    }

    getById(id) {
        const idToFind = parseInt(id);
        const result = this.products.filter(prod => prod.id === idToFind);
        if (result.length === 0) {
            return null;
        } else {
            return result[0];
        }
    }

    save(product) {
        if (product.title === '' || product.price === '' || product.thumbnail === '')
            return {error: 'uno de los campos del producto a agregar está vacío'};
        if (isNaN(product.price))
            return {error: 'el valor del precio no es un número.'};
        product.price = parseInt(product.price);
        ProductApi.cuentaGlobal++;
        const productToSave = {...product, id: ProductApi.cuentaGlobal}
        this.products.push(productToSave);
        return productToSave;
    }

    deleteById(id) {
        const element = this.getById(id);
        if (element === null) {
            return -1;
        } else {
            const pos = this.products.map(prod => prod.id).indexOf(element.id);
            this.products.splice(pos, 1);
            return element.id;
        }
    }

    updateByID(id, productForUpdate) {
        const element = this.getById(id);
        if (element === null) {
            return null;
        } else {
            const pos = this.products.map(prod => prod.id).indexOf(element.id);
            this.products[pos] = {...productForUpdate, id: element.id};
            return this.products[pos];
        }
    }
}

module.exports = ProductApi;