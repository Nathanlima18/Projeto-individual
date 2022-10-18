const valorTabela = /[^0-9]/;

function campoValor(event){
	if(valorTabela.test(event.key)){
		event.preventDefault();
		alert('Apenas números são permitidos!')
        return false
	}
	if(!event.target.value) return;

	valor = event.target.value.toString();
	valor = valor.replace(/[\D]+/g, '');
	valor = valor.replace(/([0-9]{1})$/g, ",$1");

	if(valor.length >= 6){
		while(/([0-9]{4})[,|\.]/g.test(valor)){
			valor = valor.replace(/([0-9]{1})$/g, ",$1");
			valor = valor.replace(/([0-9]{3})[,|\.]/g, ".$1");
		}
	}

	event.target.value = valor;
}

function testaFormulario(e) {
    e.preventDefault();

    var nomeMercadoria = document.getElementById("mercadoria").value;
    var valorMercadoria = document.getElementById("valor").value;
    var tipoTransacao = document.getElementById("compraEvenda").value;
  
    if (nomeMercadoria == "") {
      alert("Preencha o nome da mercadoria!");
      return false;
    }
    if (valorMercadoria == "") {
      alert("Preencha o valor da mercadoria!");
      return false;
    }
  
   if (tipoTransacao == "selecione") {
     alert("Preencha o tipo de transação!");
     return false;
   }

    //var tabelaPura = localStorage.getItem(tabelaDetransação)
    //if (tabelaPura != null) {
    //    var tabelaDetransação = JSON.parse(tabelaPura)
    //} else {
    //    var tabelaDetransação = [];
    //}
    localStorage.getItem(tabelaDetransação)
    tabelaDetransação.push({
       simbolo: e.target.elements['compraEvenda'].value,
       mercadoria: e.target.elements['mercadoria'].value,
       valor: e.target.elements['valor'].value
       .replaceAll(".", "")
       .replaceAll(",", "."),
    });

    var extrato = JSON.stringify(tabelaDetransação);

    localStorage.setItem("tabela", extrato);
    
}

var tabelaPura = localStorage.getItem('tabelaDetransação')
    if (tabelaPura != null) {
        var tabelaDetransação = JSON.parse(tabelaPura)
    } else {
        var tabelaDetransação = [];
    }


function criarTabela() {
    for (transacao in tabelaDetransação) {
        document.querySelector('table.tabelaT').innerHTML +=
       `<tbody>
       <tr class="linhas total linhaM">
            <td>${e.target.elements['compraEvenda'].value}</td>
            <td class="mercadoriaTabela">${e.target.elements['mercadoria'].value}</td>
            <td class="valor">${e.target.elements['valor'].value}</td>
        </tr>
        </tbody>`
    }
    //Console.log(e.target.elements)
}

//criarTabela()

function limparDados(e) {
    tabelaDetransação.splice(e)
    var L;
    var r=confirm("Quer mesmo limpar todos os dados?");
    if (r==true) {
        L="Dados apagados!";
    } else  {
        L="Ação cancelada"
    }
    localStorage.removeItem('criarTabela')
}

//[
//    {
//      "simbolo": true,
//      "texto": "Lorem ipsum dolor sit amet consectetur",
//      "valor": "R$ 12.999,99"
//    },
//    {
//      "simbolo": false,
//      "texto": "Quis nostrud exercitation",
//      "valor": "R$ 99,99"
//    },
//    {
//      "simbolo": true,
//      "texto": "Lorem ipsum",
//      "valor": "R$ 9,99"
//    },
//    {
//      "texto": "Total",
//      "valor": "R$ 12.909,99"
//    }
//  ]