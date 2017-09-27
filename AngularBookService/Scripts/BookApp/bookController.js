/// <reference path="../angular.min.js" />

var bookApp = angular.module("BookApp", ["ngRoute"]);

bookApp.config(function ($routeProvider) {
    $routeProvider
    .when("/ebook", {
        templateUrl: "Views/Book/EditPage.html",
        controller: "BookCtrl"
    })
});

bookApp.controller('BookCtrl', bookController);

function bookController($scope, $http) {
    $scope.books = {};
    $scope.authors = [];
    $scope.detail = {};

    $scope.Book = {
        Id: 0,
        Title: '',
        Year: '',
        Price: '',
        Genre: '',
        AuthorId: ''
    };
    $scope.searchText = '';

    function searchBooks() {
        if ($scope.searchText == '') {
            getBooks();
        } else {
            var request = {
                url: 'api/Books/search',
                method: 'GET',
                params: { 'searchText': $scope.searchText }
            }
            $http(request).then(function successCallback(results) {
                $scope.books = results.data;
            }, errorCallback);
        }
    }

    $scope.$watch('searchText', function (newValue, oldValue) {
        if (newValue != oldValue) {
            searchBooks();
        }
    }, true);

    function getBooks() {
        $http.get('api/Books')
            .then(function (results) {
                $scope.books = results.data;
            });
    }

    $scope.getBookById = function (id) {
        $http.get('api/Books/' + id)
        .then(function (results) {
            $scope.detail = results.data;
        });
    }

    function getAuthors() {
        $http.get('api/Authors')
            .then(function (results) {
                $scope.authors = results.data;
            });
    }

    $scope.addBook = function () {
        $http.post('api/Books', $scope.Book)
        .then(function successCallback(response) {
            $scope.books.push(response.data);
            alert("Added Success");
        }, errorCallback);
    }

    $scope.editBookDraft = function () {
        $http({
            method: 'PUT',
            url: 'api/Books/' + $scope.Book.Id,
            data: $scope.Book
        }).then(function successCallback(results) {
            init();
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    }

    // Edit book details
    $scope.editBookInfo = function (data) {
        $scope.Book = {
            Id: data.Id,
            Title: data.Name,
            Year: data.Year,
            Price: data.Price,
            Genre: data.Genre,
            AuthorId: data.AuthorId
        };
    }

    $scope.editBook = function () {
        $http.put('api/Books/' + $scope.Book.Id, $scope.Book)
        .then(function successCallback() {
            alert("Edited Success");
        }, errorCallback);
    }

    $scope.delete = function (index) {
        $http.delete('api/Books/' + $scope.books[index].Id)
        .then(function () {
            $scope.books.splice(index, 1);
            alert("Deleted Success");
        }, errorCallback);
    }

    function errorCallback(error) {
        alert("Error : " + error.data.ExceptionMessage);
    }

    function init() {
        getBooks();
        getAuthors();
    }

    $scope.clear = function () {
        $scope.Book.Id = 0,
        $scope.Book.Title = '',
        $scope.Book.Year = '',
        $scope.Book.Price = '',
        $scope.Book.Genre = '',
        $scope.Book.AuthorId = ''
    }

    init();
}

