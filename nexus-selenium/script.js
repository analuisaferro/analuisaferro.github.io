/**
 * NEXUS — Social Network
 * Arquivo: script.js
 * Descrição: Controle de sessão, autenticação, posts e persistência via localStorage.
 * Adequado para testes E2E com Selenium.
 */

'use strict';

/* ================================================
   CONSTANTES E CONFIGURAÇÕES
   ================================================ */

/** Credenciais fixas de login */
const CREDENTIALS = {
  admin: '123'
};

/** Chaves usadas no localStorage */
const STORAGE_KEYS = {
  SESSION: 'nexus_session',
  POSTS:   'nexus_posts'
};

/* ================================================
   UTILITÁRIOS
   ================================================ */

/**
 * Salva um valor serializado no localStorage.
 * @param {string} key
 * @param {*} value
 */
function storageSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('[Nexus] Falha ao salvar no localStorage:', e);
  }
}

/**
 * Carrega e desserializa um valor do localStorage.
 * @param {string} key
 * @returns {*|null}
 */
function storageLoad(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('[Nexus] Falha ao carregar do localStorage:', e);
    return null;
  }
}

/**
 * Remove um item do localStorage.
 * @param {string} key
 */
function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('[Nexus] Falha ao remover do localStorage:', e);
  }
}

/**
 * Formata um timestamp ISO em data/hora legível (pt-BR).
 * @param {string} isoString
 * @returns {string}
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Sanitiza texto para exibição segura no DOM.
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

/**
 * Gera um ID único para posts.
 * @returns {string}
 */
function generateId() {
  return 'post_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
}

/* ================================================
   MÓDULO DE SESSÃO
   ================================================ */

const SessionManager = {
  /**
   * Retorna o usuário logado ou null.
   * @returns {{ username: string }|null}
   */
  get() {
    return storageLoad(STORAGE_KEYS.SESSION);
  },

  /**
   * Cria a sessão para o usuário.
   * @param {string} username
   */
  create(username) {
    storageSave(STORAGE_KEYS.SESSION, { username });
  },

  /**
   * Encerra a sessão.
   */
  destroy() {
    storageRemove(STORAGE_KEYS.SESSION);
  },

  /**
   * Verifica se há uma sessão ativa.
   * @returns {boolean}
   */
  isActive() {
    const session = this.get();
    return session !== null && typeof session.username === 'string' && session.username.length > 0;
  }
};

/* ================================================
   MÓDULO DE POSTS
   ================================================ */

const PostsManager = {
  /**
   * Carrega todos os posts do localStorage.
   * @returns {Array<Object>}
   */
  getAll() {
    const posts = storageLoad(STORAGE_KEYS.POSTS);
    return Array.isArray(posts) ? posts : [];
  },

  /**
   * Persiste a lista de posts no localStorage.
   * @param {Array<Object>} posts
   */
  saveAll(posts) {
    storageSave(STORAGE_KEYS.POSTS, posts);
  },

  /**
   * Adiciona um novo post.
   * @param {string} username
   * @param {string} content
   * @returns {Object} O post criado.
   */
  add(username, content) {
    const post = {
      id:        generateId(),
      username:  username,
      content:   content.trim(),
      createdAt: new Date().toISOString(),
      likes:     0,
      likedBy:   []
    };
    const posts = this.getAll();
    posts.unshift(post); // mais recente primeiro
    this.saveAll(posts);
    return post;
  },

  /**
   * Conta os posts de um usuário específico.
   * @param {string} username
   * @returns {number}
   */
  countByUser(username) {
    return this.getAll().filter(p => p.username === username).length;
  },

  /**
   * Toggle like em um post.
   * @param {string} postId
   * @param {string} username
   * @returns {Object|null} Post atualizado ou null.
   */
  toggleLike(postId, username) {
    const posts = this.getAll();
    const post = posts.find(p => p.id === postId);
    if (!post) return null;

    if (!Array.isArray(post.likedBy)) post.likedBy = [];

    const idx = post.likedBy.indexOf(username);
    if (idx === -1) {
      post.likedBy.push(username);
      post.likes = post.likedBy.length;
    } else {
      post.likedBy.splice(idx, 1);
      post.likes = post.likedBy.length;
    }
    this.saveAll(posts);
    return post;
  }
};

/* ================================================
   MÓDULO DE AUTENTICAÇÃO
   ================================================ */

const Auth = {
  /**
   * Valida credenciais de login.
   * @param {string} username
   * @param {string} password
   * @returns {{ success: boolean, error?: string }}
   */
  login(username, password) {
    if (!username || !password) {
      return { success: false, error: 'Preencha todos os campos.' };
    }

    const normalizedUser = username.trim().toLowerCase();
    const expectedPassword = CREDENTIALS[normalizedUser];

    if (expectedPassword === undefined || expectedPassword !== password) {
      return { success: false, error: 'Usuário ou senha inválidos.' };
    }

    SessionManager.create(normalizedUser);
    return { success: true };
  },

  /**
   * Encerra a sessão do usuário.
   */
  logout() {
    SessionManager.destroy();
  }
};

/* ================================================
   MÓDULO DE UI — LOGIN
   ================================================ */

const LoginUI = {
  usernameInput:  null,
  passwordInput:  null,
  loginBtn:       null,
  errorBanner:    null,
  errorMsg:       null,
  togglePwBtn:    null,

  /**
   * Inicializa os elementos e eventos da tela de login.
   */
  init() {
    this.usernameInput = document.getElementById('username');
    this.passwordInput = document.getElementById('password');
    this.loginBtn      = document.getElementById('loginBtn');
    this.errorBanner   = document.getElementById('loginError');
    this.errorMsg      = document.getElementById('loginErrorMsg');
    this.togglePwBtn   = document.getElementById('togglePassword');

    this.loginBtn.addEventListener('click', () => this.handleLogin());
    this.togglePwBtn.addEventListener('click', () => this.togglePasswordVisibility());

    // Submeter com Enter
    [this.usernameInput, this.passwordInput].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.handleLogin();
      });
    });

    // Limpar erro ao digitar
    [this.usernameInput, this.passwordInput].forEach(input => {
      input.addEventListener('input', () => this.hideError());
    });
  },

  /**
   * Processa o login ao clicar no botão.
   */
  handleLogin() {
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;

    const result = Auth.login(username, password);

    if (result.success) {
      this.hideError();
      AppRouter.showApp(username.trim().toLowerCase());
    } else {
      this.showError(result.error);
    }
  },

  /**
   * Exibe a mensagem de erro no banner.
   * @param {string} message
   */
  showError(message) {
    this.errorMsg.textContent = message;
    this.errorBanner.style.display = 'flex';
    this.usernameInput.setAttribute('aria-invalid', 'true');
    this.passwordInput.setAttribute('aria-invalid', 'true');
  },

  /**
   * Oculta o banner de erro.
   */
  hideError() {
    this.errorBanner.style.display = 'none';
    this.usernameInput.removeAttribute('aria-invalid');
    this.passwordInput.removeAttribute('aria-invalid');
  },

  /**
   * Alterna a visibilidade do campo de senha.
   */
  togglePasswordVisibility() {
    const isPassword = this.passwordInput.type === 'password';
    this.passwordInput.type = isPassword ? 'text' : 'password';
    this.togglePwBtn.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
  },

  /**
   * Limpa os campos do formulário.
   */
  reset() {
    this.usernameInput.value = '';
    this.passwordInput.value = '';
    this.hideError();
  }
};

/* ================================================
   MÓDULO DE UI — FEED / APP
   ================================================ */

const AppUI = {
  currentUser: null,

  // Elementos
  feedList:      null,
  emptyFeed:     null,
  postInput:     null,
  postBtn:       null,
  charCounter:   null,
  postError:     null,
  postCount:     null,
  feedMeta:      null,

  /**
   * Inicializa os elementos e eventos da área principal do app.
   * @param {string} username
   */
  init(username) {
    this.currentUser = username;

    // Elementos do feed
    this.feedList    = document.getElementById('feed');
    this.emptyFeed   = document.getElementById('emptyFeed');
    this.postInput   = document.getElementById('postInput');
    this.postBtn     = document.getElementById('postBtn');
    this.charCounter = document.getElementById('charCounter');
    this.postError   = document.getElementById('postError');
    this.postCount   = document.getElementById('postCount');
    this.feedMeta    = document.getElementById('feedMeta');

    // Preencher dados do usuário na interface
    this.updateUserDisplays(username);

    // Eventos de criação de post
    this.postInput.addEventListener('input', () => this.handleTextareaInput());
    this.postBtn.addEventListener('click', () => this.handlePublish());
    this.postInput.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') this.handlePublish();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => AppRouter.logout());

    // Links de navegação (simulados)
    document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Simula navegação sem redirecionamento real
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const clicked = e.currentTarget;
        if (clicked.classList.contains('nav-link')) {
          clicked.classList.add('active');
        }
      });
    });

    // Botões de seguir
    document.querySelectorAll('.btn-follow').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('following');
        btn.textContent = btn.classList.contains('following') ? 'Seguindo' : 'Seguir';
      });
    });

    // Renderizar feed inicial
    this.renderFeed();
  },

  /**
   * Atualiza os elementos de exibição do usuário logado.
   * @param {string} username
   */
  updateUserDisplays(username) {
    const initial = username.charAt(0).toUpperCase();
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    // Header
    const headerUserName = document.getElementById('headerUserName');
    const headerAvatar   = document.getElementById('headerAvatar');
    if (headerUserName) headerUserName.textContent = displayName;
    if (headerAvatar)   headerAvatar.textContent   = initial;

    // Sidebar esquerda
    const sidebarUserName = document.getElementById('sidebarUserName');
    const sidebarAvatar   = document.getElementById('sidebarAvatar');
    const sidebarHandle   = document.getElementById('sidebarHandle');
    if (sidebarUserName) sidebarUserName.textContent = displayName;
    if (sidebarAvatar)   sidebarAvatar.textContent   = initial;
    if (sidebarHandle)   sidebarHandle.textContent   = '@' + username;

    // Avatar na área de criação de post
    const createAvatar = document.getElementById('createAvatar');
    if (createAvatar) createAvatar.textContent = initial;

    // Atualizar contagem de posts
    this.updatePostCount();
  },

  /**
   * Atualiza o contador de posts do usuário.
   */
  updatePostCount() {
    if (this.postCount) {
      this.postCount.textContent = PostsManager.countByUser(this.currentUser);
    }
  },

  /**
   * Manipula o input na textarea de criação de post.
   */
  handleTextareaInput() {
    const len = this.postInput.value.length;
    const max = 500;

    this.charCounter.textContent = `${len}/${max}`;
    this.charCounter.classList.remove('warn', 'limit');

    if (len >= max) {
      this.charCounter.classList.add('limit');
    } else if (len >= max * 0.8) {
      this.charCounter.classList.add('warn');
    }

    this.postBtn.disabled = len === 0;

    if (len > 0) {
      this.hidePostError();
    }
  },

  /**
   * Processa a publicação de um novo post.
   */
  handlePublish() {
    const content = this.postInput.value.trim();

    if (!content) {
      this.showPostError();
      this.postInput.focus();
      return;
    }

    this.hidePostError();

    const post = PostsManager.add(this.currentUser, content);

    // Limpar textarea
    this.postInput.value = '';
    this.charCounter.textContent = '0/500';
    this.charCounter.classList.remove('warn', 'limit');
    this.postBtn.disabled = true;

    // Inserir post no topo do feed
    this.prependPostCard(post);
    this.updatePostCount();
    this.updateFeedMeta();

    // Esconder mensagem de feed vazio
    this.emptyFeed.style.display = 'none';
  },

  /**
   * Exibe o erro de post vazio.
   */
  showPostError() {
    this.postError.style.display = 'block';
  },

  /**
   * Oculta o erro de post vazio.
   */
  hidePostError() {
    this.postError.style.display = 'none';
  },

  /**
   * Renderiza todos os posts do feed a partir do localStorage.
   */
  renderFeed() {
    const posts = PostsManager.getAll();
    this.feedList.innerHTML = '';

    if (posts.length === 0) {
      this.emptyFeed.style.display = 'flex';
      this.updateFeedMeta(0);
      return;
    }

    this.emptyFeed.style.display = 'none';
    posts.forEach(post => this.appendPostCard(post));
    this.updateFeedMeta(posts.length);
  },

  /**
   * Adiciona um card de post ao FINAL da lista (usado na renderização inicial).
   * @param {Object} post
   */
  appendPostCard(post) {
    const card = this.buildPostCard(post);
    this.feedList.appendChild(card);
  },

  /**
   * Insere um card de post no INÍCIO da lista (usado ao publicar).
   * @param {Object} post
   */
  prependPostCard(post) {
    const card = this.buildPostCard(post);
    this.feedList.prepend(card);
  },

  /**
   * Constrói o elemento DOM de um card de post.
   * @param {Object} post
   * @returns {HTMLElement}
   */
  buildPostCard(post) {
    const initial = post.username.charAt(0).toUpperCase();
    const displayName = post.username.charAt(0).toUpperCase() + post.username.slice(1);
    const isLiked = Array.isArray(post.likedBy) && post.likedBy.includes(this.currentUser);

    const card = document.createElement('article');
    card.className = 'post-card';
    card.setAttribute('data-post-id', post.id);
    card.setAttribute('data-testid', 'post-card');
    card.setAttribute('aria-label', `Post de ${displayName}`);

    card.innerHTML = `
      <div class="post-meta">
        <div class="post-avatar">${escapeHtml(initial)}</div>
        <div class="post-author-info">
          <span class="post-author-name" data-testid="post-author">${escapeHtml(displayName)}</span>
          <span class="post-author-handle">@${escapeHtml(post.username)}</span>
        </div>
        <time class="post-timestamp" datetime="${escapeHtml(post.createdAt)}">${formatDate(post.createdAt)}</time>
      </div>
      <p class="post-content" data-testid="post-content">${escapeHtml(post.content)}</p>
      <div class="post-actions-bar">
        <button
          class="post-action-btn ${isLiked ? 'liked' : ''}"
          type="button"
          data-action="like"
          data-post-id="${escapeHtml(post.id)}"
          aria-label="Curtir post"
          aria-pressed="${isLiked ? 'true' : 'false'}"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span data-testid="like-count">${post.likes || 0}</span>
        </button>
        <button class="post-action-btn" type="button" data-action="comment" aria-label="Comentar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Comentar
        </button>
        <button class="post-action-btn" type="button" data-action="share" aria-label="Compartilhar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Compartilhar
        </button>
      </div>
    `;

    // Evento de curtir
    card.querySelector('[data-action="like"]').addEventListener('click', (e) => {
      this.handleLike(e.currentTarget, post.id);
    });

    return card;
  },

  /**
   * Processa o clique no botão de like.
   * @param {HTMLElement} btn
   * @param {string} postId
   */
  handleLike(btn, postId) {
    const updatedPost = PostsManager.toggleLike(postId, this.currentUser);
    if (!updatedPost) return;

    const isLiked = updatedPost.likedBy.includes(this.currentUser);
    const svgPath = btn.querySelector('path');
    const countEl = btn.querySelector('[data-testid="like-count"]');

    btn.classList.toggle('liked', isLiked);
    btn.setAttribute('aria-pressed', String(isLiked));

    if (svgPath) svgPath.setAttribute('fill', isLiked ? 'currentColor' : 'none');
    if (countEl) countEl.textContent = updatedPost.likes;
  },

  /**
   * Atualiza o texto de metadados do feed.
   * @param {number} [count]
   */
  updateFeedMeta(count) {
    if (!this.feedMeta) return;
    const total = count !== undefined ? count : PostsManager.getAll().length;
    if (total === 0) {
      this.feedMeta.textContent = 'Nenhuma publicação ainda';
    } else if (total === 1) {
      this.feedMeta.textContent = '1 publicação';
    } else {
      this.feedMeta.textContent = `${total} publicações`;
    }
  },

  /**
   * Reseta o estado da UI do app.
   */
  reset() {
    this.currentUser = null;
    if (this.feedList) this.feedList.innerHTML = '';
    if (this.postInput) this.postInput.value = '';
    if (this.charCounter) this.charCounter.textContent = '0/500';
    if (this.postBtn) this.postBtn.disabled = true;
    this.hidePostError();
  }
};

/* ================================================
   ROTEADOR DA APLICAÇÃO
   ================================================ */

const AppRouter = {
  loginScreen: null,
  appScreen:   null,

  /**
   * Inicializa o roteador e decide qual tela exibir.
   */
  init() {
    this.loginScreen = document.getElementById('loginScreen');
    this.appScreen   = document.getElementById('appScreen');

    LoginUI.init();

    // Verificar sessão existente
    if (SessionManager.isActive()) {
      const session = SessionManager.get();
      this.showApp(session.username);
    } else {
      this.showLogin();
    }
  },

  /**
   * Exibe a tela de login.
   */
  showLogin() {
    this.appScreen.style.display  = 'none';
    this.loginScreen.style.display = 'block';
    LoginUI.reset();
    document.title = 'Nexus — Entrar';
  },

  /**
   * Exibe a área principal do app para o usuário logado.
   * @param {string} username
   */
  showApp(username) {
    this.loginScreen.style.display = 'none';
    this.appScreen.style.display   = 'block';
    AppUI.init(username);
    document.title = `Nexus — @${username}`;
  },

  /**
   * Realiza o logout e retorna à tela de login.
   */
  logout() {
    Auth.logout();
    AppUI.reset();
    this.showLogin();
  }
};

/* ================================================
   INICIALIZAÇÃO
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  AppRouter.init();
});