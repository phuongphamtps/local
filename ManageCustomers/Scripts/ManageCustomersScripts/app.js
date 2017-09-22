var routerApp = angular.module('routerManageCustomersApp', ['ui.router']);
routerApp.config(function ($stateProvider) {
    $stateProvider
    .state('customers', {
        url: '/customers',
        templateUrl: 'Views/ManageCustomersView/customer.html',
        controller: 'CustomerController'
    })

    .state('customer.detail', {
        url: '^/customer/detail/{customerId:[0-9]{1,5}}',
        templateUrl: 'app/customer/customerdetail.html',
        controller: 'CustomerController'
    })

    .state('customer.detail.contact', {
        url: '^/customer/detail/contact/{customerId:[0-9]{1,5}}',
        templateUrl: 'app/customer/contact.html',
        controller: 'customerContactCtrl'
    })
});