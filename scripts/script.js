
let menuContent = document.querySelector('.content');
let menuToggle = menuContent.querySelector('.menu-toggle');
let show = true;

menuToggle.addEventListener('click', () => {
    document.body.style.overflow = show ? 'hidden' : 'initial';
    menuContent.classList.toggle('on', show);
    show = !show;
})

let itensCardapio = document.querySelector(".itens-cardapio");
let id = 0;
for (const p of produtos) {
    itensCardapio.innerHTML += `
    <div class="">
        <img src="${p.img}" alt="${p.dsImg}">
        <div class="info">
            <h3>${p.nome}</h3>
            <h4>6 fatias<span>R$${p.fatias6}</span></h4>
            <h4>8 fatias<span>R$${p.fatias8}</span></h4>
            <h4>12 fatias<span>R$${p.fatias12}</span></h4>
            <button id="id${id}" class="pedir">pedir agora</button>
        </div>
    </div>
    `;
    id++;
}

let telaCarrinho = document.querySelector('.tela-carrinho');
let continuar = document.querySelector('.continuar');
continuar.addEventListener('click', () => {
    telaCarrinho.classList.toggle('ocultar-tela-carrinho');
})

let compras = document.querySelector('.compras');
compras.addEventListener('click', () => {
    telaCarrinho.classList.toggle('ocultar-tela-carrinho');
    menuToggle.click(); // fechar o menu suspenso nas versões mobile
})

let lsPedido = document.querySelectorAll('.pedir');
for (const bt of lsPedido) {
    bt.addEventListener('click', () => {
        let id = bt.id.replace('id', '');
       let car = document.getElementById('car')
        bt.classList.toggle('selecionado');
        if(bt.innerHTML =='REMOVER'){
            produtos[id].quantidade = 0;
            bt.innerHTML = 'pedir agora'
            car.innerHTML = `<a href="#"><i class="bi bi-cart2"></i></a>`
           
        }else{
            produtos[id].quantidade = 1;
            bt.innerHTML = 'REMOVER';
            car.innerHTML = ` <a href="#"><i class="bi bi-cart-plus"></i></a>`
        }
       
        atualizarTabela();
    });
}

let tbody = document.querySelector('tbody');
function atualizarTabela() {
    tbody.innerHTML = '';
    let total = 0;
    let id = 0;
    for (const p of produtos) {
        if (p.quantidade > 0) {
            tbody.innerHTML += `
            <tr>
                <td>${p.nome} R$ ${p.fatias8},00 </td>
                <td>- ${p.quantidade} - pizza</td>
                <td> R$ ${p.quantidade * p.fatias8},00 </td>
                <td>
                    <i class="bi bi-plus-square-fill" id="plus${id}"></i>

                    <i class="bi bi-dash-square-fill" id="dash${id}"></i>
                </td>
            </tr>`;
            total += p.quantidade * p.fatias8;
        }
        id++;
    }
    document.querySelector('#total-pedido').innerHTML = `Valor total do pedido = R$ ${total}`;
    atualizarPlusDash('plus');
    atualizarPlusDash('dash');
}

function atualizarPlusDash(tipo) {
    let botoes = document.querySelectorAll(`.bi-${tipo}-square-fill`);
    for (const bt of botoes) {
        bt.addEventListener('click', () => {
            let id = bt.id.replace(tipo, '');
            if (tipo == 'plus') {
                produtos[id].quantidade++;
            }
            if (tipo == 'dash') {
                produtos[id].quantidade--;
                if(produtos[id].quantidade < 1){
                    document.getElementById('id'+id).click();
                }

            }
            atualizarTabela();
        });
    }
}

let enviar = document.querySelector('.enviar');
enviar.addEventListener('click', () => {
    let msg = 'Gostaria de fazer o seguinte pedido : \n';
    let total = 0;
    for (const p of produtos) {
        if (p.quantidade > 0) {
            msg += ` ${p.quantidade}  Pizza de ${p.nome} quantidade: ${p.fatias8}gramas = ${p.quantidade * p.fatias8}\n`;
            total += p.quantidade * p.fatias8;
        }
    }
    msg += `Total = ${total}`;
    msg = encodeURI(msg);
    let fone = '61985945661';
    let link = `https://api.whatsapp.com/send?phone=${fone}&text=${msg}`;
    window.open(link);
});