function limparDados() {
    let confirmar = confirm("Deseja remover todas as transações?");

    if (confirmar) {
        document.querySelectorAll("table tbody , tfoot").forEach((element) => {
            element.remove();
        })

        localStorage.clear();
        tabelaDetransacao = [];
        criarTabela();  
    }
}

const valorTabela = /[^0-9]/;

function formatoDinheiro(e) {
    if (valorTabela.test(e.key)) {
      console.log(e.key);
      e.preventDefault();
      return;
    }
  
    if (!e.target.value) return;
  
    valor = e.target.value.toString();
    valor = valor.replace(/[\D]+/g, "");
    valor = valor.replace(/([0-9]{1})$/g, ",$1");
  
    if (valor.length >= 6) {
      while (/([0-9]{4})[,|\.]/g.test(valor)) {
        valor = valor.replace(/([0-9]{1})$/g, ",$1");
        valor = valor.replace(/([0-9]{3})[,|\.]/g, ".$1");
      }
    }
    e.target.value = valor;
}

var tabelaPura = localStorage.getItem('tabela')
if (tabelaPura != null) {
    var tabelaDetransacao = JSON.parse(tabelaPura)
} else {
    var tabelaDetransacao = [];
}

function criarTabela() {

    document.querySelectorAll(".linhaM").forEach((element) => {
        element.remove();
    })

    if (tabelaDetransacao.length === 0) {
        document.getElementById("nenhumaTransacao").innerHTML +=
        `<div id="nenhumaTransacao">Nenhuma transação cadastrada</div>`;

    } else {
        document.getElementById("nenhumaTransacao").style.display = "none";
    }
     var mascaraValor;
     var total = 0;
     for (transacao of tabelaDetransacao) {
        document.querySelector('table tbody').innerHTML +=
        `<tr class="linhas total linhaM">
            <td>${transacao.simbolo =='compra' ? '-':'+'}</td>
            <td class="mercadoriaTabela">${transacao.mercadoria}</td>
            <td class="valor">${transacao.valor.toLocaleString ("pt-BR",{style:'currency', currency: "BRL",})}</td>
        </tr>`

        if (transacao.simbolo == "compra") {
            mascaraValor = tabelaDetransacao[transacao];
            total -= (transacao.valor);
        } else {

            total += (transacao.valor);
        };

     
     
    }
    
    if (tabelaDetransacao.length > 0) {
        document.querySelector("table.tabelaT tfoot").innerHTML += `
        <tr></tr>
        <tr class="linhaT">
            <td></td>
            <td class="Total"><b>Total</b></td>
            <td></td>
            <td id="valorTotal"><b> ${total.toLocaleString ("pt-BR",{style:'currency', currency: "BRL",}) }</b></td>
        </tr>
        <tr>
            <td class="prejuizo">${Math.sign(total) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}</td>
        </tr>`;
    }
}

function testaFormulario(e) {
    e.preventDefault();
  
    if (document.getElementById("compraEvenda").value == "selecione") {
        alert("Preencha o tipo de transação!");
        return false;
    }
    
    if (document.getElementById("mercadoria").value == "") {
      alert("Preencha o nome da mercadoria!");
      return false;
    }

    if (document.getElementById("valor").value == "") {
      alert("Preencha o valor da mercadoria!");
      return false;
    }
  
    localStorage.getItem("tabela")
    tabelaDetransacao.push({
       simbolo: e.target.elements['compraEvenda'].value,
       mercadoria: e.target.elements['mercadoria'].value,
       valor: parseFloat(e.target.elements['valor'].value 
       .replaceAll(".", "")
       .replaceAll(",", "."))
    });

    var extrato = JSON.stringify(tabelaDetransacao);

    localStorage.setItem("tabela", extrato);

    criarTabela()
}

criarTabela()