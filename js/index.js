const letterPattern = /[^0-9]/;

function campoValor(event){
	if(letterPattern.test(event.key)){
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

function tabelaDetransações() {

    var transações = [
        {
            simbolo: '-',
            texto: 'Motorola EDGE 30',
            numero: '2.800,00',
        }
    ]

    console.log(document.querySelectorAll('div.etransações .tabela'))

    linhasTabela = [...document.querySelectorAll('div.etransações .tabela')];
    linhasTabela.forEach((element) => {
        element.remove()

    })
    for (tabela in transações) {
        document.querySelector('div.etransações').innerHTML += `
        <div class="tabela">

            <div class="valores">
                <p class="simbolo">+</p>
                <p class="texto"  >Lorem ipsum dolor sit amet consectetur</p>
                <p class="numero" >R$ 12.999,99</p>
            </div>

            <div class="valores">
                <p class="simbolo">-</p>
                <p class="texto"  >Quis nostrud exercitation</p>
                <p class="numero" >R$ 99,99</p>
            </div>

            <div class="valores">
                <p class="simbolo">+</p>
                <p class="texto"  >Lorem ipsum</p>
                <p class="numero" >R$ 9,99</p>
            </div>

            <div class="total">
                <b class="Ttotal">Total<b>
                <b class="Ntotal">R$ 12.909,99</b>
            </div>
        </div>`
    }
}

tabelaDetransações()
//function desenhaTabela () {
//    currentLines = [...document.querySelectorAll('etransações .dinamic-content')];
//    currentLines.forEach((element) => {
//        element.remove()
//    });
//}