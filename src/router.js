import App from './modules/App'

App.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/:city', {
            templateUrl: 'src/components/current/current.html',
            controller: 'CurrentController'
        })
        .when('/:city/forecast', {
            templateUrl: 'src/components/forecast/forecast.html',
            controller: 'ForecastController'
        })

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
});
