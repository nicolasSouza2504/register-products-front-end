var $ctrl = new Object();

$(document).ready(function() {

  $("header").load('/pages/admin/general/header.html');
  $("footer").load('/pages/admin/general/footer.html');

  $ctrl.carregarPagina = carregarPagina;

  function carregarPagina(pageName) {

    $("section").empty();

    $('section').load(pageName + '/', function () {
      
    })

  }
  
});
