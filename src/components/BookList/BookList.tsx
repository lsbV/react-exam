import React, {FC} from 'react';
import BookCard from "../BookCard/BookCard.tsx";
import {Book} from "../../models/Book.ts";
import {Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {HttpService} from "../../HttpService.ts";
import librarySlice from "../../redux/slices/LibrarySlice.ts";


interface BookListProps {
}

const BookList: FC<BookListProps> = () => {
    const books: Book[] = useSelector((state: any) => state[librarySlice.name].books);
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const httpService = new HttpService();
        httpService.get<Book[]>("books").then((books) => {
            console.log(books);
            dispatch(librarySlice.actions.setBooks(books));
            setLoading(false);
        }).catch((error) => {
            console.error(error);
        });
    }, [dispatch]);



    return (
        <>
            {loading && <p>Loading...</p>}
            <Row>
                {books.map((book: Book) =>
                    <Col key={book.id} sm={4}>
                        <BookCard book={book}/>
                    </Col>
                )}
            </Row>

        </>
    );


};

export default BookList;
