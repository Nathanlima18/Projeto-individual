var listaExtrato = [];

const valorTabela = /[^0-9]/;


function formatarMoeda(f){
    var elemento = document.getElementById('valor');
    var valor = elemento.value;
  
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g,''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");

    if (valor.length > 6) {
      valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    elemento.value = valor;

	if(valorTabela.test(f.key)){
		f.preventDefault();
		alert('Apenas números são permitidos!')
        return false
	}
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

    localStorage.getItem("tabela")
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

var tabelaPura = localStorage.getItem('tabela')
    if (tabelaPura != null) {
        var tabelaDetransação = JSON.parse(tabelaPura)
    } else {
        var tabelaDetransação = [];
    }


function criarTabela() {
    //var total = 0;
    
    //document.querySelectorAll(".conteudo").forEach((element) => {
    //element.remove();
    //});
//
    if (tabelaDetransação.length === 0) {
        document.getElementById("nenhumaTransação").innerHTML +=
        `<tr>
            <td class="Ntransação" id="transacoes">Nenhuma transação cadastrada</td>
        </tr>`;

    } else {
        document.getElementById("nenhumaTransação").style.display = "none";
    }

    
    //let mascaraValor;
    //
    //for (produto in listaExtrato) {
    //    if (listaExtrato[produto].tipoTransacao == "compra") {
    //        valorMascara = listaExtrato[produto];
    //        total -= Number(listaExtrato[produto].valorMercadoria);
    //    } else {
    //        
    //        total += Number(listaExtrato[produto].valorMercadoria);
    //    }
    //}

    for (transacao of tabelaDetransação) {
        document.querySelector('table tbody').innerHTML +=
        `<tr class="linhas total linhaM">
            <td>${transacao.simbolo =='compra' ? '-':'+'}</td>
            <td class="mercadoriaTabela">${transacao.mercadoria}</td>
            <td class="valor">${transacao.valor}</td>
        </tr>`
    }

   // if (tabelaDetransação.length === 0) {
   //     document.getElementById("tfoot").style.display = "none";
   //     
//
   // } else {
   //     document.getElementById("table tfoot").innerHTML +=
   //     `<tr></tr>
   //         <tr class="linhas total linhaT">
   //             <td class="textoTotal"><b>TOTAL</b></td>
   //         </tr>
   //         <tr></tr>
   //         <tr class="linhas total linhaT" id="valorTotal">
   //             <td><b>R$ 9,99</b></td>
   //             <td style="font-size:10px">[LUCRO]</td>
   //     </tr>`;
   // }
    
    //Console.log(e.target.elements)
}

criarTabela()

var els = document.getElementsByClassName("valor");
var valorcalculado = 0;
[].forEach.call(els, function (el) {
    valorcalculado += parseInt(el.innerHTML);
});

document.getElementById("valorTotal").innerHTML = valorcalculado;

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
    criarTabela()
    localStorage.removeItem('tabela')
}