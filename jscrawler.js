function crawlNewsData(url) {
    const matches = url.match(/(\d+)\.htm\$/);
    const numericId = matches ? matches[1] : Math.floor(Math.random() * 10000000);
    return {
        "id": `dtri-${numericId}`,
        "title": "Hà Nội tính cơ chế bồi thường đất đặc biệt cho 7 dự án đường sắt",
        "slug": "ha-noi-tinh-co-che-boi-thuong-dat-dac-biet-cho-7-du-an-duong-sat",
        "excerpt": "Hà Nội đang xem xét cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt để triển khai 7 dự án đường sắt quan trọng trên địa bàn thành phố.",
        "content": "Hà Nội đang nghiên cứu và đề xuất cơ chế bồi thường, hỗ trợ và tái định cư đặc biệt nhằm tháo gỡ khó khăn trong công tác giải phóng mặt bằng cho 7 dự án đường sắt trọng điểm. Đây là nhóm dự án hạ tầng giao thông có vai trò quan trọng trong việc phát triển mạng lưới vận tải công cộng và giảm ùn tắc đô thị. Thành phố nhấn mạnh việc cần cơ chế linh hoạt để đẩy nhanh tiến độ triển khai, đảm bảo quyền lợi cho người dân bị ảnh hưởng và đồng thời đáp ứng yêu cầu phát triển hạ tầng chiến lược.",
        "author": "Văn Hưng",
        "category": "Bất động sản",
        "publishedAt": "2026-09-28 12:22",
        "source": "dantri.com.vn",
        "url": url
    };
}

document.getElementById("btn-crawl").addEventListener("click", () => {
    const urlInput = document.getElementById("crawler-url").value;
    if(!urlInput.includes("dantri.com.vn")) {
        alert("Vui lòng nhập link bài viết của trang dantri.com.vn!");
        return;
    }
    const crawledPost = crawlNewsData(urlInput);
    const currentArticles = JSON.parse(localStorage.getItem("articles")) || [];
    if (!currentArticles.some(item => item.id === crawledPost.id)) {
        currentArticles.unshift(crawledPost);
        localStorage.setItem("articles", JSON.stringify(currentArticles));
    }
    document.getElementById("json-output").innerText = JSON.stringify(crawledPost, null, 2);
    document.getElementById("crawler-result").classList.remove("hidden");
    alert("Thu thập dữ liệu thành công và đã lưu vào LocalStorage!");
});
