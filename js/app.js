function validaFaleConosco() {

  if (document.frmfaleconosco.txtname.value === "") {

    alert("Por favor, preencha o campo Nome.");

    document.frmfaleconosco.txtname.focus();

    return false;

  }

  if (document.frmfaleconosco.txtemail.value === "") {

    alert("Por favor, preencha o campo E-mail.");

    document.frmfaleconosco.txtemail.focus();

    return false;

  } else {

    var regexEmail= new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

    if (!regexEmail.test(document.frmfaleconosco.txtemail.value)) {

        alert('Preencha o campo e-mail corretamente.');

        document.frmfaleconosco.txtemail.focus();

        return false;

    }

  }

  if (document.frmfaleconosco.txtfone.value === "") {

    alert("Por favor, preencha o campo Telefone.");

    document.frmfaleconosco.txtfone.focus();

    return false;

  } else {

    var regexFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");

    if (!regexFone.test(document.frmfaleconosco.txtfone.value)) {

      alert('Preencha o campo telefone corretamente.');

      document.frmfaleconosco.txtfone.focus();

      return false;

    }

  }

  if (document.frmfaleconosco.selmotivo.value === "") {

    alert("Preencha o campo motivo.");

    document.frmfaleconosco.selmotivo.focus();

    return false;

  } else {

    var elementSelect = document.frmfaleconosco.selmotivo;

    if (elementSelect.value === 'PR') {

      var elementProduto = document.frmfaleconosco.selproduto;

      if (elementProduto.value === "") {

        alert("Preencha o campo produto");

        elementProduto.focus();

        return false;

      }

    }

  }

  if (document.frmfaleconosco.txtcomentario.value === "") {

    alert("Preencha o campo comentário.");

    return false;

  }

}

function verificaMotivo(motivo) {

  var element = document.getElementById('opcaoProduto')

  if (motivo == 'PR') {

    var select = document.createElement('select');

    select.setAttribute("name", "selproduto");

    var optionFreezer = document.createElement('option');

    optionFreezer.setAttribute("value", "FR");

    var textoFreezer = document.createTextNode("Freezer");

    optionFreezer.appendChild(textoFreezer);

    var optionEmpty = document.createElement('option');

    optionEmpty.setAttribute("value", "");

    var textoEmpty = document.createTextNode("Escolha");

    optionEmpty.appendChild(textoEmpty);

    select.appendChild(optionEmpty)
    select.appendChild(optionFreezer);

    element.appendChild(select);

  } else {

    if (element.firstChild) {
      element.removeChild(element.firstChild);
    }

  }

}

$(document).ready(function() {

  $("header").load('/pages/site/general/cabecalho.html');
  $("footer").load('/pages/site/general/rodape.html');
  $("nav").load('/pages/site/general/menu.html');

})
