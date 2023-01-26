document.addEventListener("DOMContentLoaded", () => {
  const $resultados = document.querySelector("#resultado");
  Quagga.init({
    inputStream: {
      constraints: {
        width: 320,
        height: 480,
      },
      name: "Live",
      type: "LiveStream",
      target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
    },
    decoder: {
      readers: ["ean_reader"]
    }
  }, function(err) {
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
    alert()
    $("#content").table2excel({
      exclude: ".noExl",
      name: "Worksheet Name",
      filename: "Inventario" + "_" + (document.title) + "_" + (document.getElementById("mes").value),
      fileext: ".xls"
    });
  });
})

function calcular() {
  let todosInputs = document.querySelectorAll('input');
  for (let i = 0; i < todosInputs.length; i++) {
    let a = document.querySelectorAll('input.cant')[i].value;
    let b = document.querySelectorAll('input.precio')[i].value;
    let c = b * a;
    document.querySelectorAll('span')[i].innerHTML = c
    document.querySelectorAll('p.cant')[i].innerHTML = a
    document.querySelectorAll('p.precio')[i].innerHTML = b
  }
}

function calculoBalance() {
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
  let table = document.getElementById('table').innerHTML
  localStorage.setItem('table' + document.title, table)
}