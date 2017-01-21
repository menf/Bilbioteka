// instalacja bibliotek:
// npm install express
// npm install cors
// npm install body-parser

// uruchomienie:
// node biblioteka.js 8080

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')

var port = +process.argv[2];

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookId = 3;

function findBook(id) {
    for (var i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            return books[i];
        }
    }
    return null;
}

function removeBook(id) {
    var bookIndex = 0;
    for (var i = 0; i < books.length; i++) {
        if (books[i].id === id) {
            bookIndex = i;
        }
    }
    books.splice(bookIndex, 1);
}

var books = [
    { id: 1, author: 'Stanisław Lem', title: 'Solaris' },
    { id: 2, author: 'Andrzej Sapkowski', title: 'Wiedźmin' }
    ];

/**
* HTTP GET /books
*/
app.get('/books', function (request, response) {
    console.log('In GET function ');
    response.json(books);
});
/**
* HTTP GET /books/:id
*/
app.get('/books/:id', function (request, response) {
    console.log('Getting a book with id ' + request.params.id);
    var book = findBook(parseInt(request.params.id, 10));
    if (book === null) {
        response.send(404);
    }
    else {
        response.json(book);
    }
});
/**
* HTTP POST /books/
*/
app.post('/books', function (request, response) {
    var book = request.body;
    console.log('Saving book with the following structure ' + JSON.stringify(book));
    book.id = bookId++;
    books.push(book);
    response.send(book);
});
/**
* HTTP PUT /books/
*/
app.put('/books/:id', function (request, response) {
    var book = request.body;
    console.log('Updating Book ' + JSON.stringify(book));
    var currentBook = findBook(parseInt(request.params.id, 10));
    if (currentBook === null) {
        response.send(404);
    }
    else {
        //save the book locally
        currentBook.title = book.title;
        currentBook.author = book.author;
        response.send(book);
    }
});
/**
* HTTP DELETE /books/
*/
app.delete('/books/:id', function (request, response) {
    console.log('calling delete');
    var book = findBook(parseInt(request.params.id, 10));
    if (book === null) {
        console.log('Could not find book');
        response.send(404);
    }
    else {
        console.log('Deleting ' + request.params.id);
        removeBook(parseInt(request.params.id, 10));
        response.send(book);
        // or: response.send(204);
    }
});

//start up the app
app.listen(port, function(){
  console.log('web server listening on port ' + port);
});