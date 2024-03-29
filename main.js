const canvas = document.getElementById("wphcanv").getContext("2d");
var Chartdata;
const lineColor = "rgba(0,77, 165)";
var wphChart = new Chart(canvas, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'WpH (Watts per hour)',
            data: [],
            backgroundColor: lineColor,
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
            pointBorderColor: [],
            pointBorderWidth: 1,
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12,
                        family: 'Monospace Regular',
                    }
                }
            }
        },
        responsiveAnimationDuration: 1000,
		elements: {
			point: {
				pointStyle: 'circle',
				rotation: 45,
				radius: 3,
			},
			line: {
                cubicInterpolationMode: 'monotone',
                steppedLine: 'before'
			}
		},
        scales: {
            yAxes: [{
                ticks: {
                    max: 100,
                    stepSize: 5,
                    maxTicksLimit: 100,
                    suggestedMin: 0,
                    beginAtZero: true,
                    fontColor: 'rgba(218, 55, 55)',
                    fontSize: 20,
                    fontFamily: "Monospace Regular",
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: 'rgba(218, 39, 39)',
                    fontFamily: "Monospace Regular",
                    fontSize: 20,
                }
            }]
        },
    },
});
start();
async function start() {
    var CurrYear = new Date().getYear();
    var month = new Date().getMonth() + 1;
    document.getElementById("signature").innerHTML = `<strong> ${1900 + CurrYear} Christian Hozak</strong>`
    document.title = "Sundata " + new Date().getFullYear() + "/" + month + "/" + new Date().getDate();
    Chartdata = await fetch("/Backend/data.json").then(res => res.json()).then(data => Chartdata = data).catch(error => console.log(error));
    setupCharts();
    return;
}
function setupCharts() {
	//setting the colors
	var maxIndex = wphChart.data.labels.length;
	for(var i = 0; i < maxIndex; i++) {
		wphChart.data.labels[i] = Chartdata[i].Time;
        wphChart.data.datasets[0].pointBorderColor[i] = lineColor;
	}
    for (var i = 0; i < 7; i++) {
        if (i > 6) {
            return;
        }
        wphChart.data.datasets[0].data[i] = Chartdata[i].wph;
    }
    wphChart.update();
}
