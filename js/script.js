const listaUsuarios = document.getElementById('listaUsuarios');
const usuarios = [];

function obtenerDatosAPI () {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue existosa');
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((usuario) => {
        const {id, name, username, phone, email, company, address} = usuario;
        crearUsuario({
            id, name, username, phone, email, company, address
        });
      })
      mostrarDetallesDOM ();
    })
    .catch((error) => {
        console.error('Error: ', error.message)
    }); 
};
obtenerDatosAPI ();

function crearUsuario ({id, name, username, phone, email, company, address}) {
    const usuarioBasico = {
        id,
        name,
        username, 
        phone, 
        email, 
        company: company.name,
    };
    const usuario = {
        ...usuarioBasico,
        age: agregarEdad (),
        img: `./assets/img/${id}.jpeg`,
        address: `${address.street}, ${address.suite}, ${address.city}`
    }
    usuarios.push(usuario);
    console.log('copiaUsuarios:',usuarios);
};

function agregarEdad () {
    let max = 50;
    let min = 20;
    return  Math.floor(Math.random() * (max - min + 1) + min);;
};

function mostrarDetallesDOM () {
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