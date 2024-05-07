var $ctrl = new Object();


$(document).ready(function () {

  $ctrl.onInit = onInit;
  $ctrl.carregarPagina = carregarPagina;
  $ctrl.edit = edit;

  async function onInit() {

    generateTableProducts();

  }

  async function generateTableProducts() {

    $ctrl.products = await getProducts();

    populateTableData();

  }

  async function getProducts() {
    return await $.ajax({
      type: "GET",
      url: "http://localhost:7070/list-all",
      contentType: 'application/json',
      success: function (data) {
        return data;
      },
      error: function (data) {
        alert("Erro ao consultar os produtos!");
      }
    });
  }

  function populateTableData() {

    if ($ctrl.products && $ctrl.products.length) {

      cleanTableData();

      let trList = [];

      $ctrl.products.forEach(product => {

        let tdList = getTdList(product);

        let trElement = document.createElement('tr');

        if (tdList.length) {

          tdList.forEach(td => {
            trElement.appendChild(td);
          });

        }

        trList.push(trElement);

      })

      if (trList.length) {

        let tbodyElement = document.getElementById('contentProducts');

        trList.forEach(tr => {
          tbodyElement.appendChild(tr);
        });

      }

    } else {
      cleanTableData();
    }

  }

  function getTdList(product) {

    let tdList = [];

    let tdCategory = document.createElement('td');

    tdCategory.textContent = product.category;

    tdList.push(tdCategory);

    let tdBrand = document.createElement('td');

    tdBrand.textContent = product.brand;

    tdList.push(tdBrand);

    let tdModel = document.createElement('td');

    tdModel.textContent = product.model;

    tdList.push(tdModel);

    let tdCapacity = document.createElement('td');

    tdCapacity.textContent = product.capacity;

    tdList.push(tdCapacity);

    let tdPrice = document.createElement('td');

    tdPrice.textContent = product.price;

    tdList.push(tdPrice);

    tdList.push(getEditTd(product));
    tdList.push(getDeleteTd(product));

    return tdList;

  }

  function carregarPagina(pageName) {

    $("section").empty();

    $('section').load(pageName + '/', function () {

    })

  }

  function getEditTd(product) {

    let tdEdit = document.createElement('td');

    let spanEdit = document.createElement('span');
    let iconEdit = document.createElement('i');

    iconEdit.classList.add("fa", "fa-pencil-square")

    spanEdit.appendChild(iconEdit);

    spanEdit.onclick = function () {
      editProduct(product.id);
    }

    tdEdit.appendChild(spanEdit);

    return tdEdit;

  }

  function editProduct(id) {

    showEdit();

    $ctrl.productEdit = productToEdit = $ctrl.products.find((product) => {
      return product.id === id;
    });

    populateFormData(productToEdit);

  }

  function getDeleteTd(product) {

    let tdDelete = document.createElement('td');

    let spanDelete = document.createElement('span');
    let iconDel = document.createElement('i');

    iconDel.classList.add("fa", "fa-trash")

    spanDelete.appendChild(iconDel);

    spanDelete.onclick = function () {
      excludeProduct(product.id);
    }

    tdDelete.appendChild(spanDelete);

    return tdDelete;

  }

  async function excludeProduct(id) {
    return await $.ajax({
      type: "DELETE",
      url: "http://localhost:7070/delete?id=" + id,
      contentType: 'application/json',
      success: function (data) {
        return generateTableProducts();
      },
      error: function (data) {
        alert("Erro ao consultar os produtos!");
      }
    });
  }

  function cleanTableData() {

    let tbodyElement = document.getElementById('contentProducts');

    tbodyElement.innerHTML = '';

  }

  function populateFormData() {

    document.getElementById('category').value = $ctrl.productEdit.category;
    document.getElementById('brand').value = $ctrl.productEdit.brand;
    document.getElementById('model').value = $ctrl.productEdit.model;
    document.getElementById('capacity').value = $ctrl.productEdit.capacity;
    document.getElementById('price').value = $ctrl.productEdit.price;

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

  async function edit() {

      $ctrl.productEdit = buildProduct();

      if (validProduct($ctrl.productEdit)) {

        $.ajax({
          type: "PUT",
          url: "http://localhost:7070/edit",
          contentType: 'application/json',
          data: JSON.stringify($ctrl.productEdit),
          success: function (data) {

            hideEdit();

            alert("Produto editado com sucesso!");

            $ctrl.productEdit = null;

            generateTableProducts();

          },
          error: function (data) {
            alert("Erro ao editar produto!");
          }
        });

      }
  }
  function buildProduct() {

    let product = new Object();

    product.category = document.getElementById('category').value;
    product.brand = document.getElementById('brand').value;
    product.model = document.getElementById('model').value;
    product.capacity = document.getElementById('capacity').value;
    product.price = document.getElementById('price').value;
    product.id = $ctrl.productEdit.id;

    return product;

  }

  function hideEdit() {

    document.getElementById("editProduct").reset();
    document.getElementById('editProduct').style.display = 'none';

    document.getElementById('tabelaProdutos').style.display = 'table';

  }

  function showEdit() {
    document.getElementById('editProduct').style.display = 'block';
    document.getElementById('tabelaProdutos').style.display = 'none';
  }

  $ctrl.onInit();

});
