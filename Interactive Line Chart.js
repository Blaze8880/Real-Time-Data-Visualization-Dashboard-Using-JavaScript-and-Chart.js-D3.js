// Fetch data from an API or JSON file
async function getData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

// Initialize the Chart.js chart
async function createChart() {
    const data = await getData();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',  // You can also try 'bar', 'pie', 'doughnut', etc.
        data: {
            labels: data.map(item => item.timestamp),  // X-axis labels
            datasets: [{
                label: 'Real-Time Data',
                data: data.map(item => item.value),  // Y-axis data points
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second'
                    }
                }
            }
        }
    });

    // Update chart every few seconds with new data
    setInterval(async () => {
        const newData = await getData();
        myChart.data.labels = newData.map(item => item.timestamp);
        myChart.data.datasets[0].data = newData.map(item => item.value);
        myChart.update();
    }, 5000);  // Update every 5 seconds
}

createChart();
