/*
- The observable class enables data-binding
When the contents of an observable change, the observable notifies all of the data-bound controls, 
so they can update themselves. (The observableArray class is the array version of observable.) 

- To start with, our view model has two observables:
    + books holds the list of books.
    + error contains an error message if an AJAX call fails.

- The getAllBooks method makes an AJAX call to get the list of books. Then it pushes the result onto the books array.
- The ko.applyBindings method is part of the Knockout library. It takes the view model as a parameter and sets up the data binding.
*/
var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();

    // Display item details for each book
    self.detail = ko.observable();

    // Add a New Item to Database. Create a new book
    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable(),
        Price: ko.observable(),
        Genre: ko.observable()
    }
    var authorsUri = '/api/authors/';

    var booksUri = '/api/books';

    function ajaxHelper(uri, method, data) {
        self.error(''); // clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        }).success(function (data) {

        });

    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    // Display item details for each book
    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + "/" + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    // Add a New Item to Database. Create a new book
    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }
    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            Title: self.newBook.Title(),
            Year: self.newBook.Year(),
            Price: self.newBook.Price(),
            Genre: self.newBook.Genre()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }

    // Fetch the initial data
    getAllBooks();
    getAuthors();
};

ko.applyBindings(new ViewModel());