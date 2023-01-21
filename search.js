addEventListener('DOMContentLoaded', async ()=>{
  let promise = await fetch('productos.json')
  let result = await promise.json()
  data = result
  show(data.productos)
  })
  
  function show(){
    let toAppened = []
      for (let i = 0; i < data.productos.length; i++) {
          toAppened += `<tr>
            <th scope="row">${[i + 1]}</th>
            <td class="col-span-2">${data.productos[i].nombre}</td>
            <td class="col-span-2"><input type="number" placeholder="Cant." class="form-control cant col-8 col-md-3" aria-label="cant"><p class="cant d-none"></p>
            <td class="col-span-2"><input type="number" placeholder="$" oninput="calcular()" onchange="guardarLocal()"class="form-control precio col-10 col-md-3" aria-label="precio" value=${parseInt(data.productos[i].Precio)}><p class="precio d-none"></p>
            <td class="col-span-2"> $<span class="total" id="${i}total"></span>
            </tr>`
      }
      document.getElementById('productos').innerHTML = toAppened
  }
  
  const search = document.querySelector('input#search')
  const button = document.getElementById('btnSearch')
  const list = document.querySelector('div#listGroup')
  
  search.addEventListener('input', ()=>{
    if(search.value !== ""){
      button.classList.remove('disabled')
    } else{
      button.classList.add('disabled')
    }
  })
  
  search.addEventListener('keyup', function (event){
    if(event.code == 'Enter'){
      filter()
      $("button").click()
    }
  })
  
  function filter(){
    listGroup.innerHTML = ""
    let productos = data.productos
    let cantidad = document.querySelector("input#quantity")
    for(let producto of productos){
      if(parseInt(search.value) == producto.codigo){
        showModal()
          findResults.innerHTML += `
        <li class="list-group-item">${producto.nombre} -- Codigo de barra: ${producto.codigo} Cantidad: ${cantidad.innerHTML}</li>
        `
        }
      }
    }
  
  function showModal(){
    document.getElementById("listGroup").innerHTML = `
    <form>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Ingresar cantidad
          <input type="number" id="quantity" class="form-control mt-2 mb-2">
          Ingresar precio
          <input type="number" id="price" class="form-control mt-2 mb-2">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
        </div>
      </div>
    </div>
  </div>
  </form>`
  }
  function save(){
    let cantidad = document.querySelector("input#quantity").value
    let precio = document.querySelector("input#price")
  }