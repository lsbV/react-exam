import {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import librarySlice from "../../redux/slices/LibrarySlice.ts";
import {Book} from "../../models/Book.ts";
import {Link, useNavigate, useParams} from "react-router-dom";
import {HttpService} from "../../HttpService.ts";
import {Button, Spinner, Stack} from "react-bootstrap";


interface BookPageProps {

}

const BookPage: FC<BookPageProps> = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const books: Book[] = useSelector((state: any) => state[librarySlice.name].books);
    // @ts-ignore
    const book = books.find((book: Book) => book.id == params.id);



    if(!book){
        fetchBook();
    }

    function fetchBook() {
        const httpService = new HttpService();
        httpService.get<Book>(`books/${params.id}`).then((book) => {
            dispatch(librarySlice.actions.addBook(book));
        }).catch((error) => {
            console.error(error);
        });
    }


    function deleteBook() {
        if(!book) return;
        const httpService = new HttpService();
        console.log("Deleting book", book);
        httpService.delete(`books/${book.id}`).then(() => {
            dispatch(librarySlice.actions.removeBook(book.id));
            navigate("/")

        }).catch((error) => {
            console.error(error);
        });

    }

    return (
        <>
            <Link to={"/"}>Back</Link>

            {!book && <div><Spinner animation={"border"} /></div>}
            {book && (
                <div>
                    <Stack>
                        <Link to={`/books/${book.id}/edit`} className="card-link">Edit</Link>

                        <Button as={"button"} variant={"danger"} onClick={deleteBook} className={"w-auto"}>Delete</Button>
                    </Stack>
                    <div>
                        <label>Title:</label>
                        <h5>{book.title}</h5>
                    </div>
                    <div>
                        <label>Author:</label>
                        <h6>{book.author}</h6>
                    </div>

                    <div>
                        <img src={book.coverImage} alt={book.title}/>
                    </div>

                    <div>
                        <label>Published:</label>
                        <span>{book.publishedDate}</span>
                    </div>
                    <div>
                        <label>Genre:</label>
                        <span>{book.genre}</span>
                    </div>

                    <div>
                        <label>ISBN:</label>
                        <span>{book.ISBN}</span>
                    </div>
                    <div>
                        <label>Description:</label>
                        <span>{book.description}</span>
                    </div>
                    <div>
                        <label>Pages:</label>
                        <span>{book.pages}</span>
                    </div>
                    <div>
                        <label>Price:</label>
                        <span>{book.price}</span>
                    </div>

                    <div>
                        <label>Availability:</label>
                        <span>{book.availability ? "Available" : "Not Available"}</span>
                    </div>

                </div>
            )}
        </>
    )
};

export default BookPage;
