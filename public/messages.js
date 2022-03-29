const email = document.getElementById('email');
const texto = document.getElementById('texto');

function renderMessages(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong style="color:blue;">${elem.email}</strong>
            <span style="color:brown;">[${elem.time}]</span>:
            <em style="color:green;">${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

socket.on('render-all-messages', function(data) { renderMessages(data); });

function addMessage(e) {
    if (email.value != '' && texto.value != '') {

        const mensaje = {
            email: email.value,
            text: texto.value
        };
        texto.value = '';
        socket.emit('add-new-message', mensaje);
    }   
}
