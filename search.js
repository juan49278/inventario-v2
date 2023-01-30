addEventListener('DOMContentLoaded', async () => {
  showSpinner()
  let promise = await fetch('productos.json')
  let result = await promise.json()
  data = result
  hideSpinner()
  if (localStorage.getItem('tableSalon')) {
    btnClean.classList.remove('btn-secondary','disabled')
    btnClean.classList.add('btn-success')
    table.innerHTML = localStorage.getItem('tableSalon')
    let pCant = document.querySelectorAll('p.cant')
    let pPrecio = document.querySelectorAll('p.precio')
    let iCant = document.querySelectorAll('input.cant')
    let iPrecio = document.querySelectorAll('input.precio')
    for (let i = 0; i < pCant.length; i++) {
        iCant[i].value = pCant[i].innerHTML
        for (let i = 0; i < pPrecio.length; i++) {
            iPrecio[i].value = pPrecio[i].innerHTML
        }
    }
}
})

function show() {
  let toAppened = ""
  toAppened = `<tr>
            <th scope="row" class="small">${search.value}</th>
            <td class="col-span-2 nombre">${exampleModalLabel.innerHTML.split(":")[1]}</td>
            <td class="col-span-2"><input type="number" placeholder="Cant." oninput="calcular()" class="form-control cant col-8 col-md-3" aria-label="cant" value=${cantidad}><p class="cant d-none"></p>
            <td class="col-span-2"><input type="number" placeholder="$" oninput="calcular()" onchange="guardarLocal()"class="form-control precio col-10 col-md-3" aria-label="precio" value=${precio}><p class="precio d-none"></p>
            <td class="col-span-2"> $<span class="total"></span>
            </tr>`
  document.getElementById('productos').innerHTML += toAppened
}


const search = document.querySelector('input#search')
const button = document.getElementById('btnSearch')
let nombreList = document.querySelectorAll('td.nombre')
let cantidad = document.querySelector("input#quantity")
let precio = document.querySelector("input#price")

search.addEventListener('input', () => {
  if (search.value !== "") {
    button.classList.remove('btn-secondary', 'disabled')
    button.classList.add('btn-info')
  } else {
    button.classList.remove('btn-info')
    button.classList.add('btn-secondary', 'disabled')
  }
})

search.addEventListener("keypress", function (e) {
  if (e.code == 'Enter' || e.code == 13 || e.which == 13) {
    filter()
    document.getElementById("btnSearch").click();
    document.getElementById("btnSearch").onclick = filter();
  }
});

function filter() {
  showSpinner()
  let nombre = ""
  let productos = data.productos
  for (let producto of productos) {
    let nombre = producto.nombre
    let codigo = producto.codigo
    let codigo1 = producto.codigo1
    let codigo2 = producto.codigo2
    let codigo3 = producto.codigo3
    let codigo4 = producto.codigo4
    if (search.value == codigo || search.value == codigo1 || search.value == codigo2 || search.value == codigo3 || search.value == codigo4) {
      exampleModalLabel.innerHTML = `Producto: ${nombre}`
      price.value = producto.Precio
    }
}
hideSpinner()
}
function save() {
  precio = price.value
  cantidad = quantity.value
}
function copy() {
  search.value = document.querySelector('p#resultado').innerHTML
}

function findDuplicate(){
  for(let i=0; i < nombreList.length; i++){
    if(nombreList[i].innerHTML == nombreList[i+1]){
     let cantidadActual = document.querySelectorAll('td.nombre')[i].nextElementSibling;[document.querySelectorAll('input.cant')[i].value]
     let cantidadNueva = document.querySelectorAll('td.nombre')[i+1].nextElementSibling;[document.querySelectorAll('input.cant')[i+1].value]
     let sumatoria = parseInt(cantidadActual) + parseInt(cantidadNueva)
    price.value = sumatoria
    }
  }
}
btnClean.addEventListener('click', ()=>{
  localStorage.removeItem('tableSalon')
  window.location.reload()
})