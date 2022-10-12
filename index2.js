let productos = [];

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
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("inputNombreProducto");
    inputGenero = document.getElementById("inputGenero");
    inputCarrerasCorridas = document.getElementById("inputCarrerasCorridas");
    inputCarrerasGanadas = document.getElementById("inputCarrerasGanadas");
    contenedorProductos = document.getElementById("contenedorProductos");
  }

  function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event);
  }

//Sweet Alert, sale en lugar del alert previo
  function mostrarSwal() {
    Swal.fire(
      'Error',
      'El numero de carreras ganadas no puede ser mayor al numero de carreras corridas',
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
 
    let nombre = inputNombre.value;
    let genero = inputGenero.value;
    let carrerasCorridas = parseFloat(inputCarrerasCorridas.value);
    let carrerasGanadas = parseInt(inputCarrerasGanadas.value);

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
    
    function obtenerProductosStorage() {
      let productosJSON = localStorage.getItem("productos");
      if (productosJSON) {
        productos = JSON.parse(productosJSON);
        pintarProductos();
      }
    }

    function consultarProductosJson() {
      fetch("./productos.Json")
      .then((Response) => Response.json())
      .then((data) => { 
        productos = [...data]
        pintarProductos();
      })
      .catch((error) => console.log(error));
    }
    
    function main() {
      inicializarElementos();
      inicializarEventos();
      consultarProductosJson();
      //obtenerProductosStorage();
    }
    
    main();
    console.log(productos);