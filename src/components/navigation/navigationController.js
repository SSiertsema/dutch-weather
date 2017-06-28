import App from '../../modules/App'

App.controller('NavigationController', ['$scope', '$location', ($scope, $location) => {
    $scope.cities = [
        'amsterdam',
        'utrecht',
        'rotterdam',
        'leeuwarden',
        'maastricht'
    ];
}]);
