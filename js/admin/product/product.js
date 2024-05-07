var $ctrl = new Object();

$(document).ready(function() {

  $ctrl.saveProduct = saveProduct;
  $ctrl.carregarPagina = carregarPagina;

  function saveProduct() {

    let product = buildProduct();

    if (validProduct(product)) {

      $.ajax({
        type: "POST",
        url: "http://localhost:7070/save",
        data: JSON.stringify(product),
        contentType: 'application/json',
        success: function (data) {
          alert("Produto salvo com sucesso!");
        },
        error: function (data) {
          alert("Erro ao salvar produto!");
        }
      });

      document.getElementById("addProduto").reset();

    }

  }

  function buildProduct() {

    let product = new Object();

    product.category = document.getElementById('category').value;
    product.brand = document.getElementById('brand').value;
    product.model = document.getElementById('model').value;
    product.capacity = document.getElementById('capacity').value;
    product.price = document.getElementById('price').value;

    return product;

  }

  function validProduct(product) {

    let validations = new Object([]);

    if (!product.category) {
      validations.push("categoria é obrigatória");
    }

    if (!product.brand) {
      validations.push("marca é obrigatória");
    }

    if (!product.model) {
      validations.push("modelo é obrigatório");
    }

    if (!product.capacity) {
      validations.push("capacidade é obrigatória");
    }

    if (!product.price) {
      validations.push("preço é obrigatório");
    }

    if (validations && validations.length) {

      let validationStr = validations.join(", ");

      alert(validationStr.charAt(0).toUpperCase() + validationStr.slice(1) + ".");

      return false;

    } else {
      return true;
    }

  }

  function carregarPagina(pageName) {

    $("section").empty();

    $('section').load(pageName + '/', function () {

    })

  }

});
