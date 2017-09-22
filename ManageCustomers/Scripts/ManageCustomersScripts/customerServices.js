//ways to create a service
//$https: is used to make ajax call to get the server data
//using $q defer method call the service asynchronously
var manageCustomersApp = angular.module("ManageCustomersApp", []);
manageCustomersApp.factory('CustomerService', ['$q', '$http', function ($q, $http) {
    var customerUrl = 'api/customers/';
    var contactUrl = 'api/contact/';

    //Created a blank variable customerService, 
    //in which added search method with a parameter to accept the searching text
    var customerService = {};
    customerService.customers = [];
    customerService.currentCustomer = {};

    //Search Customers
    customerService.search = function (text) {
        var deffered = $q.defer();
        var ajax = {
            url: customerUrl + 'search',
            method: 'GET',
            params: { 'searchText': text },
            cache: true
        };
        return $http(ajax)
            .success(function (data) {
                deffered.resolve(customerService.customers = data);
            })
            .error(function (error) {
                deffered.reject(error);
            })
        return deffered.promise;
    }//end search customers
    return customerService;
}//end customerService.factory
]);