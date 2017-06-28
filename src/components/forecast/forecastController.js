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

            // prepare result list for view(s)
            const filteredList = [];
            for(let i=0; i<result.list.length; i++){
                let item = result.list[i];

                // remove onneeded information for this context
                item.dt_txt = item.dt_txt.substring(5).substring(0,11).replace(' ', ' at ')

                // Kelvin to Celcius
                item.main.temp = Math.round(item.main.temp - 273.15)

                // round wind speed
                item.wind.speed = Math.round(item.wind.speed)

                filteredList.push(item);

                // return 10 entries max.. otherwise it would be to crowded in view
                if(i > 10){
                    break;
                }
            }

            $scope.$apply(() => {
                $scope.forecast = {
                    weatherObjects: filteredList
                }
                $scope.stateClass = 'animateIn'
            })

            // Prepare google chart
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

            for(let i=0; i<filteredList.length; i++){
                chartSettings.rows.push([filteredList[i].dt_txt, filteredList[i].main.temp])
            }

            drawLineChart(chartSettings);
        })

    })

})
