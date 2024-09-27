document.addEventListener("DOMContentLoaded", function() {
    const newsSection = document.getElementById('news-section');

    fetch('https://api.coingecko.com/api/v3/news')  // Example API
        .then(response => response.json())
        .then(data => {
            newsSection.innerHTML = '';

            data.forEach(news => {
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `<h3>${news.title}</h3><p>${news.description}</p>`;
                newsSection.appendChild(newsItem);
            });
        })
        .catch(error => {
            newsSection.innerHTML = '<p>Error fetching news data</p>';
        });
});
