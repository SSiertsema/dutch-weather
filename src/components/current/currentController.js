import App from '../../modules/App'
import { getCityDetails, getCurrent } from '../../lib/openweatherConnector'

App.controller('CurrentController', function($scope, $routeParams) {
    getCityDetails($routeParams.city).then((result) => {
        $scope.city = result

        getCurrent(result.id).then((result) => {
            //console.log('current: ', result);
            const storyTemplateParts = [];
            const temperature = Math.round(result.main.temp-273.15) // <-- convert kelvin to celcius
            const clouds = result.clouds.all
            const windSpeed = result.wind.speed

            // define story to tell based on temperature, clouds/sunshine, windSpeed
            // together it will form warm-sunny-windstill.html
            if(temperature >= 24){
                storyTemplateParts.push('hot')
            }
            else if(temperature < 24 && temperature >= 16) {
                storyTemplateParts.push('warm')
            }
            else if(temperature < 16) {
                storyTemplateParts.push('lukeWarm')
            }

            if(clouds >= 40) {
                storyTemplateParts.push('cloudy')
            }
            else if(clouds < 40) {
                storyTemplateParts.push('sunny')
            }

            if(windSpeed > 20 && windSpeed <= 90) {
                storyTemplateParts.push('windy')
            }
            else if(windSpeed <= 20) {
                storyTemplateParts.push('windstill')
            }
            else if(windSpeed > 90) {
                storyTemplateParts.push('stormy')
            }

            const storyTemplate = `src/components/current/storyTemplates/${ storyTemplateParts.join('-') }.html`;

            $scope.$apply(() => {
                $scope.storyTemplate = storyTemplate,
                $scope.summary = storyTemplateParts.join(', '),
                $scope.current = {
                    cityName : result.name,
                    weather : `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
                    humidity : result.main.humidity,
                    pressure : result.main.pressure,
                    temperature : temperature,
                    clouds : clouds,
                    windDirection : result.wind.deg,
                    windSpeed : windSpeed,
                    sunrise : result.sys.sunrise,
                    sunset : result.sys.sunset
                }
                $scope.stateClass = 'animateIn'
            })
        })
    })
})
