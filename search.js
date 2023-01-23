addEventListener('DOMContentLoaded', async () => {
  let promise = await fetch('productos.json')
  let result = await promise.json()
  data = result
})

function show() {
  let toAppened = ""
    toAppened = `<tr>
            <th scope="row" class="small">${search.value}</th>
            <td class="col-span-2">${exampleModalLabel.innerHTML.split(":")[1]}</td>
            <td class="col-span-2"><input type="number" placeholder="Cant." class="form-control cant col-8 col-md-3" aria-label="cant" value=${cantidad}><p class="cant d-none"></p>
            <td class="col-span-2"><input type="number" placeholder="$" oninput="calcular()" onchange="guardarLocal()"class="form-control precio col-10 col-md-3" aria-label="precio" value=${precio}><p class="precio d-none"></p>
            <td class="col-span-2"> $<span class="total"></span>
            </tr>`
            document.getElementById('productos').innerHTML += toAppened
  }
  

const search = document.querySelector('input#search')
const button = document.getElementById('btnSearch')
const list = document.querySelecto&&r('div#listGroup')
let cantidad = document.querySelector("input#quantity")
let precio = document.querySelector("input#price")

search.addEventListener('input', () => {
  if (search.value !== "") {
    button.classList.remove('disabled')
  } else {
    button.classList.add('disabled')
  }
})

search.addEventListener("keypress", function(e) {
  if (e.code === 'Enter') {
    filter()
    document.getElementById("btnSearch").click();
    document.getElementById("btnSearch").onclick = filter();
  }
});

function filter() {
  let nombre = ""
  let productos = data.productos
  for (let producto of productos) {
    let nombre = producto.nombre
    if (search.value == producto.codigo || search.value == producto.codigo1 || search.value == producto.codigo2 || search.value == producto.codigo3 || search.value == producto.codigo4) {
      exampleModalLabel.innerHTML = `Producto: ${nombre}`
      price.value = producto.Precio
    }
  }
}
function save(){
  precio = price.value
  cantidad = quantity.value
