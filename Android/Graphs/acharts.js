const canvas = document.getElementById("wphcanv").getContext("2d");
var Chartdata;
const ChartsModule = new Module("AndroidCharts", "rgba(140,0,0,0.9)");
var wphChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Watts per hour(WpH)',
            data: [],
            backgroundColor: [
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)',
                'rgba(247, 27, 27,0.9)'
            ],
            borderColor: [
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)',
                'rgba(0,0,0,1)'

            ],
            borderWidth: 0,
            pointBackgroundColor: [],
            
        }]
    },
    options: {
        animation: {
            duration: 1000,
        },
        hover: {
            animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        elements: {
            point: {
                pointStyle: 'cross',
                rotation: 45,
                radius: 6,
            },
            line: {
                tension: 0.25,
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 5,
                    maxTicksLimit: 100,
                    suggestedMin: 0,
                    beginAtZero: true,
                    fontColor: 'rgb(160,160,160)'
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'rgb(160,160,160)',
                }
            }]
        },
    },
});
start();
async function start() {
    await fetch("/data.json").then(res => res.json()).then(data => Chartdata = data).catch(error => console.log(error));
    console.log(Chartdata);
    document.title = `Sundata ${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;
    setupCharts();
    ChartVisualizer();
}
function setupCharts() {
    //setting the colors
    var maxIndex = wphChart.data.labels.length;
    for(var i = 0; i < maxIndex; i++) {
        wphChart.data.datasets[0].pointBackgroundColor[i] = "rgba(0,0,0, 0.4)";    
        wphChart.data.datasets[0].backgroundColor[i] = ChartsModule.color;
    }
}
async function ChartVisualizer() {
    /*
    / (5) [{…}, {…}, {…}, {…}, {…}]
    / 0: {Time: "22/26", wph: "641"}
    / 1: {Time: "22/26", wph: "200"}
    / 2: {Time: "22/48", wph: "200"}
    / 3: {Time: "10/31/22/49", wph: "200"}
    / 4: {Time: "10/31-22:50", wph: "9000000000"}
    / Display by days? or by hours? 🤔
   */
    // setting the WpH
    for (var i = 0; i < 7; i++) {
        if(i > 6) {
            return;
        }
        wphChart.data.datasets[0].data[i] = Chartdata[i].wph;

    }
    wphChart.update();
}