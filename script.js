document.addEventListener("DOMContentLoaded", function() {
    const newsSection = document.getElementById('news-section');
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    // Fetching Crypto News
    fetch('https://api.coingecko.com/api/v3/news')  // Example API for crypto news
        .then(response => response.json())
        .then(data => {
            newsSection.innerHTML = '<h2>Latest Crypto News</h2>';

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

    // Fetching Crypto Market Data for the Chart
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')  // Example API for market data
        .then(response => response.json())
        .then(data => {
            const prices = data.prices.map(price => price[1]);
            const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());

            // Create the chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Bitcoin Price (USD)',
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Price (USD)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching market data', error);
        });
});
