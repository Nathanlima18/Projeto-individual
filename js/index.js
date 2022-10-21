var listaExtrato = [];

function cadastroTransacoes() {
    var c = document.querySelector("#CT");
    c.addEventListener("click", function() {
        location.reload();
    });
};

function limparDados(e) {
    tabelaDetransação.splice(e)
    var r=confirm("Quer mesmo limpar todos os dados?");
    if (r==true) {
        localStorage.removeItem('tabela')
        alert('Dados Apagados!')
    } else {
        alert('Ação Cancelada!')
    }

    criarTabela()

    var r = document.querySelector("#LD");
    r.addEventListener("click", function() {
        location.reload();
    });
}


const valorTabela = /[^0-9]/;

String.prototype.reverse = function(){
    return this.split('').reverse().join(''); 
  };
  
    function mascaraMoeda(campo,evento){
      var tecla = (!evento) ? window.event.keyCode : evento.which;
      var valor  =  campo.value.replace(/[^\d]+/gi,'').reverse();
      var resultado  = "";
      var mascara = "##.###.###,##".reverse();
      for (var x=0, y=0; x<mascara.length && y<valor.length;) {
        if (mascara.charAt(x) != '#') {
          resultado += mascara.charAt(x);
          x++;
        } else {
          resultado += valor.charAt(y);
          y++;
          x++;
        }
      

      campo.value = resultado.reverse();
      if(valorTabela.test(evento.key)){
      		evento.preventDefault();
      		alert('Apenas números são permitidos!')
            return false
        }
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
    
    var R = document.querySelector("#AT");
    R.addEventListener("click", function() {
        location.reload();
    });
}

var tabelaPura = localStorage.getItem('tabela')
if (tabelaPura != null) {
    var tabelaDetransação = JSON.parse(tabelaPura)
} else {
    var tabelaDetransação = [];
}


function criarTabela() {
        
    document.querySelectorAll(".conteudo").forEach((element) => {
    element.remove();
    });

    if (tabelaDetransação.length === 0) {
        document.getElementById("nenhumaTransação").innerHTML +=
        `<tr>
            <td class="Ntransação" id="transacoes">Nenhuma transação cadastrada</td>
        </tr>`;

    } else {
        document.getElementById("nenhumaTransação").style.display = "none";
    }

    var formato  =  new Intl.NumberFormat ( "pt-BR" ,  {
        estilo : "moeda" ,
        moeda : "BRL" ,
        maximumFractionDigits : 2 ,
    });
    
    formato.format(2500);
    
    function formatoMoeda (valores)  {
        const valorFormato = valores.toLocaleString ("pt-BR",{
          estilo: "moeda",
          moeda: "BRL",
        });
        return valorFormato;
    };

    var mascaraValor;
    var total = 0;
    for (produto in listaExtrato) {
        if (listaExtrato[produto].transacao == "compra") {
            mascaraValor = listaExtrato[produto];
            total -= number(transacao.valor);
        } else {
            
            total += number(transacao.valor);
        }
    }

    for (transacao of tabelaDetransação) {
        document.querySelector('table tbody').innerHTML +=
        `<tr class="linhas total linhaM">
            <td>${transacao.simbolo =='compra' ? '-':'+'}</td>
            <td class="mercadoriaTabela">${transacao.mercadoria}</td>
            <td class="valor">${formatoMoeda(Number(transacao.valor))}</td>
        </tr>`
    }


    if (tabelaDetransação.length > 0) {
        document.querySelector("table").innerHTML += `
        <tfoot>
            <tr></tr>
            <tr class="linhas total linhaT">
                <td class="Total"><b>Total</b></td>
            </tr>
            <tr class="linhas total linhaT" id="valorTotal">
                <td><b> ${formato.format(valor)} </b></td>
                <td style="font-size:10px">${Math.sign(valor) > 0 ? "[LUCRO]" : "[PREJUÍZO]"}</td>
            </tr>
        </tfoot>`;
    }
}   
criarTabela()