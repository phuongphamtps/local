/// <reference path="../angular.min.js" />

var contactsApp = angular.module('contactsApp', []);
contactsApp.controller('contactController', contactController);

function contactController($scope, $http) {
    $scope.contacts = [];
    $scope.contact = {};

    getContactss();
    
    function getContacts() {
        $http.get('api/Contacts')
        .then(function (results) {
            $scope.contacts = results.data;
        });
    }

    function getContactss() {
        var request = {
            method: 'GET',
            url: 'api/Contacts'
        }
        $http(request).then(function (results) {
            $scope.contacts = results.data;
        });
    }
}