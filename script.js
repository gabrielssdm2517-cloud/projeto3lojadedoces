const trufas = [
  { id: 1, nome: "Trufa de Prestígio", preco: 5.00, img: "imagem/prestigio.jpg" },
  { id: 2, nome: "Trufa de Brigadeiro", preco: 5.00, img: "imagem/brigadeiro.jpg" },
  { id: 3, nome: "Trufa de Maracujá", preco: 5.00, img: "imagem/maracuja.jpg" },
  { id: 4, nome: "Trufa de Morango", preco: 5.00, img: "imagem/morango.jpg" },
  { id: 5, nome: "Trufa de Limão", preco: 5.00, img: "imagem/limao.jpg" },
  { id: 6, nome: "Trufa de Abacaxi", preco: 5.00, img: "imagem/abacaxi.jpg" },
  { id: 7, nome: "Trufa de Ninho", preco: 5.00, img: "imagem/ninho.jpg" },
  { id: 8, nome: "Trufa de Ninho com Nutella", preco: 5.00, img: "imagem/ninhonutella.jpg" },
  { id: 9, nome: "Trufa de Laranja", preco: 5.00, img: "imagem/laranja.jpg" },
  { id: 10, nome: "Trufa de Oreo", preco: 5.00, img: "imagem/oreo.jpg" },
  { id: 15, nome: "Trufa de Doce de Leite", preco: 5.00, img: "imagem/docedeleite.jpg" },
  { id: 16, nome: "Trufa de Ferrero Rocher", preco: 5.00, img: "imagem/abacaxi.jpg" }
];

let carrinho = [];
let produtoSelecionado = null;
let pedidoFinalizado = false;

// RENDERIZAR CARDS DOS PRODUTOS
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;
  
  container.innerHTML = trufas.map(trufa => `
    <div class="card">
      <img src="${trufa.img}" alt="${trufa.nome}">
      <div class="card-content">
        <h2 class="card-title">${trufa.nome}</h2>
        <div class="card-price">R$ ${trufa.preco.toFixed(2).replace('.', ',')}</div>
        <button class="buy-btn" onclick="abrirOpcaoCompra(${trufa.id})">Comprar</button>
      </div>
    </div>
  `).join('');
}

// POPUP DE SELEÇÃO DE QUANTIDADE
function abrirOpcaoCompra(id) {
  produtoSelecionado = trufas.find(item => item.id === id);
  if (!produtoSelecionado) return;

  document.getElementById('buy-title').innerText = produtoSelecionado.nome;
  document.getElementById('buy-price').innerText = `R$ ${produtoSelecionado.preco.toFixed(2).replace('.', ',')}`;
  document.getElementById('buy-quantity').value = 1;
  atualizarSubtotalBuy();

  document.getElementById('buy-modal').style.display = 'flex';
}

function fecharOpcaoCompra() {
  document.getElementById('buy-modal').style.display = 'none';
  produtoSelecionado = null;
}

function alterarQtdCompra(delta) {
  const input = document.getElementById('buy-quantity');
  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  input.value = val;
  atualizarSubtotalBuy();
}

function validarEAtualizarQtdManual() {
  const input = document.getElementById('buy-quantity');
  let val = parseInt(input.value);
  if (isNaN(val) || val < 1) {
    input.value = 1;
  }
  atualizarSubtotalBuy();
}

function atualizarSubtotalBuy() {
  if (!produtoSelecionado) return;
  const input = document.getElementById('buy-quantity');
  const qtd = parseInt(input.value) || 1;
  const subtotal = produtoSelecionado.preco * qtd;
  document.getElementById('buy-subtotal').innerText = `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}`;
}

// ADICIONAR E CONFIRMAR NO CARRINHO
function confirmarAdicaoAoCarrinho() {
  if (!produtoSelecionado) return;

  const input = document.getElementById('buy-quantity');
  const qtd = parseInt(input.value) || 1;

  const itemExistente = carrinho.find(item => item.id === produtoSelecionado.id);
  if (itemExistente) {
    itemExistente.quantidade += qtd;
  } else {
    carrinho.push({ ...produtoSelecionado, quantidade: qtd });
  }

  fecharOpcaoCompra();
  atualizarCarrinho();
  abrirCarrinho();
}

// LÓGICA DE GERENCIAMENTO DO CARRINHO
function removerDoCarrinho(id) {
  carrinho = carrinho.filter(item => item.id !== id);
  atualizarCarrinho();
}

function alterarQuantidadeCarrinho(id, delta) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;

  item.quantidade += delta;
  if (item.quantidade <= 0) {
    removerDoCarrinho(id);
  } else {
    atualizarCarrinho();
  }
}

function alterarQuantidadeManualCarrinho(id, valor) {
  const item = carrinho.find(item => item.id === id);
  if (!item) return;

  let val = parseInt(valor);
  if (isNaN(val) || val <= 0) {
    removerDoCarrinho(id);
  } else {
    item.quantidade = val;
    atualizarCarrinho();
  }
}

function atualizarCarrinho() {
  const cartCount = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalPrice = document.getElementById('cart-total-price');

  const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
  cartCount.textContent = totalItens;

  if (carrinho.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Seu carrinho está vazio.</p>';
    cartTotalPrice.textContent = 'R$ 0,00';
    ocultarPix();
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = carrinho.map(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${item.nome}</strong>
          <div>R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade} = <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong></div>
        </div>
        <div class="cart-item-controls">
          <button onclick="alterarQuantidadeCarrinho(${item.id}, -1)">-</button>
          <input type="number" min="1" value="${item.quantidade}" onchange="alterarQuantidadeManualCarrinho(${item.id}, this.value)">
          <button onclick="alterarQuantidadeCarrinho(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removerDoCarrinho(${item.id})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');

  cartTotalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// COPIAR CHAVE PIX
function copiarPix() {
  const inputPix = document.getElementById('pix-key');
  inputPix.select();
  inputPix.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(inputPix.value);
  alert("Código PIX copiado para a área de transferência!");
}

function abrirCarrinho() {
  document.getElementById('cart-modal').style.display = 'flex';
}

function fecharCarrinho() {
  document.getElementById('cart-modal').style.display = 'none';
  if (pedidoFinalizado) {
    carrinho = [];
    pedidoFinalizado = false;
    ocultarPix();
    atualizarCarrinho();
  }
}

// FINALIZAR PEDIDO E GERAR QRCODE PIX
function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const pixKey = "d19c986e-b2a5-4f30-a19f-05a02b7adb71";
  
  const qrCodeImg = document.getElementById('pix-qrcode');
  qrCodeImg.src = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(pixKey)}`;

  document.getElementById('payment-section').style.display = 'block';

  pedidoFinalizado = true;
  document.getElementById('checkout-btn').innerText = "Pedido Realizado com Sucesso!";
  document.getElementById('checkout-btn').disabled = true;

  alert("Pedido efetuado! Realize o pagamento escaneando o QR Code ou utilizando o PIX Copia e Cola.");
}

function ocultarPix() {
  const paymentSection = document.getElementById('payment-section');
  if (paymentSection) paymentSection.style.display = 'none';
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.innerText = "Finalizar Pedido via PIX";
    checkoutBtn.disabled = false;
  }
}

function mudarTema(tipo) {
  if (tipo === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

// FECHAR MODAIS CLICANDO FORA DELAS
window.onclick = function(event) {
  const buyModal = document.getElementById('buy-modal');
  const cartModal = document.getElementById('cart-modal');
  if (event.target === buyModal) fecharOpcaoCompra();
  if (event.target === cartModal) fecharCarrinho();
};

document.addEventListener('DOMContentLoaded', renderProducts);