console.log('conectado');

// La página HTML (`index.html`) tiene una lista (`ul`) con el id `listaUsuarios` donde se mostrarán los detalles de los usuarios
const listaUsuarios = document.getElementById('listaUsuarios');
const usuarios = [];

// El archivo JavaScript (`script.js`) realiza lo siguiente:
// - Obtiene datos simulados de usuarios desde la API JSONPlaceholder `https://jsonplaceholder.typicode.com/users`.
function obtenerDatosAPI () {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue existosa');
      }
      console.log('response:', response);
      return response.json();
    })
    .then((data) => {
      console.log('data:', data);
      data.forEach((usuario) => {
        const {id, name, username, phone, email, company, address} = usuario;
        crearUsuario({
            id, name, username, phone, email, company, address
        });
      })
      mostrarDetallesDOM ()
    })
    .catch((error) => {
        console.error('Error: ', error.message)
    }); 
};
obtenerDatosAPI ();

function crearUsuario ({id, name, username, phone, email, company, address}) {
    const usuario = {
        id,
        name,
        age: agregarEdad (),
        username,
        // También se añaden imagenes que se han generado con IA desde https://thispersondoesnotexist.com/
        // Cada usuario tendrá una imagen asociada por `ID` (están en la carpeta assets/img) son extensión `.jpeg`
        img: `./assets/img/${id}.jpeg`, 
        phone, 
        email, 
        company: company.name, 
        address: `${address.street}, ${address.suite}, ${address.city}`
    };
    usuarios.push(usuario);
    console.log('usuarios(dentro crearUsuarios):', usuarios);
}
console.log('usuarios(fuera crearUsuario):', usuarios);
//console.log('function crearUsuario: ', crearUsuario ());

//se agrega una edad aleatoria a cada usuario
function agregarEdad () {
    let max = 50;
    let min = 20;
    return  Math.floor(Math.random() * (max - min + 1) + min);;
};
console.log('function agregarEdad: ', agregarEdad ());

// se muestran detalles específicos en una lista en el DOM
// Muestra detalles específicos de cada usuario en la lista en el DOM: 
// name, age, username, img, phone, email, company, address
// address tendrá estos datos como valor: usuario.address.street, usuario.address.suite, usuario.address.city
function mostrarDetallesDOM () {
    console.log('usuarios(dentro mostrarDetallesDOM):', usuarios);
    usuarios.forEach((usuario) => {
        listaUsuarios.innerHTML += 
            `<li>
            <p>Nombre: ${usuario.name}</p>
            <p>Edad: ${usuario.age}</p>
            <p>Username: ${usuario.username}</p>
            <p>Teléfono: ${usuario.phone}</p>
            <p>Email: ${usuario.email}</p>
            <img src="${usuario.img}" alt="Imagen de ${usuario.name}">
            <p>Compañía: ${usuario.company}</p>
            <p>Dirección: ${usuario.address}</p>
            </li>`;
    });
};
console.log('function mostrarDetallesDOM: ', mostrarDetallesDOM ());