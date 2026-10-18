document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        const allArticles = JSON.parse(localStorage.getItem("articles")) || [];
        const post = allArticles.find(a => a.id === postId);
        if (post) {
            document.getElementById("detail-title").innerText = post.title;
            document.getElementById("detail-category").innerText = post.category;
            document.getElementById("detail-date").innerText = post.publishedAt;
            document.getElementById("detail-excerpt").innerText = post.excerpt;
            document.getElementById("detail-author").innerText = post.author || "Phóng viên Dân Trí";
            document.getElementById("detail-source").innerText = post.source || "dantri.com.vn";
            document.getElementById("detail-content").innerHTML = post.content || `<p>${post.excerpt}</p>`;
        }
    }
});
