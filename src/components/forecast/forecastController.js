import App from '../../modules/App'
import { getCityDetails, getForecast } from '../../lib/openweatherConnector'
import drawLineChart from '../../lib/lineChart'

App.controller('ForecastController', function($scope, $routeParams) {
    getCityDetails($routeParams.city).then((result) => {
        // console.log('cityDetails: ', result);
        $scope.Math = window.Math;
        $scope.city = result

        getForecast(result.id).then((result) => {
            console.log('Forecast: ', result);
            $scope.$apply(() => {
                $scope.forecast = {
                    weatherObjects: result.list
                }
                $scope.stateClass = 'animateIn'
            })

            const chartSettings = {
                container: document.querySelector('.forecast__chart'),
                columns: [
                    {
                        type: 'string',
                        name: 'Date'
                    },
                    {
                        type: 'number',
                        name: 'Temperature(Celcius)'
                    }
                ],
                hAxis: {
                    title: 'Date'
                },
                vAxis: {
                    title: 'Temperature'
                },
                rows: []

            }

            for(let i=0; i<result.list.length; i++){
                chartSettings.rows.push([result.list[i].dt_txt, Math.round(result.list[i].main.temp-273.15)])
            }

            drawLineChart(chartSettings);
        })

    })

})
