document.addEventListener("DOMContentLoaded", () => {
  const $resultados = document.querySelector("#resultado");
  Quagga.init({
    inputStream: {
      constraints: {
        width: 1920,
        height: 1080,
      },
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
    },
    decoder: {
      readers: ["ean_reader"]
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return
    }
    console.log("Iniciado correctamente");
    Quagga.start();
  });

  Quagga.onDetected((data) => {
    $resultados.textContent = data.codeResult.code;
    // Imprimimos todo el data para que puedas depurar
    console.log(data);
  });
});

$(document).ready(() => {
  $("#getXLS").click(function () {
    downloadExcel()
    $("#table_wrapper").table2excel({
      exclude: ".noExl",
      name: "Worksheet Name",
      filename: "Inventario" + "_" + (document.getElementById("mes").value),
      fileext: ".xls"
    });
  });
})

$(document).ready(() => {
  $("#listUpdate").click(function () {
    downloadExcel()
    $("#bodyProductTable").table2excel({
      exclude: ".noExl",
      name: "Worksheet Name",
      filename: "Lista" + "_" + "Productos",
      fileext: ".xls"
    });
  });
})

function calcular() {
  let todosInputs = document.querySelectorAll('p.cant');
  for (let i = 0; i < todosInputs.length; i++) {
    let a = document.querySelectorAll("p.cant")[i].innerHTML;
    let b = document.querySelectorAll('p.precio')[i].innerHTML;
    let c = b * a;
    document.querySelectorAll('span.total')[i].innerHTML = c
    document.querySelectorAll('p.cant')[i].innerHTML = a
    document.querySelectorAll('p.precio')[i].innerHTML = b
  }
}

function calculoBalance() {
  calcular()
  let spanInputs = document.querySelectorAll(`span.total`);
  let resultado = 0;

  spanInputs.forEach(function (spanInputs) {
    resultado += parseInt(spanInputs.innerHTML) || 0;
  });

  document.querySelector(`span#result`).innerHTML = resultado;
  let mesShow = document.querySelector("input#mes").value
  mesVal.innerHTML = mesShow
}
let showSpinner = function () {
  document.getElementById("animation").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("animation").style.display = "none";
}

function guardarLocal() {
  let table = document.getElementById('productos').innerHTML
  localStorage.setItem('table' + document.title, table)
  let divList = document.getElementById("listGroup").innerHTML
  localStorage.setItem("saveProducts", divList)
}
function downloadExcel() {
  swal({
    title: 'Listo!',
    text: 'Se empezó a descargar tu Excel',
    icon: 'info'
  })
}
