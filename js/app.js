/* ════════════════════════════════════════
   ESTADO GLOBAL
   Todos os dados do site ficam aqui.
   São salvos automaticamente no navegador.
════════════════════════════════════════ */
var state = {
  logado:      false,
  senha:       'doceria123',
  wpp:         '5512997555697',
  lojaNome:    'Santa Cozinha',
  lojaSlogan:  'Adoçando vidas desde 2020',
  sobreTexto:  'Somos uma confeitaria artesanal localizada no Vale do Baú, apaixonada por criar doces que tocam o coração. Cada receita é uma herança de família, preparada com ingredientes frescos e muito carinho.',
  produtos: [
    {
      id: 1,
      nome: 'Brigadeiro Gourmet',
      cat: 'Destaque',
      desc: 'Brigadeiro artesanal com cobertura de granulado belga e recheio cremoso. Feito com chocolate 70% cacau.',
      preco: 'R$ 8,00',
      unidade: 'a unidade',
      img: ''
    },
    {
      id: 2,
      nome: 'Trufa de Chocolate',
      cat: 'Trufas',
      desc: 'Trufa recheada com ganache de chocolate amargo, coberta com cacau em pó. Elegante e sofisticada.',
      preco: 'R$ 12,00',
      unidade: 'a unidade',
      img: ''
    },
    {
      id: 3,
      nome: 'Bolo Naked Cake',
      cat: 'Bolos',
      desc: 'Bolo rústico com camadas de massa fofinha, recheio de morangos frescos e chantilly artesanal.',
      preco: 'R$ 180,00',
      unidade: '(20 fatias)',
      img: ''
    },
    {
      id: 4,
      nome: 'Cesta Especial',
      cat: 'Cestas Especiais',
      desc: 'Cesta presenteável com seleção de trufas, brigadeiros e doces finos. Perfeita para presentear.',
      preco: 'R$ 85,00',
      unidade: 'por cesta',
      img: ''
    }
  ],
  nextId: 5
};

/* ─────────────────────────────────────
   SALVAR / CARREGAR (localStorage)
   Os dados ficam guardados no navegador,
   mesmo depois de fechar a página.
───────────────────────────────────── */
function salvarStorage() {
  try {
    localStorage.setItem('santacozinha_v2', JSON.stringify(state));
  } catch (e) {
    console.warn('Não foi possível salvar:', e);
  }
}

function carregarStorage() {
  try {
    var salvo = localStorage.getItem('santacozinha_v2');
    if (salvo) {
      var dados = JSON.parse(salvo);
      // Mescla mantendo a estrutura padrão como base
      Object.assign(state, dados);
    }
  } catch (e) {
    console.warn('Não foi possível carregar dados salvos:', e);
  }
}

// Carrega ao iniciar
carregarStorage();

/* ─────────────────────────────────────
   EMOJI POR CATEGORIA
───────────────────────────────────── */
function categoriaEmoji(cat) {
  var mapa = {
    'Destaque':        '⭐',
    'Brigadeiros':     '🍫',
    'Bolos':           '🎂',
    'Trufas':          '🍬',
    'Cestas Especiais':'🎁',
    'Outros':          '🍭'
  };
  return mapa[cat] || '🍬';
}

/* ─────────────────────────────────────
   RENDERIZAR GRADE DE PRODUTOS
   Monta os cards visíveis no site
───────────────────────────────────── */
function renderProdutos() {
  var grid = document.getElementById('produtos-grid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!state.produtos || !state.produtos.length) {
    grid.innerHTML =
      '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;">' +
      '<div style="font-size:3rem;margin-bottom:1rem;">🍬</div>' +
      '<p style="color:var(--text-light);font-size:.95rem;">Nenhum produto ainda.</p>' +
      '<p style="color:var(--text-light);font-size:.85rem;margin-top:.3rem;">Acesse o painel admin no rodapé para adicionar seus produtos.</p>' +
      '</div>';
    return;
  }

  state.produtos.forEach(function (p) {

    // Imagem ou placeholder
    var imgHtml;
    if (p.img) {
      imgHtml = '<img src="' + p.img + '" alt="' + p.nome + '" loading="lazy">';
    } else {
      imgHtml =
        '<div class="empty-img">' +
          '<span class="ei">' + categoriaEmoji(p.cat) + '</span>' +
          '<span>' + p.cat + '</span>' +
        '</div>';
    }

    // Tag "Destaque"
    var tagHtml = p.cat === 'Destaque'
      ? '<div class="produto-tag">Destaque</div>'
      : '';

    // Link do WhatsApp com mensagem personalizada
    var mensagem = 'Olá! Gostaria de encomendar: *' + p.nome + '*';
    if (p.preco) mensagem += ' (' + p.preco + ' ' + (p.unidade || '') + ')';
    mensagem += '. Pode me ajudar?';
    var wppLink = 'https://wa.me/' + state.wpp + '?text=' + encodeURIComponent(mensagem);

    // Preço
    var precoHtml = '';
    if (p.preco) {
      precoHtml =
        '<div class="produto-preco">' +
          p.preco +
          (p.unidade ? '<small>' + p.unidade + '</small>' : '') +
        '</div>';
    }

    grid.innerHTML +=
      '<div class="produto-card">' +
        '<div class="produto-img">' +
          tagHtml +
          imgHtml +
        '</div>' +
        '<div class="produto-info">' +
          '<div class="produto-nome">' + p.nome + '</div>' +
          (p.desc ? '<div class="produto-desc">' + p.desc + '</div>' : '') +
          '<div class="produto-footer">' +
            precoHtml +
            '<a href="' + wppLink + '" target="_blank" rel="noopener" class="btn-pedir">' +
              '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">' +
                '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>' +
              '</svg> Pedir' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
}

/* ─────────────────────────────────────
   ATUALIZAR LINKS WHATSAPP
───────────────────────────────────── */
function atualizarWppLinks() {
  var msg  = encodeURIComponent('Olá! Gostaria de fazer um pedido. Pode me ajudar?');
  var base = 'https://wa.me/' + state.wpp + '?text=' + msg;
  var els  = ['nav-wpp-btn', 'main-wpp-btn'];
  els.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.href = base;
  });
}

/* ─────────────────────────────────────
   APLICAR CONFIGURAÇÕES NO SITE
───────────────────────────────────── */
function aplicarConfig() {
  // Nome da loja nos logos
  ['nav-logo-text', 'footer-logo-text'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    var partes = state.lojaNome.trim().split(' ');
    if (partes.length > 1) {
      el.innerHTML = partes.slice(0, -1).join(' ') + ' <span>' + partes[partes.length - 1] + '</span>';
    } else {
      el.textContent = state.lojaNome;
    }
  });

  // Texto sobre
  var sobreEl = document.getElementById('sobre-texto');
  if (sobreEl && state.sobreTexto) sobreEl.textContent = state.sobreTexto;
}

/* ─────────────────────────────────────
   ADMIN – ABRIR / FECHAR
───────────────────────────────────── */
function abrirAdmin() {
  document.getElementById('admin-overlay').classList.add('active');
  if (!state.logado) {
    document.getElementById('admin-login').style.display  = '';
    document.getElementById('admin-painel').style.display = 'none';
    // Foca no campo usuário
    setTimeout(function () {
      var u = document.getElementById('login-user');
      if (u) u.focus();
    }, 100);
  } else {
    mostrarPainel();
  }
}

function fecharAdmin() {
  document.getElementById('admin-overlay').classList.remove('active');
}

// Fecha clicando fora do painel
document.addEventListener('click', function (e) {
  var overlay = document.getElementById('admin-overlay');
  if (e.target === overlay) fecharAdmin();
});

/* ─────────────────────────────────────
   LOGIN
───────────────────────────────────── */
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
    document.getElementById('login-pass').focus();
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

/* ─────────────────────────────────────
   ADMIN – ABAS
───────────────────────────────────── */
function abaAdmin(btn, tabId) {
  document.querySelectorAll('.admin-tab').forEach(function (t) { t.classList.remove('active'); });
  document.querySelectorAll('.tab-content').forEach(function (t) { t.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
  if (tabId === 'tab-produtos') renderAdminProdutos();
  if (tabId === 'tab-config')   preencherConfig();
}

/* ─────────────────────────────────────
   ADMIN – LISTA DE PRODUTOS
───────────────────────────────────── */
function renderAdminProdutos() {
  var list = document.getElementById('admin-product-list');

  if (!state.produtos.length) {
    list.innerHTML =
      '<div style="text-align:center;padding:2.5rem 1rem;color:var(--text-light);font-size:.88rem;">' +
      '😊 Você ainda não tem produtos.<br>Clique em <strong>➕ Novo Produto</strong> para começar!' +
      '</div>';
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
          '<span>' + categoriaEmoji(p.cat) + ' ' + p.cat + (p.preco ? ' &nbsp;•&nbsp; ' + p.preco : '') + '</span>' +
        '</div>' +
        '<div class="admin-product-actions">' +
          '<button class="admin-btn secondary sm" onclick="editarProduto(' + p.id + ')">✏️ Editar</button>' +
          '<button class="admin-btn danger sm"    onclick="excluirProduto(' + p.id + ')">🗑️</button>' +
        '</div>' +
      '</div>';
  });
}

/* ─────────────────────────────────────
   ADMIN – EDITAR PRODUTO
   Preenche o formulário com os dados
   do produto escolhido
───────────────────────────────────── */
function editarProduto(id) {
  var p = state.produtos.find(function (x) { return x.id === id; });
  if (!p) return;

  document.getElementById('edit-id').value   = id;
  document.getElementById('p-nome').value    = p.nome    || '';
  document.getElementById('p-cat').value     = p.cat     || 'Destaque';
  document.getElementById('p-desc').value    = p.desc    || '';
  document.getElementById('p-preco').value   = p.preco   || '';
  document.getElementById('p-unidade').value = p.unidade || '';

  // Foto
  var prev     = document.getElementById('p-img-preview');
  var prevWrap = document.getElementById('upload-preview-wrap');
  var placeholder = document.getElementById('upload-placeholder');

  if (p.img) {
    prev.src = p.img;
    prevWrap.style.display    = 'block';
    placeholder.style.display = 'none';
  } else {
    prevWrap.style.display    = 'none';
    placeholder.style.display = 'block';
  }

  document.getElementById('btn-salvar').textContent = '💾 Atualizar Produto';

  // Vai para a aba de edição
  var novoTab = document.querySelector('[onclick*="tab-novo"]');
  abaAdmin(novoTab, 'tab-novo');

  // Rola para o topo do painel
  document.querySelector('.admin-panel').scrollTop = 0;

  notif('Produto carregado para edição!', 'success');
}

/* ─────────────────────────────────────
   ADMIN – EXCLUIR PRODUTO
───────────────────────────────────── */
function excluirProduto(id) {
  var p = state.produtos.find(function (x) { return x.id === id; });
  if (!p) return;
  if (!confirm('Excluir "' + p.nome + '"?\n\nEsta ação não pode ser desfeita.')) return;

  state.produtos = state.produtos.filter(function (x) { return x.id !== id; });
  salvarStorage();
  renderAdminProdutos();
  renderProdutos();
  notif('Produto excluído!', 'error');
}

/* ─────────────────────────────────────
   ADMIN – SALVAR / ATUALIZAR PRODUTO
───────────────────────────────────── */
function salvarProduto() {
  var nome = document.getElementById('p-nome').value.trim();
  if (!nome) {
    notif('⚠️ Informe o nome do produto!', 'error');
    document.getElementById('p-nome').focus();
    return;
  }

  var cat     = document.getElementById('p-cat').value;
  var desc    = document.getElementById('p-desc').value.trim();
  var preco   = document.getElementById('p-preco').value.trim();
  var unidade = document.getElementById('p-unidade').value.trim();
  var editId  = parseInt(document.getElementById('edit-id').value) || 0;

  // Imagem
  var prev = document.getElementById('p-img-preview');
  var img  = (prev && prev.src && prev.style.display !== 'none') ? prev.src : '';
  // Garante que não salvamos o caminho absoluto vazio
  if (img && img.indexOf('data:') !== 0 && img.indexOf('http') !== 0 && img.indexOf('assets/') !== 0) {
    img = '';
  }

  if (editId) {
    // Atualiza produto existente
    var idx = state.produtos.findIndex(function (x) { return x.id === editId; });
    if (idx > -1) {
      state.produtos[idx] = { id: editId, nome: nome, cat: cat, desc: desc, preco: preco, unidade: unidade, img: img };
    }
    notif('✅ Produto atualizado!', 'success');
  } else {
    // Adiciona novo produto
    state.produtos.push({ id: state.nextId++, nome: nome, cat: cat, desc: desc, preco: preco, unidade: unidade, img: img });
    notif('✅ Produto salvo com sucesso!', 'success');
  }

  salvarStorage();
  renderProdutos();
  limparForm();

  // Volta para a lista de produtos
  var prodTab = document.querySelector('[onclick*="tab-produtos"]');
  abaAdmin(prodTab, 'tab-produtos');
}

/* ─────────────────────────────────────
   LIMPAR FORMULÁRIO
───────────────────────────────────── */
function limparForm() {
  document.getElementById('edit-id').value   = '';
  document.getElementById('p-nome').value    = '';
  document.getElementById('p-cat').value     = 'Destaque';
  document.getElementById('p-desc').value    = '';
  document.getElementById('p-preco').value   = '';
  document.getElementById('p-unidade').value = '';
  document.getElementById('p-img-input').value = '';
  document.getElementById('btn-salvar').textContent = '💾 Salvar Produto';

  var prev        = document.getElementById('p-img-preview');
  var prevWrap    = document.getElementById('upload-preview-wrap');
  var placeholder = document.getElementById('upload-placeholder');
  if (prev)        { prev.src = ''; }
  if (prevWrap)    { prevWrap.style.display = 'none'; }
  if (placeholder) { placeholder.style.display = 'block'; }
}

/* ─────────────────────────────────────
   PREVIEW DA IMAGEM NO FORMULÁRIO
───────────────────────────────────── */
function previewImg(input) {
  if (!input.files || !input.files[0]) return;

  var file = input.files[0];

  // Verifica tamanho (máx 5MB)
  if (file.size > 5 * 1024 * 1024) {
    notif('⚠️ Foto muito grande! Use uma imagem menor que 5MB.', 'error');
    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    var prev        = document.getElementById('p-img-preview');
    var prevWrap    = document.getElementById('upload-preview-wrap');
    var placeholder = document.getElementById('upload-placeholder');

    prev.src = e.target.result;
    prevWrap.style.display    = 'block';
    placeholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

/* ─────────────────────────────────────
   PREENCHER ABA DE CONFIGURAÇÕES
───────────────────────────────────── */
function preencherConfig() {
  document.getElementById('cfg-nome').value   = state.lojaNome   || '';
  document.getElementById('cfg-slogan').value = state.lojaSlogan || '';
  document.getElementById('cfg-sobre').value  = state.sobreTexto || '';
  document.getElementById('cfg-wpp').value    = state.wpp        || '';
}

/* ─────────────────────────────────────
   SALVAR CONFIGURAÇÕES
───────────────────────────────────── */
function salvarConfig() {
  state.lojaNome   = document.getElementById('cfg-nome').value.trim()   || 'Santa Cozinha';
  state.lojaSlogan = document.getElementById('cfg-slogan').value.trim();
  state.sobreTexto = document.getElementById('cfg-sobre').value.trim();
  state.wpp        = document.getElementById('cfg-wpp').value.trim().replace(/\D/g, '');

  salvarStorage();
  aplicarConfig();
  atualizarWppLinks();
  renderProdutos(); // Atualiza links do WhatsApp nos produtos
  notif('✅ Configurações salvas!', 'success');
}

/* ─────────────────────────────────────
   ALTERAR SENHA
───────────────────────────────────── */
function alterarSenha() {
  var nova = document.getElementById('cfg-nova-senha').value;
  var conf = document.getElementById('cfg-conf-senha').value;

  if (!nova)           { notif('⚠️ Digite a nova senha!', 'error'); return; }
  if (nova !== conf)   { notif('⚠️ As senhas não coincidem!', 'error'); return; }
  if (nova.length < 4) { notif('⚠️ Senha muito curta (mínimo 4 caracteres)!', 'error'); return; }

  state.senha = nova;
  salvarStorage();
  document.getElementById('cfg-nova-senha').value = '';
  document.getElementById('cfg-conf-senha').value = '';
  notif('✅ Senha alterada com sucesso!', 'success');
}

/* ─────────────────────────────────────
   NOTIFICAÇÃO (toast)
───────────────────────────────────── */
var notifTimer = null;
function notif(msg, tipo) {
  var el = document.getElementById('notif');
  if (!el) return;
  el.textContent = msg;
  el.className = 'notif show ' + (tipo || '');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(function () { el.className = 'notif'; }, 3500);
}

/* ─────────────────────────────────────
   INICIALIZAÇÃO
   Roda quando a página carrega
───────────────────────────────────── */
renderProdutos();
atualizarWppLinks();
aplicarConfig();