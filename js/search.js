//Carga principal de la pagina con el evento DOMContentLoad
addEventListener('DOMContentLoaded', async () => {
  showSpinner()
  let promise = await fetch('productos.json')
  let result = await promise.json()
  data = result
  if (localStorage.getItem('tableInventario')) {
    btnClean.classList.remove('btn-secondary', 'disabled')
    btnClean.classList.add('btn-success')
    table.innerHTML = localStorage.getItem('tableInventario')
  }
  if (JSON.parse(localStorage.getItem("saved")) == undefined) {
    productAdd = arraysAdded
  } else {
    arraysAdded = JSON.parse(localStorage.getItem("saved"))
  }
  if (localStorage.getItem("saveProducts")) {
    listGroup.innerHTML = localStorage.getItem("saveProducts")
  } else {
    showSaveProducts(data.productos)
  }
  hideSpinner()
})

//Evento change para guardar los cambios
//al localstorage
addEventListener("change", () => {
  calcular()
  calculoBalance()
  guardarLocal()
  console.clear()
})

//Mostrar producto encontrado
function show() {
  let toAppened = ""
  toAppened = `
            <th scope="row" class="small">${codeShow}</th>
            <td class="col-span-2 nombre">${exampleModalLabel.innerHTML.split(":")[1]}</td>
            <td class="col-span-2"><p class="cant">${cantidad}</p>
            <td class="col-span-2"><p class="precio">${precio}</p>
            <td class="col-span-2"> $<span class="total"></span>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-trash borrar" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></td> `
  document.getElementById('productos').innerHTML += toAppened
  codeShow = ""
  quantity.value = ""
  duplicate()

}

//Mostrar producto agregado a la tabla
function showAdd() {
  let toAppened = ""
  toAppened = `
            <th scope="row" class="small">${codeShow}</th>
            <td class="col-span-2 nombre">${nombreAdd.value}</td>
            <td class="col-span-2"><p class="cant">${cantidad2}</p>
            <td class="col-span-2"><p class="precio">${precio2}</p>
            <td class="col-span-2"> $<span class="total"></span>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-trash borrar" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></td> `
  document.getElementById('productos').innerHTML += toAppened
  codeShow = ""
  nombreAdd.value = ""
  quantityNew.value = ""
  priceNew.value = ""
  duplicate()
}

//Funcion que despliega div oculto
//Opcion de agregar nuevos productos
function showList2() {
  listGroup.innerHTML += `
  <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1 nombre">${nombreAdd.value}</h5>
      <small>Codigo: <span class="codigo">${codeShow}</span></small>
    </div>
    <p class="mb-1">Precio: <span class="precio">${precio2}</span></p>
  </a>
  </div>`
  let productAdd = { "nombre": nombreAdd.value, "codigo": codeShow, "Precio": precio2 }
  arraysAdded.push(productAdd)
  localStorage.setItem("saved", JSON.stringify(arraysAdded))
}

//Funcion que despliega div oculto
//Para poder cargar todos los productos por primera vez
function showSaveProducts() {
  let toAppened = []
  for (let i = 0; i < data.productos.length; i++) {
    let nombre = data.productos[i].nombre
    let codigo = data.productos[i].codigo
    let codigo1 = data.productos[i].codigo1
    let codigo2 = data.productos[i].codigo2
    let codigo3 = data.productos[i].codigo3
    let codigo4 = data.productos[i].codigo4
    let precio = data.productos[i].Precio
    let productAdd = {
      "nombre": nombre, "codigo": codigo,
      "Precio": precio, "codigo1": codigo1, "codigo2": codigo2,
      "codigo3": codigo3, "codigo4": codigo4
    }
    arraysAdded.push(productAdd)
    toAppened += `
      <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1 nombre">${nombre}</h5>
          <small>Codigo: <span class="codigo">${codigo}</span></small>
          <small>Codigo1: <span class="codigo1">${codigo1}</span></small>
          <small>Codigo2: <span class="codigo2">${codigo2}</span></small>
          <small>Codigo3: <span class="codigo3">${codigo3}</span></small>
          <small>Codigo4: <span class="codigo4">${codigo4}</span></small>
        </div>
        <p class="mb-1">Precio: <span class="precio">${precio}</span></p>
      </a>
      </div>`
    localStorage.setItem("saved", JSON.stringify(arraysAdded))
  }
  document.getElementById('listGroup').innerHTML = toAppened
}

//Variables
const search = document.querySelector('input#search')
const button = document.getElementById('btnSearch')
let cantidad = document.querySelector("p.cant")
let precio = document.querySelector("p.precio")
let arraysAdded = []
let productAdd = {}

//Evento de cuadro de busqueda
search.addEventListener("keypress", function (e) {
  if (e.code == 'Enter' || e.code == 13 || e.which == 13) {
    filter()
    button.click();
    button.onclick = filter();
  }
});

//Evento boton buscar
search.addEventListener("input", () => {
  if (search.value != "") {
    button.classList.remove("btn-secondary", "disabled")
    button.classList.add("btn-info")
    searchLive()
  } else {
    button.classList.remove("btn-info")
    button.classList.add("btn-secondary", "disabled")
    searchResult.innerHTML = ""
  }
})
button.addEventListener("click", () => {
  filter()
})

//Funcion Principal de busqueda
function filter() {
  codeShow = ""
  let productos = JSON.parse(localStorage.getItem("saved"))
  for (let i = 0; i < productos.length; i++) {
    let nombre = productos[i].nombre
    let codigo = productos[i].codigo
    let codigo1 = productos[i].codigo1
    let codigo2 = productos[i].codigo2
    let codigo3 = productos[i].codigo3
    let codigo4 = productos[i].codigo4
    let x = productos[i].Precio
    if (search.value == codigo || search.value == codigo1 || search.value == codigo2 ||
      search.value == codigo3 || search.value == codigo4) {
      exampleModal.classList.remove("d-none")
      exampleModal.classList.add("d-block")
      exampleModalLabel.innerHTML = `Producto: ${nombre}`
      quantity.focus()
      price.value = x
      codeShow = search.value
    }
  }
  if (codeShow == "") {
    productNotFound()
  }
  if (document.querySelector(".modal-backdrop")) {
    document.querySelector(".modal-backdrop").remove()
  }
}

//Guardar en memoria los datos de producto
function save() {
  precio = price.value
  cantidad = quantity.value
  closeModal()
  search.value = ""
}

//Guardar en memoria los datos de producto agregado
function saveAdd() {
  cantidad2 = quantityNew.value
  precio2 = priceNew.value
  search.value = ""
  showList2()
  duplicateYes.play()
  closeModalAdd()
}

//Copiar el codigo scaneado con la camara
function copy() {
  search.value = document.querySelector('p#resultado').innerHTML
}

//Borrar los datos que hayan guardado de la tabla
btnClean.addEventListener('click', () => {
  localStorage.removeItem('tableInventario')
  window.location.reload()
})

//Eliminar producto de la tabla
$(function () {
  $(document).on('click', '.borrar', function (event) {
    event.preventDefault();
    swal({
      title: "¿Estás seguro?",
      text: "Se borrara el elemento la accion no se puede deshacer",
      icon: "warning",
      buttons: true
    }).then((result) => {
      if (result == true) {
        $(this).closest('tr').remove();
      }
    })
  });
});

//Cerrar modal principal
function closeModal() {
  exampleModal.classList.remove("d-block");
  exampleModal.classList.add("d-none")
}

//Cerrar modal de producto agregado
function closeModalAdd() {
  addProduct.classList.remove("d-block")
  addProduct.classList.add("d-none")
}

//Mostrar alerta de producto no encontrado
function productNotFound() {
  error.play()
  guardarLocal()
  swal({
    title: "Advertencia",
    text: "No se encontró el producto que buscas",
    icon: "warning",
    button: "Aceptar"
  }).then((result) => {
    if (result == true) {
      add()
    }
  })
}

function add() {
  swal({
    title: "Info",
    text: "Se abrirá una ventana para que puedas agregar el producto a la lista",
    icon: "info",
    button: "Aceptar"
  }).then((result) => {
    if (result == true) {
      addCode.value = search.value
      codeShow = search.value
      addProduct.classList.remove("d-none")
      addProduct.classList.add("d-block")
      addProductLabel.innerHTML = `Agregar Producto`
      nombreAdd.focus()
    }
  })
}

//Funcion de mostrar productos duplicados
function duplicate(a, b) {
  let arrays = []
  let divs = document.querySelectorAll("td.nombre")
  for (let i = 0; i < divs.length; i++) {
    a = divs[i].innerHTML
    b = divs[i + 1].innerHTML
    arrays.push(a)
    if (arrays.includes(a) && arrays.includes(b)) {
      param = arrays.indexOf(b)
      param2 = divs.length
      result = parseInt(divs[param].nextElementSibling.querySelector("p.cant").innerHTML) +
        parseInt(divs[param2 - 1].nextElementSibling.querySelector("p.cant").innerHTML)
      divs[param2 - 1].nextElementSibling.querySelector("p.cant").innerHTML = result
      divs[param].closest('tr').remove();
      result = ""
    }
  }
}

//Borrar lista de Productos y tabla
function deleteAll() {
  swal({
    title: "¿Estás seguro?",
    text: "Se borrará todo el progreso de la tabla y TODOS los Productos la acción no se puede deshacer",
    icon: "warning",
    buttons: true
  }).then((result) => {
    if (result == true) {
      swal({
        title: "Listo",
        icon: "info",
        text: "Se limpiaron los datos correctamente"
      })
      localStorage.clear()
    }
  })
}
//Mostrar toast Guardado exitoso
const toastTrigger = document.getElementById('save')
const toastLiveExample = document.getElementById('success')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function launchModal() {
  modalListProducts.classList.remove("d-none")
  modalListProducts.classList.add("d-block")
  recoverProductsList()
}

function closeModalProducts() {
  modalListProducts.classList.remove("d-block")
  modalListProducts.classList.add("d-none")
}

//Mostrar Productos actualizados en modal
function recoverProductsList() {
  for (arrays of arraysAdded) {
    nombre = arrays.nombre
    precio = arrays.Precio
    codigo = arrays.codigo
    codigo1 = arrays.codigo1
    codigo2 = arrays.codigo2
    codigo3 = arrays.codigo3
    codigo4 = arrays.codigo4
    bodyProduct.innerHTML += `<th scope="row">${nombre} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill modificar" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
  </svg>
  </th>
            <td class="col-span-2">${precio}</td>
            <td class="col-span-2"><p>${codigo}</p></td>
            <td class="col-span-2"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-trash borrar" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
          </svg></td>
            <td class="col-span-2 d-none"><p>${codigo1}</p></td>
            <td class="col-span-2 d-none"><p>${codigo2}</p></td>
            <td class="col-span-2 d-none"><p>${codigo3}</p></td>
            <td class="col-span-2 d-none"><p>${codigo4}</p></td>`
  }
  modalBody.innerHTML = `${arraysAdded.length}`
}

function help() {
  asistant.classList.remove("d-none")
  asistant.classList.add("d-block")
}

function closeHelp() {
  asistant.classList.remove("d-block")
  asistant.classList.add("d-none")
}

generate.addEventListener("click", () => {
  if (document.querySelector('#generate').innerHTML == "Mostrar tabla") {
    preview.classList.remove('d-none')
    preview.classList.add('d-block')
    document.querySelector('#generate').innerHTML = "Ocultar tabla"
  } else {
    document.querySelector('#generate').innerHTML = "Mostrar tabla"
    preview.classList.add('d-none')
    preview.classList.remove('d-block')
  }
})

launchCamscan.addEventListener("click", () => {
  camscan.classList.remove("d-none")
  camscan.classList.add("d-block")
})

function closeCamscan() {
  camscan.classList.add("d-none")
  camscan.classList.remove("d-block")
}

function searchLive() {
  searchResult.innerHTML = ""
  let text = search.value.toLowerCase()
  for (let arrays of arraysAdded) {
    let productName = arrays.nombre.toLowerCase()
    let productCode = arrays.codigo.toString()
    if (productName.indexOf(text) !== -1) {
      searchResult.innerHTML += `
      <li class="list-group-item cursor-active" onclick="idProduct(${productCode}), selectResult()">${productName}<br> Cod: <span id="${productCode}">${productCode}</span></li>`
    }
  }
}

function idProduct(id){
localStorage.setItem('item' ,id)
}
function selectResult() {
  let position = localStorage.getItem('item')
  element = document.getElementById(`#span${position}`).innerHTML
  search.value = element
  button.click();
  button.onclick = filter();
  searchResult.innerHTML = ""
}