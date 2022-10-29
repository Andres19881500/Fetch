let productos = [];
let usuario;
let password;


//Variables para ingreso con usuario
let formularioUsuario;
let contenedorIdentificacion;
let contenedorUsuario;
let formularioProductos;
let inputUsuario;
let inputPassword;
let booleanUsuarioPassword
let botonCerrarSesion = document.getElementById("boton-cerrar-sesion")

//Variables para form de producto
let formulario;
let inputNombre;
let inputGenero;
let inputCarrerasCorridas;
let inputCarrerasGanadas;
let contenedorProductos;

class Producto {
    constructor(nombre, genero, carrerasCorridas, carrerasGanadas) {
      this.nombre = nombre.toUpperCase();
      this.genero = genero;
      this.carrerasCorridas = carrerasCorridas;
      this.carrerasGanadas = carrerasGanadas;
    }
  }
  
  function inicializarElementos() {
    //usuario
    formularioUsuario = document.getElementById("formularioUsuario");
    inputUsuario = document.getElementById("inputUsuario");
    inputPassword = document.getElementById("inputPassword");
    contenedorIdentificacion = document.getElementById("contenedorIdentificacion");
    contenedorUsuario = document.getElementById("contenedorUsuario");
    textoUsuario = document.getElementById("textoUsuario");
    formularioProductos = document.getElementById("formularioProductos");
        
    //productos
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("inputNombreProducto");
    inputGenero = document.getElementById("inputGenero");
    inputCarrerasCorridas = document.getElementById("inputCarrerasCorridas");
    inputCarrerasGanadas = document.getElementById("inputCarrerasGanadas");
    contenedorProductos = document.getElementById("contenedorProductos");
  }

  function inicializarEventos() {
    formularioUsuario.onsubmit = (event) => identificarUsuario(event);
    formulario.onsubmit = (event) => validarFormulario(event);
  }

  function identificarUsuario(event) {
    event.preventDefault();
    usuario = inputUsuario.value;
    password = inputPassword.value;
    formularioUsuario.reset();
    actualizarUsuarioStorage();
    actualizarPasswordStorage();
    validarUsuarioPassword();
    mostrarSwalPW();
    consultarProductosJson();
    mostrarSimuladorUsuario();
  }

  function cerrarSesion() {
    localStorage.clear();
    usuario = "";
    password= "";
    productos = [];
    mostrarLoginUsuario();
    pintarProductos();
  }

//Sweet Alert
  function mostrarSwal() {
    Swal.fire(
      'Error',
      'El numero de carreras ganadas no puede ser mayor al numero de carreras corridas',
      'error'
    )
  }

  function mostrarSwalPW() {
    if (booleanUsuarioPassword == false) {
      Swal.fire(
        'Error',
        'Usuario o contraseña incorrecto',
        'error'
      )
    }
  }

  function mostrarSwalProductoRepetido() {
    Swal.fire(
      'Error',
      'El producto ya existe',
      'error'
    )
  }

//Toastify, sale cuando se carga correctamente un producto
  function mostrarToastify() {
    Toastify({
      text: "Caballo cargado con éxito!",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#2A3742",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }

  function validarFormulario(event) {
    event.preventDefault();
    if (usuario == "jose" && password == "haras1") {
      let nombre = inputNombre.value;
      let genero = inputGenero.value;
      let carrerasCorridas = parseFloat(inputCarrerasCorridas.value);
      let carrerasGanadas = parseInt(inputCarrerasGanadas.value);

      const nombreExiste = productos.some((producto) => producto.nombre === nombre.toUpperCase());
      if (!nombreExiste) {
        let producto = new Producto(
          nombre,
          genero,
          carrerasCorridas,
          carrerasGanadas
        );
        
      const ratioGanadas = carrerasGanadas > carrerasCorridas ? true : false;
  
      ratioGanadas ? mostrarSwal() : add()
        function add() {
          productos.push(producto)
          formulario.reset()
          actualizarProductosStorage()
          pintarProductos()
          mostrarToastify()
        } 
      } else {
          mostrarSwalProductoRepetido();
        }
    } else {
      mostrarSwalPW();
    }
  }

    function eliminarProducto(nombre) {
      let columnaBorrar = document.getElementById(`columna-${nombre}`);
      let indiceBorrar = productos.findIndex(
        (producto) => producto.nombre === nombre
      );
    
      productos.splice(indiceBorrar, 1);
      columnaBorrar.remove();
      actualizarProductosStorage();
    }

    function pintarProductos() {
      contenedorProductos.innerHTML = "";
      productos.forEach((producto) => {
        let column = document.createElement("div");
        column.className = "caja__yeguas";
        column.id = `columna-${producto.nombre}`;
        column.innerHTML = `
                    <div class="caja__yeguas--figure">
                    <p>Nombre:
                        <b>${producto.nombre}</b>
                    </p>
                    <p>Genero:
                        <b>${producto.genero}</b>
                    </p>
                    <p>Carreras corridas:
                        <b>${producto.carrerasCorridas}</b>
                    </p>
                    <p>Carreras ganadas:
                        <b>${producto.carrerasGanadas}</b>
                    </p>
                    <button class="boton-borrar" id="botonEliminar-${producto.nombre}" >Eliminar</button>
                    </div>
                    `;
    
        contenedorProductos.append(column);
    
        let botonEliminar = document.getElementById(`botonEliminar-${producto.nombre}`);
        botonEliminar.onclick = () => eliminarProducto(producto.nombre);
      });
    }

    function actualizarProductosStorage() {
      let productosJSON = JSON.stringify(productos);
      localStorage.setItem("productos", productosJSON);
    }

    function actualizarUsuarioStorage() {
      localStorage.setItem("usuario", usuario);
    }

    function actualizarPasswordStorage() {
      localStorage.setItem("password", password);
    }

    function obtenerProductosStorage() {
      let productosJSON = localStorage.getItem("productos");
      if (productosJSON) {
        productos = JSON.parse(productosJSON);
        pintarProductos();
      }
    }

    function obtenerUsuarioStorage() {
      let usuarioAlmacenado = localStorage.getItem("usuario");
      if (usuarioAlmacenado) {
        usuario = usuarioAlmacenado;
      }
    }

    function obtenerPasswordStorage() {
      let passwordAlmacenado = localStorage.getItem("password");
      if (passwordAlmacenado) {
        password = passwordAlmacenado;
      }
    }

    function consultarProductosJson() {
      if(usuario == "jose" && password == "haras1") {
        fetch("./productos.Json")
        .then((Response) => Response.json())
        .then((data) => { 
          productos = [...data]
          pintarProductos();
        })
        .catch((error) => console.log(error));
      }
    }

    function validarUsuarioPassword() {
      if (usuario == "jose" && password == "haras1") {
        booleanUsuarioPassword = true;
      } else {
        booleanUsuarioPassword = false;
      }
    }

    function mostrarSimuladorUsuario() {
      if (usuario == "jose" && password == "haras1") {
        contenedorIdentificacion.hidden = true;
        contenedorUsuario.hidden = false;
        formularioProductos.hidden = false;
        textoUsuario.innerHTML = `Bienvenido ${usuario}`;
      } 
    }

    function mostrarLoginUsuario() {
        contenedorIdentificacion.hidden = false;
        contenedorUsuario.hidden = true;
        formularioProductos.hidden = true; 
    }
    
    function main() {
      inicializarElementos();
      inicializarEventos();
      obtenerUsuarioStorage();
      obtenerPasswordStorage();
      mostrarSimuladorUsuario();
      consultarProductosJson();
    }

    botonCerrarSesion.addEventListener("click", () => {
      cerrarSesion();
    })

    main();
    console.log(productos);
    console.log(usuario);
    console.log(password);