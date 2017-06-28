google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawLineChart);

/**
 * Draw google line chart based on given settings
 * @param settings
 */
const drawLineChart = (settings) => {

    const data = new google.visualization.DataTable();

    for(let i=0; i<settings.columns.length; i++){
        data.addColumn(settings.columns[i].type, settings.columns[i].name);
    }

    data.addRows(settings.rows);

    const options = {
        hAxis: settings.hAxis,
        vAxis: settings.vAxis,
        series: {
            1: {curveType: 'function'}
        },
        legend: {
            position: 'none'
        },
        backgroundColor: {
            fill: 'transparent'
        },
        chartArea: {
            left: 80,
            width: '100%'
        }

    };

    const chart = new google.visualization.LineChart(settings.container);
    chart.draw(data, options);
}

export default drawLineChart
