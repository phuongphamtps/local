/// <reference path="../angular.min.js" />

var app = angular.module("routeApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider

    .when("/", {
        templateUrl: "Views/Book.html",
        controller: "bookCtrl"
    })

    .when("/edit/:bookId", {
        templateUrl: "Views/EditBook.html",
        controller: "ebookCtrl"
    })

    .when("/details/:bookId", {
        templateUrl: "Views/DetailBook.html",
        controller: "dbookCtrl"
    })

    .when("/addbook", {
        templateUrl: "Views/AddBook.html",
        controller: "abookCtrl"
    })
});

app.controller("bookCtrl", bookController);
app.controller("dbookCtrl", detailBookController);
app.controller("ebookCtrl", editBookController);
app.controller("abookCtrl", addBookController);

function addBookController($scope, $http) {
    $scope.books = {};
    $scope.Book = {
        Id: 0,
        Title: '',
        Year: '',
        Price: '',
        Genre: '',
        AuthorId: ''
    };

    $scope.addBook = function () {
        $http.post('api/Books', $scope.Book)
        .then(function successCallback(response) {
            //$scope.books.push(response.data);
            alert("Added Success");
        }, errorCallback);
    }
}

function detailBookController($scope, $routeParams, $http) {
    $scope.checkmessage = 'Everyone come and see how good I look!';
    $scope.detail = {};
    function getBookById() {
        $scope.status = 'YES';
        $http.get('api/Books/' + $routeParams.bookId)
        .then(function (results) {
            $scope.detail = results.data;
        });
    }
    getBookById();
}

function bookController($scope, $http, $dialog) {
    $scope.books = {};
    $scope.searchText = '';

    //Search Book
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

    //GetAllBooks
    function getBooks() {
        $http.get('api/Books')
            .then(function (results) {
                $scope.books = results.data;
            });
    }

    //GetAllAuthors
    function getAuthors() {
        $http.get('api/Authors')
            .then(function (results) {
                $scope.authors = results.data;
            });
    }

    //DeleteBook
    $scope.delete = function (index) {
        var msgbox = $dialog.messageBox('Delete Book', 'Are you sure?', [{ label: 'Yes,I\'m sure', result: 'yes' }, { label: 'Nope', result: 'no' }]);
        msgbox.open().then(function (result) {
            if (result == 'yes') {
                deleteBook();
                console.log("deleting book Id = " + $scope.books[index].Id)
            }
        });

        function deleteBook() {
            $http.delete('api/Books/' + $scope.books[index].Id)
            .then(function () {
                $scope.books.splice(index, 1);
                alert("Deleted Success");
            }, errorCallback);
        }
    }

    getBooks();
    getAuthors();
}

function editBookController($scope, $routeParams, $http) {
    $scope.checkmessage = 'Everyone come and see how good I look!';
    $scope.Book = {};

    $scope.editBook = function () {
        $scope.status = 'YES';
        $http.put('api/Books/' + $scope.Book.Id, $scope.Book)
        .then(function successCallback() {
            alert("Edited Success");
        }, errorCallback);
    }

    function getBookById() {
        $scope.status = 'YES';
        $http.get('api/Books/' + $routeParams.bookId)
        .then(function (results) {
            $scope.Book = results.data;
        }, errorCallback);
    }
    getBookById();

}

function errorCallback(error) {
    alert("Error : " + error.data.ExceptionMessage);
}