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
      $("#button").click()
    }
  })
  
  function filter(){
    let productos = data.productos
    for(let i=0; i < productos.length; i ++){
      let code = data.productos[i].codigo
      if(code == parseInt(search.value)){
        showModal()
      }
      if (code == parseInt(search.value)){
        listGroup.innerHTML = `
        No se encontro el producto
        `
      }
    }
  }
  
  function showModal(){
    document.getElementById("listGroup").innerHTML = `
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`
  }