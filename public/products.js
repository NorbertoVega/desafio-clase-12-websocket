const socket = io.connect();

const title = document.getElementById('title');
const price = document.getElementById('price');
const thumbnail = document.getElementById('thumbnail');
const container = document.getElementById('container-table');

function clearForm() {
    title.value = '';
    price.value = '';
    thumbnail.value = '';
}

function addProduct(e) {
    if (title.value !== '' && price.value !== '' && thumbnail.value !== '') {
        const product = {
            title: title.value,
            price: price.value,
            thumbnail: thumbnail.value
        };
    
        socket.emit('add-new-product', product);
        clearForm();
        return false;
    }
}

function renderAllProducts() {
    fetch('http://localhost:3000/api/tableProd')
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
        });
}
renderAllProducts();

function renderNewProduct(data) {
    const html = `  <tr>
                        <th>${data.id}</th>
                        <td>${data.title}</td>
                        <td>${data.price}</td>
                        <td><img src="${data.thumbnail}" alt="imagen de producto" class="img-size"></td>
                    </tr>`;

    document.getElementById('tbody').innerHTML += html;
}

socket.on('render-new-product', function (data) {
    renderNewProduct(data);
});

