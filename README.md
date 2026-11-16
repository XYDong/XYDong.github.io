# Joker｜笔记

个人博客，发布于 [https://xydong.github.io](https://xydong.github.io)。

一切都可以记录。这里记录生活、读书，以及偶尔闪过的念头。

## 技术说明

纯静态站点，零外部依赖，由 GitHub Pages 直接托管。

- `index.html` — 首页（文章流 + 侧边栏）
- `archives.html` / `tags.html` / `about.html` — 归档 / 标签 / 关于
- `404.html` — 自定义错误页
- `posts/` — 文章正文（每篇一个 HTML）
- `assets/css/style.css` — 全站样式（响应式 + 深浅色主题）
- `assets/js/posts.js` — **站点配置 + 文章数据（唯一数据源）**
- `assets/js/main.js` — 交互逻辑
- `backup-2020/` — 旧版 Hexo 博客归档快照

## 如何添加一篇文章

1. 在 `assets/js/posts.js` 的 `POSTS` 数组里新增一个对象，填好标题、日期、分类、标签、摘要、封面 emoji 和文件名；
2. 在 `posts/` 目录新建一个对应的 HTML 文件（可复制现有文章为模板，改标题、正文和头图颜色）；
3. 提交推送，几分钟后自动生效。

修改站点名、签名、社交链接等，改 `posts.js` 顶部的 `SITE` 对象即可。
