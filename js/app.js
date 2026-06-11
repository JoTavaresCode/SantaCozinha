/* ════════════════════════════
   ESTADO GLOBAL
════════════════════════════ */
var state = {
  logado: false,
  senha: 'doceria123',
  wpp: '5511999999999',
  lojaNome: 'Doce Arte',
  lojaSlogan: 'Feito com amor',
  sobreTexto: 'Somos uma confeitaria artesanal apaixonada por criar doces que tocam o coração. Cada receita é uma herança de família, preparada com ingredientes frescos e muito carinho.',
  produtos: [
    { id: 1, nome: 'Brigadeiro Gourmet',  cat: 'Destaque',    desc: 'Brigadeiro artesanal com cobertura de granulado belga e recheio cremoso. Feito com chocolate 70% cacau.',                  preco: 'R$ 8,00',   unidade: 'a unidade',       img: '' },
    { id: 2, nome: 'Trufa de Chocolate',  cat: 'Trufas',      desc: 'Trufa recheada com ganache de chocolate amargo, coberta com cacau em pó. Elegante e sofisticada.',                         preco: 'R$ 12,00',  unidade: 'a unidade',       img: '' },
    { id: 3, nome: 'Bolo Naked Cake',     cat: 'Bolos',       desc: 'Bolo rústico com camadas de massa fofinha, recheio de morangos frescos e chantilly artesanal.',                            preco: 'R$ 180,00', unidade: '(20 fatias)',     img: '' },
    { id: 4, nome: 'Caixa de Trufas',     cat: 'Destaque',    desc: 'Caixa especial com 12 trufas sortidas, embalagem presenteável. Perfeita para presentear.',                                 preco: 'R$ 85,00',  unidade: 'caixa com 12',   img: '' }
  ],
  nextId: 5
};

/* ── Salvar / Carregar localStorage ── */
function salvarStorage() {
  try { localStorage.setItem('doceria_state', JSON.stringify(state)); } catch (e) {}
}

function carregarStorage() {
  try {
    var s = localStorage.getItem('doceria_state');
    if (s) Object.assign(state, JSON.parse(s));
  } catch (e) {}
}

carregarStorage();

/* ════════════════════════════
   RENDER PRODUTOS (vitrine)
════════════════════════════ */
function renderProdutos() {
  var grid = document.getElementById('produtos-grid');
  grid.innerHTML = '';

  if (!state.produtos.length) {
    grid.innerHTML = '<p style="text-align:center;color:var(--text-light);grid-column:1/-1;padding:3rem;">Nenhum produto cadastrado. Acesse o painel admin para adicionar!</p>';
    return;
  }

  state.produtos.forEach(function (p) {
    var imgHtml = p.img
      ? '<img src="' + p.img + '" alt="' + p.nome + '">'
      : '<div class="empty-img"><span class="ei">' + categoriaEmoji(p.cat) + '</span><span>' + p.cat + '</span></div>';

    var tagHtml = p.cat === 'Destaque' ? '<div class="produto-tag">Destaque</div>' : '';

    var wppMsg  = encodeURIComponent('Olá! Quero encomendar: *' + p.nome + '* (' + p.preco + ' ' + p.unidade + '). Pode me ajudar?');
    var wppLink = 'https://wa.me/' + state.wpp + '?text=' + wppMsg;

    grid.innerHTML +=
      '<div class="produto-card">' +
        '<div class="produto-img">' + tagHtml + imgHtml + '</div>' +
        '<div class="produto-info">' +
          '<div class="produto-nome">' + p.nome + '</div>' +
          '<div class="produto-desc">' + p.desc + '</div>' +
          '<div class="produto-footer">' +
            '<div class="produto-preco">' + p.preco + '<small>' + p.unidade + '</small></div>' +
            '<a href="' + wppLink + '" target="_blank" class="btn-pedir">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">' +
                '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
              '</svg> Pedir' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
}

function categoriaEmoji(cat) {
  var m = { Brigadeiros: '🍫', Bolos: '🎂', Trufas: '🍬', Destaque: '⭐', Outros: '🍭' };
  return m[cat] || '🍬';
}

/* ════════════════════════════
   WHATSAPP
════════════════════════════ */
function atualizarWppLinks() {
  var msg  = encodeURIComponent('Olá! Gostaria de fazer um pedido. Pode me ajudar?');
  var base = 'https://wa.me/' + state.wpp + '?text=' + msg;
  var navBtn  = document.getElementById('nav-wpp-btn');
  var mainBtn = document.getElementById('main-wpp-btn');
  if (navBtn)  navBtn.href  = base;
  if (mainBtn) mainBtn.href = base;
}

/* ════════════════════════════
   ADMIN – abrir / fechar
════════════════════════════ */
function abrirAdmin() {
  document.getElementById('admin-overlay').classList.add('active');
  if (!state.logado) {
    document.getElementById('admin-login').style.display  = '';
    document.getElementById('admin-painel').style.display = 'none';
  } else {
    mostrarPainel();
  }
}

function fecharAdmin() {
  document.getElementById('admin-overlay').classList.remove('active');
}

/* ════════════════════════════
   LOGIN
════════════════════════════ */
function fazerLogin() {
  var u   = document.getElementById('login-user').value.trim();
  var p   = document.getElementById('login-pass').value;
  var err = document.getElementById('login-error');

  if (u === 'admin' && p === state.senha) {
    err.classList.remove('show');
    state.logado = true;
    mostrarPainel();
  } else {
    err.classList.add('show');
    document.getElementById('login-pass').value = '';
  }
}

function mostrarPainel() {
  document.getElementById('admin-login').style.display  = 'none';
  document.getElementById('admin-painel').style.display = '';
  renderAdminProdutos();
  preencherConfig();
}

function sair() {
  state.logado = false;
  fecharAdmin();
}

/* ════════════════════════════
   ADMIN – abas
════════════════════════════ */
function abaAdmin(btn, tabId) {
  document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function (t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
  if (tabId === 'tab-produtos') renderAdminProdutos();
  if (tabId === 'tab-config')   preencherConfig();
}

/* ════════════════════════════
   ADMIN – lista de produtos
════════════════════════════ */
function renderAdminProdutos() {
  var list = document.getElementById('admin-product-list');

  if (!state.produtos.length) {
    list.innerHTML = '<p style="color:var(--text-light);font-size:.85rem;text-align:center;padding:2rem;">Nenhum produto ainda. Clique em "Novo Produto" para começar!</p>';
    return;
  }

  list.innerHTML = '';
  state.produtos.forEach(function (p) {
    var thumbHtml = p.img
      ? '<img class="admin-product-thumb" src="' + p.img + '" alt="' + p.nome + '">'
      : '<div class="admin-product-thumb empty">' + categoriaEmoji(p.cat) + '</div>';

    list.innerHTML +=
      '<div class="admin-product-item" id="aprod-' + p.id + '">' +
        thumbHtml +
        '<div class="admin-product-info">' +
          '<strong>' + p.nome + '</strong>' +
          '<span>' + p.cat + ' • ' + p.preco + '</span>' +
        '</div>' +
        '<div class="admin-product-actions">' +
          '<button class="admin-btn secondary" style="padding:.35rem .8rem;font-size:.73rem;" onclick="editarProduto(' + p.id + ')">✏️ Editar</button>' +
          '<button class="admin-btn danger"    style="padding:.35rem .8rem;font-size:.73rem;" onclick="excluirProduto(' + p.id + ')">🗑️</button>' +
        '</div>' +
      '</div>';
  });
}

/* ════════════════════════════
   ADMIN – editar / excluir
════════════════════════════ */
function editarProduto(id) {
  var p = state.produtos.find(function (x) { return x.id === id; });
  if (!p) return;

  document.getElementById('edit-id').value    = id;
  document.getElementById('p-nome').value     = p.nome;
  document.getElementById('p-cat').value      = p.cat;
  document.getElementById('p-desc').value     = p.desc;
  document.getElementById('p-preco').value    = p.preco;
  document.getElementById('p-unidade').value  = p.unidade;

  var prev = document.getElementById('p-img-preview');
  if (p.img) { prev.src = p.img; prev.style.display = 'block'; }

  document.getElementById('btn-salvar').textContent = '💾 Atualizar Produto';
  var novoTab = document.querySelector('[onclick*="tab-novo"]');
  abaAdmin(novoTab, 'tab-novo');
  notif('Produto carregado para edição!', 'success');
}

function excluirProduto(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;
  state.produtos = state.produtos.filter(function (x) { return x.id !== id; });
  salvarStorage();
  renderAdminProdutos();
  renderProdutos();
  notif('Produto excluído!', 'error');
}

/* ════════════════════════════
   ADMIN – salvar produto
════════════════════════════ */
function salvarProduto() {
  var nome = document.getElementById('p-nome').value.trim();
  if (!nome) { notif('Informe o nome do produto!', 'error'); return; }

  var cat     = document.getElementById('p-cat').value;
  var desc    = document.getElementById('p-desc').value.trim();
  var preco   = document.getElementById('p-preco').value.trim();
  var unidade = document.getElementById('p-unidade').value.trim();
  var prevEl  = document.getElementById('p-img-preview');
  var img     = (prevEl.style.display !== 'none' && prevEl.src) ? prevEl.src : '';
  var editId  = parseInt(document.getElementById('edit-id').value);

  if (editId) {
    var idx = state.produtos.findIndex(function (x) { return x.id === editId; });
    if (idx > -1) state.produtos[idx] = { id: editId, nome: nome, cat: cat, desc: desc, preco: preco, unidade: unidade, img: img };
    notif('Produto atualizado!', 'success');
  } else {
    state.produtos.push({ id: state.nextId++, nome: nome, cat: cat, desc: desc, preco: preco, unidade: unidade, img: img });
    notif('Produto salvo com sucesso!', 'success');
  }

  salvarStorage();
  renderProdutos();
  limparForm();
  var prodTab = document.querySelector('[onclick*="tab-produtos"]');
  abaAdmin(prodTab, 'tab-produtos');
}

function limparForm() {
  document.getElementById('edit-id').value   = '';
  document.getElementById('p-nome').value    = '';
  document.getElementById('p-cat').value     = 'Destaque';
  document.getElementById('p-desc').value    = '';
  document.getElementById('p-preco').value   = '';
  document.getElementById('p-unidade').value = '';
  var prev = document.getElementById('p-img-preview');
  prev.src = ''; prev.style.display = 'none';
  document.getElementById('p-img-input').value = '';
  document.getElementById('btn-salvar').textContent = '💾 Salvar Produto';
}

/* ════════════════════════════
   ADMIN – upload de imagem
════════════════════════════ */
function previewImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var prev = document.getElementById('p-img-preview');
      prev.src = e.target.result;
      prev.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

/* ════════════════════════════
   ADMIN – configurações
════════════════════════════ */
function preencherConfig() {
  document.getElementById('cfg-nome').value   = state.lojaNome   || '';
  document.getElementById('cfg-slogan').value = state.lojaSlogan || '';
  document.getElementById('cfg-sobre').value  = state.sobreTexto || '';
  document.getElementById('cfg-wpp').value    = state.wpp        || '';
}

function salvarConfig() {
  state.lojaNome   = document.getElementById('cfg-nome').value.trim()   || 'Doce Arte';
  state.lojaSlogan = document.getElementById('cfg-slogan').value.trim();
  state.sobreTexto = document.getElementById('cfg-sobre').value.trim();
  state.wpp        = document.getElementById('cfg-wpp').value.trim().replace(/\D/g, '');
  salvarStorage();
  aplicarConfig();
  atualizarWppLinks();
  notif('Configurações salvas!', 'success');
}

function alterarSenha() {
  var nova = document.getElementById('cfg-nova-senha').value;
  var conf = document.getElementById('cfg-conf-senha').value;
  if (!nova)           { notif('Digite a nova senha!', 'error'); return; }
  if (nova !== conf)   { notif('As senhas não coincidem!', 'error'); return; }
  if (nova.length < 4) { notif('Senha muito curta (mínimo 4 caracteres)!', 'error'); return; }
  state.senha = nova;
  salvarStorage();
  document.getElementById('cfg-nova-senha').value = '';
  document.getElementById('cfg-conf-senha').value = '';
  notif('Senha alterada com sucesso!', 'success');
}

function aplicarConfig() {
  ['nav-logo-text', 'footer-logo-text'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var parts = state.lojaNome.split(' ');
    el.innerHTML = parts.length > 1
      ? parts.slice(0, -1).join(' ') + ' <span>' + parts[parts.length - 1] + '</span>'
      : state.lojaNome;
  });
  var sobreEl = document.getElementById('sobre-texto');
  if (sobreEl && state.sobreTexto) sobreEl.textContent = state.sobreTexto;
}

/* ════════════════════════════
   NOTIFICAÇÃO TOAST
════════════════════════════ */
function notif(msg, tipo) {
  var el = document.getElementById('notif');
  el.textContent = msg;
  el.className = 'notif show ' + (tipo || '');
  setTimeout(function () { el.className = 'notif'; }, 3000);
}

/* ════════════════════════════
   INICIALIZAÇÃO
════════════════════════════ */
renderProdutos();
atualizarWppLinks();
aplicarConfig();