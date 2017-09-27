// configure our routes
bookApp.config('ConfigRoute', configRoute);

function configRoute($routeProvider) {
    $routeProvider

    // Route for Home Page
    .when('/', {
        templateUrl: 'Views/Home/Index.cshtml',
        controller: 'BookCtrl'
    })
    
}