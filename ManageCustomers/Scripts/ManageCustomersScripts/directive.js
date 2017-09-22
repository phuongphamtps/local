var manageCustomersApp = angular.module("ManageCustomersApp");
manageCustomersApp.directive("asCustomer", function () {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/customer/userListRow.html'
    };
})