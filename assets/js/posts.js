/* ============================================================
 * SITE —— 站点全局配置
 * 修改站点名、签名、社交链接等，只需改这里
 * ============================================================ */
const SITE = {
  name: "Joker｜笔记",
  slogan: "一切都可以记录",
  author: "Joker",
  bio: "希望能一直坚持。记录生活、读书与那些偶尔闪过的念头。",
  email: "shuiqingshuying@gmail.com",
  github: "https://github.com/XYDong",
  avatar: "assets/img/avatar.png",
  startYear: 2020,
};

/* ============================================================
 * POSTS —— 文章列表（唯一数据源）
 * 新增文章：复制一个对象，改字段，并在 posts/ 下建同名 html
 * cover 用 emoji + 渐变色，零图片依赖
 * ============================================================ */
const POSTS = [
  {
    slug: "street-corner",
    title: "街角观察记",
    date: "2026-11-16",
    category: "生活",
    tags: ["观察", "随笔"],
    excerpt: "在街角的咖啡馆坐一下午，看人来人往。花店老板多塞的一枝满天星，陌生人让出的一寸屋檐——生活最动人的部分，往往安静得容易被错过。",
    cover: "☕",
    gradient: "linear-gradient(135deg,#d1913c 0%,#ffd194 100%)",
    words: 1180,
    file: "posts/street-corner.html",
  },
  {
    slug: "rainy-day-reading",
    title: "在雨声里读一本书",
    date: "2026-11-10",
    category: "读书",
    tags: ["阅读", "随笔"],
    excerpt: "下雨的午后适合读书。窗外的雨把世界调成了静音，文字便显得格外清晰。想起那本搁置了很久的书，终于在这个下午翻开了第一页。",
    cover: "📖",
    gradient: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    words: 860,
    file: "posts/rainy-day-reading.html",
  },
  {
    slug: "city-at-six",
    title: "城市清晨六点的模样",
    date: "2026-10-28",
    category: "生活",
    tags: ["城市", "观察"],
    excerpt: "起得比太阳早，才发现这座城市有另一副面孔。早点铺的热气、环卫工橘色的背影、第一班公交的车灯——这些是白昼里看不见的细节。",
    cover: "🌅",
    gradient: "linear-gradient(135deg,#f7971e 0%,#ffd200 100%)",
    words: 640,
    file: "posts/city-at-six.html",
  },
  {
    slug: "about-slowing-down",
    title: "关于「慢下来」这件事",
    date: "2026-10-15",
    category: "随想",
    tags: ["思考", "生活"],
    excerpt: "我们习惯了用更快来解决一切，可有些东西恰恰是快不得的。一顿饭、一段路、一场对话，慢下来之后，才尝得出本来的味道。",
    cover: "🍃",
    gradient: "linear-gradient(135deg,#11998e 0%,#38ef7d 100%)",
    words: 1120,
    file: "posts/about-slowing-down.html",
  },
  {
    slug: "old-things",
    title: "旧物里的时光",
    date: "2026-09-30",
    category: "生活",
    tags: ["记忆", "随笔"],
    excerpt: "整理房间时翻出许多旧物：一张车票、一封没寄出的信、一个早已停用的钥匙扣。它们不值钱，却各自藏着一段回不去的日子。",
    cover: "🕰️",
    gradient: "linear-gradient(135deg,#8e2de2 0%,#4a00e0 100%)",
    words: 730,
    file: "posts/old-things.html",
  },
  {
    slug: "letter-to-future",
    title: "写给三年后的自己",
    date: "2026-09-12",
    category: "随笔",
    tags: ["时间", "成长"],
    excerpt: "如果给三年后的自己写一封信，我想问的不是赚了多少钱、到了什么位置，而是——你还有没有保持好奇，还愿不愿意为一件小事感动。",
    cover: "✉️",
    gradient: "linear-gradient(135deg,#ff6b6b 0%,#feca57 100%)",
    words: 950,
    file: "posts/letter-to-future.html",
  },
];

/* 工具函数：把日期格式化为 YYYY 年 MM 月 DD 日 */
function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}

function shortDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${y}.${m}.${d}`;
}

/* 估算阅读时长（分钟），按每分钟 300 字 */
function readTime(words) {
  return Math.max(1, Math.round(words / 300));
}
