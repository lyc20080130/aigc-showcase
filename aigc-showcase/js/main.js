(function () {
  const grid = document.getElementById("works-grid");
  const filtersBox = document.getElementById("filters");
  const emptyEl = document.getElementById("empty");
  const countEl = document.getElementById("works-count");
  const yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const works = Array.isArray(window.WORKS) ? window.WORKS : [];

  const tagSet = [];
  for (const w of works) {
    for (const t of w.tags || []) {
      if (!tagSet.includes(t)) tagSet.push(t);
    }
  }

  let activeTag = "全部";

  function buildFilters() {
    filtersBox.innerHTML = "";
    for (const tag of ["全部", ...tagSet]) {
      const btn = document.createElement("button");
      btn.className = "filter-btn" + (tag === activeTag ? " active" : "");
      btn.type = "button";
      btn.textContent = tag;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(tag === activeTag));
      btn.addEventListener("click", () => {
        activeTag = tag;
        for (const b of filtersBox.children) {
          const isActive = b.textContent === activeTag;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", String(isActive));
        }
        renderGrid();
      });
      filtersBox.appendChild(btn);
    }
  }

  function makeCard(w, i) {
    const card = document.createElement(w.link ? "a" : "article");
    card.className = "card";
    if (w.link) {
      card.href = w.link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
    }

    const media = document.createElement("div");
    media.className = "card-media";

    const fallback = document.createElement("div");
    fallback.className = "fallback fallback-" + (i % 6);
    fallback.textContent = String(i + 1).padStart(2, "0");
    media.appendChild(fallback);

    const img = document.createElement("img");
    img.alt = (w.title || "作品") + " 封面";
    img.loading = "lazy";
    img.addEventListener("error", () => img.remove());
    if (w.cover) img.src = w.cover;
    media.appendChild(img);

    if (w.year) {
      const badge = document.createElement("span");
      badge.className = "badge-year";
      badge.textContent = w.year;
      media.appendChild(badge);
    }
    card.appendChild(media);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = w.title || "未命名作品";
    body.appendChild(title);

    if (w.tags && w.tags.length) {
      const tags = document.createElement("div");
      tags.className = "card-tags";
      for (const t of w.tags) {
        const chip = document.createElement("span");
        chip.className = "chip" + (t === "黑客松" ? " chip-hack" : "");
        chip.textContent = t;
        tags.appendChild(chip);
      }
      body.appendChild(tags);
    }

    const desc = document.createElement("p");
    desc.className = "card-desc";
    desc.textContent = w.description || "";
    body.appendChild(desc);

    const link = document.createElement("span");
    link.className = "card-link";
    link.textContent = w.link ? "查看作品 →" : "详情整理中…";
    if (!w.link) link.classList.add("disabled");
    body.appendChild(link);

    card.appendChild(body);
    return card;
  }

  function renderGrid() {
    const list = works
      .map((w, i) => ({ w, i }))
      .filter(({ w }) => activeTag === "全部" || (w.tags || []).includes(activeTag));

    grid.innerHTML = "";
    list.forEach(({ w, i }) => grid.appendChild(makeCard(w, i)));
    emptyEl.hidden = list.length > 0;
    countEl.textContent = works.length
      ? "共 " + works.length + " 个作品 · 当前显示 " + list.length + " 个"
      : "";
  }

  buildFilters();
  renderGrid();
})();