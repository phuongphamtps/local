var manageCustomersApp = angular.module("ManageCustomersApp", []);
//injecting the 'CustomerService' service and using as the parameter
manageCustomersApp.controller('CustomerController', ['$scope', '$state', '$stateParams', '$modal', '$log', 'CustomerService',
    function ($scope, $state, $stateParams, $modal, $log, CustomerService) {
        var customerId = $stateParams.customerId;

        //use $scope.searchText = '' to keep track of search text on the page
        $scope.searchText = '';
        $scope.customers = searchCustomers();
        $scope.contacts = [];
        $scope.customer = {};
        $scope.currentCustomer = {};

        function searchCustomers() {
            CustomerService.search($scope.searchText)
            .then(function (data) {
                $scope.customers = CustomerService.customers;
            });
        };

        //This code is not enough to search by typing into the text box 
        //because we have not written any event method yet. 
        //To make it working we will add a $watch to check the changes in text search 
        //and call the search method
        //This watch method will listen any change in search text and match with the old value 
        //if different then it will call the search method again for us
        $scope.$watch('searchText', function (newValue, oldValue) {
            if (newValue != oldValue) {
                searchCustomers();
            }        
        }, true);
    }
    
]);