var showBook = function (book) {
    console.log(book);
    document.write("Title: " + book.title + ".<br />");
    document.write("Text: " + book.text + ".<br />");
};
document.write("Type of result of \"showBook\" is " + typeof showBook({
    title: "The bird",
    text: "Book of birds"
}) + ".<br /><br />");
var showMovie = function (movie) {
    console.log(movie);
    document.write("Title: " + movie.title + ".<br />");
    document.write("Text: " + movie.text + ".<br />");
};
var myMovie = {
    title: "Captain america",
    text: "Stories of Mr. Captain america"
};
document.write("Type of result of \"showMovie\" is " + typeof showMovie(myMovie) + ".<br /><br />");
