# aigc-showcase

我们社团自己的网页 —— AIGC 社的作品展示站,纯静态,无后端。

## 目录结构

```
.
├── index.html          # 页面入口
├── css/
│   └── style.css       # 浅色极简风样式
├── js/
│   ├── works.js        # 作品数据(WORKS 数组,增删作品改这里)
│   └── main.js         # 筛选与卡片渲染
├── images/             # 社员头像与作品封面
└── favicon.svg
```

## 本地预览

纯静态页面,任选其一:

```bash
# 直接用浏览器打开 index.html,或起个本地服务:
python3 -m http.server 8000
```

## 如何添加作品

编辑 `js/works.js`,在 `WORKS` 数组里追加一项:

```js
{
  title: "作品标题",
  description: "一句话介绍",
  tags: ["应用"],        // 用于筛选标签
  year: "2026",
  cover: "./images/xxx.png",  // 封面图放 images/ 下
  link: "https://...",   // 可选,没有则显示「详情整理中…」
},
```

## 注意

`images/` 目录(社员头像、作品封面)目前没有进仓库,页面里所有 `./images/*` 引用都是 404 —— 记得把图片一起提交上来。
