const showBook = (book: {title: string; text: string;}): void => {
    console.log(book);
    document.write(`Title: ${book.title}.<br />`);
    document.write(`Text: ${book.text}.<br />`);
}
document.write(`Type of result of "showBook" is ${typeof showBook({
    title: "The bird",
    text: "Book of birds"
})}.<br /><br />`);


//Interface is like a defined object
interface IMovie{
    title: string;
    text: string;
}
const showMovie = (movie: IMovie): void => {
    console.log(movie);
    document.write(`Title: ${movie.title}.<br />`);
    document.write(`Text: ${movie.text}.<br />`);
}
let myMovie: IMovie = {
    title: "Captain america",
    text: "Stories of Mr. Captain america"
};
document.write(`Type of result of "showMovie" is ${typeof showMovie(myMovie)}.<br /><br />`);