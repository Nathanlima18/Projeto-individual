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


    var tabelaPura = localStorage.getItem('tabelaDetransação')
    if (tabelaPura != null) {
        var tabelaDetransação = JSON.parse(tabelaPura)
    } else {
        var tabelaDetransação = [];
    }

    //tabelaDetransação.push({
    //    simbolo: ,
    //    texto: e.target.elements['mercadoria'].value,
    //    valor:
    //})

    //console.log(e.target.elements['Venda'])
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
       `<table class="tabela">
            <tbody>
                <tr class="tr1">
                    <td>${tabelaDetransação[transacao].simbolo ? '+' : '-'}</td>
                    <td class="texto1">${tabelaDetransação[transacao].texto}</td>
                    <td>${tabelaDetransação[transacao].valor}</td>
                </tr>
            </tbody>
        </table>`
        //<p class="lucro">${tabelaDetransação[transacao].lucro ? '[LUCRO]' : '[PREJUIZO]'}</p>
    }
}


function limparDados(e) {
    tabelaDetransação.splice(e)
    var L;
    var r=confirm("Quer mesmo limpar todos os dados?");
    if (r==true) {
        L="Dados apagados!";
    } else  {
        L="Ação cancelada"
    }
    criarTabela();
    localStorage.removeItem('tabelaDetransação')
}