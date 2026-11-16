/* ============================================================
   Joker｜笔记 —— 交互逻辑（原生 JS，零依赖）
   ============================================================ */

/* ---------- 主题切换 ---------- */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

/* ---------- 移动端菜单 ---------- */
function toggleMenu() {
  document.getElementById("navMenu")?.classList.toggle("open");
}

/* ---------- 打字机 ---------- */
function typeWriter(el, phrases, i = 0, j = 0, deleting = false) {
  if (!el) return;
  const phrase = phrases[i];
  el.textContent = phrase.slice(0, j);
  let delay = deleting ? 60 : 130;
  if (!deleting && j === phrase.length) { delay = 1600; deleting = true; }
  else if (deleting && j === 0) { deleting = false; i = (i + 1) % phrases.length; delay = 300; }
  setTimeout(() => typeWriter(el, phrases, i, deleting ? j - 1 : j + 1, deleting), delay);
}

/* ---------- 图标（内联 SVG，零依赖） ---------- */
const ICONS = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.7 4.9 18.7 5.2 18.7 5.2c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.4 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

/* ---------- 注入主题按钮图标 ---------- */
function refreshThemeIcon() {
  const btn = document.getElementById("themeBtn");
  if (!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.innerHTML = isDark ? ICONS.sun : ICONS.moon;
  btn.setAttribute("aria-label", isDark ? "切换到浅色模式" : "切换到深色模式");
}

/* ---------- 渲染文章卡片 ---------- */
function renderPostCard(post) {
  return `
  <article class="post-card">
    <a class="post-cover" style="background:${post.gradient}" href="${post.file}" aria-label="${post.title}">
      <span class="emoji">${post.cover}</span>
    </a>
    <div class="post-body">
      <div class="post-meta">
        <span class="post-cat">${post.category}</span>
        <span>${shortDate(post.date)}</span>
      </div>
      <h2 class="post-title"><a href="${post.file}">${post.title}</a></h2>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-foot">
        <span>⏱ ${readTime(post.words)} 分钟</span>
        <span>✍ ${post.words} 字</span>
        <a class="read-more" href="${post.file}">阅读全文 →</a>
      </div>
    </div>
  </article>`;
}

/* ---------- 渲染侧边栏 ---------- */
function renderSidebar() {
  const el = document.getElementById("sidebar");
  if (!el) return;
  const cats = {};
  const tags = {};
  POSTS.forEach(p => {
    cats[p.category] = (cats[p.category] || 0) + 1;
    p.tags.forEach(t => tags[t] = (tags[t] || 0) + 1);
  });
  const catHtml = Object.entries(cats).map(([c, n]) =>
    `<li><a href="tags.html"><span>${c}</span><span class="count">${n}</span></a></li>`).join("");
  const tagHtml = Object.keys(tags).map(t =>
    `<a href="tags.html"># ${t}</a>`).join("");

  el.innerHTML = `
    <div class="card about-card">
      <img class="avatar-sm" src="${SITE.avatar}" alt="${SITE.author}" loading="lazy"/>
      <div class="name">${SITE.author}</div>
      <div class="bio">${SITE.bio}</div>
    </div>
    <div class="card">
      <h3>${ICONS.folder} 分类</h3>
      <ul class="cat-list">${catHtml}</ul>
    </div>
    <div class="card">
      <h3>${ICONS.tag} 标签</h3>
      <div class="tag-cloud">${tagHtml}</div>
    </div>`;
}

/* ---------- 页面初始化分发 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  refreshThemeIcon();

  document.getElementById("themeBtn")?.addEventListener("click", () => {
    toggleTheme(); refreshThemeIcon();
  });
  document.getElementById("menuBtn")?.addEventListener("click", toggleMenu);

  // 首页：文章列表 + 统计 + 打字机
  const list = document.getElementById("postList");
  if (list) {
    list.innerHTML = POSTS.map(renderPostCard).join("");
    const words = POSTS.reduce((s, p) => s + p.words, 0);
    const days = Math.max(1, Math.ceil((Date.now() - new Date("2020-12-25")) / 86400000));
    document.getElementById("statPosts").textContent = POSTS.length;
    document.getElementById("statWords").textContent = (words / 1000).toFixed(1) + "k";
    document.getElementById("statDays").textContent = days;
    typeWriter(document.getElementById("typed"), ["保持好奇，保持记录。", "认真生活，慢慢写字。"], 0, 0, false);
  }

  // 侧边栏（首页）
  renderSidebar();

  // 归档页
  const timeline = document.getElementById("timeline");
  if (timeline) {
    const byYear = {};
    POSTS.forEach(p => {
      const y = p.date.slice(0, 4);
      (byYear[y] ||= []).push(p);
    });
    timeline.innerHTML = Object.keys(byYear).sort().reverse().map(y => `
      <div class="tl-year">${y}</div>
      ${byYear[y].map(p => `
        <div class="tl-item">
          <a href="${p.file}">
            <span class="tl-date">${shortDate(p.date)}</span>
            <span class="tl-title">${p.title}</span>
          </a>
        </div>`).join("")}`).join("");
  }

  // 标签页
  const tagPage = document.getElementById("tagPage");
  if (tagPage) {
    const group = {};
    POSTS.forEach(p => p.tags.forEach(t => (group[t] ||= []).push(p)));
    tagPage.innerHTML = Object.entries(group).map(([t, arr]) => `
      <div class="tag-group">
        <h3>${ICONS.tag} ${t} <span style="color:var(--text-faint);font-weight:400;font-size:.8rem">${arr.length} 篇</span></h3>
        ${arr.map(p => `<a class="pill" href="${p.file}">${p.cover} ${p.title}</a>`).join("")}
      </div>`).join("");
  }
});
