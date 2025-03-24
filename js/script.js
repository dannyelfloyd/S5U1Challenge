const listaUsuarios = document.getElementById('listaUsuarios');
const usuarios = [];
const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
const MIN = 18;
const MAX = 65;
const edadAleatoria = (() => Math.floor(Math.random() * (MAX - MIN + 1) + MIN));

function obtenerDatosAPI () {
    return fetch(ENDPOINT)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
};

obtenerDatosAPI ()
.then(data => {
    const resultado = data.map((usuario) => {
        const {id} = usuario;
        const {street, suite, city} = usuario.address;
        const newUsuario = {
            ...usuario,
            age: edadAleatoria(),
            img: `../assets/img/${id}.jpeg`,
            address: `${street}, ${suite}, ${city}`
        }
        const {name, age, username, phone, email, img, company, address} = newUsuario;
        return mostrarDetallesDOM (name, age, username, phone, email, img, company, address);
    })  
    listaUsuarios.innerHTML = resultado.join('')
})
.catch((error) => {console.error('Error: ', error.message)});;

function mostrarDetallesDOM (name, age, username, phone, email, img, company, address) {
    return `
        <li>
            <div class="info">
                <p>Nombre: ${name}</p>
                <p>Edad: ${age}</p>
                <p>Username: ${username}</p>
                <p>Teléfono: ${phone}</p>
                <p>Email: ${email}</p>
            </div>
            <img src="${img}" alt="Imagen de ${name}">
            <div class="plus">
                <p>Compañía: ${company}</p>
                <p>Dirección: ${address}</p>
            </div>
        </li>
    `;
};