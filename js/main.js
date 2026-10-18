const defaultArticles = [
    { id: "p1", title: "Thiếu gia Ấn Độ quyết cưới cô gái Việt Nam vì hành động không ngờ", excerpt: "Yêu cô gái Việt, Abhishek vấp phải sự phản đối từ gia đình vì khác biệt văn hóa...", category: "Thời sự", publishedAt: "2026-10-18 10:00" },
    { id: "p2", title: "Cô gái Việt tiết lộ cảnh chưa từng thấy giữa Bangkok ngập lụt diện rộng", excerpt: "Trận ngập lụt kỷ lục khiến cuộc sống người dân đảo lộn...", category: "Thời sự", publishedAt: "2026-10-18 09:30" },
    { id: "p3", title: "Ông bố ở Bắc Ninh khóc như mưa tiễn con gái về nhà chồng chỉ cách 6km", excerpt: "Đoạn clip xúc động ghi lại cảnh người cha không kìm được nước mắt...", category: "Thời sự", publishedAt: "2026-10-18 08:00" },
    { id: "p4", title: "Cô gái Việt trồng rau, làm vườn 100m2 trên đất Mỹ để đỡ nhớ nhà", excerpt: "Để vơi đi nỗi nhớ quê nhà, chị Trinh cải tạo mảnh đất trống...", category: "Thời sự", publishedAt: "2026-10-17 15:00" }
];

if (!localStorage.getItem("articles")) {
    localStorage.setItem("articles", JSON.stringify(defaultArticles));
}

document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    renderArticles("Tất cả");
});

function loadMenu() {
    fetch('data/menu.json')
        .then(res => res.json())
        .then(data => {
            const menuEl = document.getElementById("main-menu");
            data.menu.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="#" onclick="filterCategory('${item.title}')">${item.title}</a>`;
                menuEl.appendChild(li);
            });
        });
}

function filterCategory(catName) {
    document.getElementById("category-title").innerText = catName;
    renderArticles(catName);
}

function renderArticles(categoryFilter) {
    const allArticles = JSON.parse(localStorage.getItem("articles"));
    let filtered = allArticles;
    if (categoryFilter !== "Tất cả" && categoryFilter !== "Trang chủ") {
        filtered = allArticles.filter(a => a.category.toLowerCase().includes(categoryFilter.toLowerCase()));
    }
    filtered.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const topSection = document.getElementById("top-articles");
    const listSection = document.getElementById("list-articles");
    topSection.innerHTML = ""; listSection.innerHTML = "";

    if (filtered.length === 0) {
        topSection.innerHTML = "<p>Chưa có bài viết. Hãy dùng chức năng Crawler để thêm bài viết mới!</p>";
        return;
    }

    const p1 = filtered[0];
    let topHTML = `
        <div class="featured-post">
            <img src="https://picsum.photos{p1.id}" alt="thumb">
            <h2><a href="detail.html?id=${p1.id}">${p1.title}</a></h2>
            <p>${p1.excerpt}</p>
        </div>
    `;
    topHTML += `<div class="side-posts">`;
    for (let i = 1; i < 3; i++) {
        if (filtered[i]) {
            topHTML += `
                <div class="side-post">
                    <img src="https://picsum.photos{filtered[i].id}" alt="thumb">
                    <h4><a href="detail.html?id=${filtered[i].id}">${filtered[i].title}</a></h4>
                </div>
            `;
        }
    }
    topHTML += `</div>`;
    topSection.innerHTML = topHTML;

    if (filtered.length > 3) {
        for (let i = 3; i < filtered.length; i++) {
            const item = filtered[i];
            listSection.innerHTML += `
                <div class="list-item">
                    <img src="https://picsum.photos{item.id}" alt="thumb">
                    <div class="list-item-content">
                        <h3><a href="detail.html?id=${item.id}">${item.title}</a></h3>
                        <p>${item.excerpt}</p>
                    </div>
                </div>
            `;
        }
    }
}
