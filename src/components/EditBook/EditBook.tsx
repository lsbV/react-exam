import React, { FC } from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, FloatingLabel, Form, FormCheck} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Book} from "../../models/Book.ts";
import {HttpService} from "../../HttpService.ts";
import librarySlice from "../../redux/slices/LibrarySlice.ts";


interface EditBookProps {}

const EditBook: FC<EditBookProps> = () => {
    const {id} = useParams();
    const book = useSelector((state: any) => state.library.books.find((book: any) => book.id === id));
    const navigate = useNavigate();
    console.log(book);

    const dispatch = useDispatch();
    // setData(book);
    React.useEffect(() => {
        const http = new HttpService();
        http.get<Book>(`books/${id}`).then((book) => {
            setData(book);
        }).catch((error) => {
            console.error(error);
            alert("Book not found")
            navigate("/")
        });
    })
    function edit(e: any) {
        const form = document.getElementById("edit-form") as any;
        e.preventDefault();
        const book = new Book(
            id,
            form.title.value,
            form.author.value,
            form.publishedDate.value,
            form.genre.value,
            form.description.value,
            form.pages.value,
            form.ISBN.value,
            form.price.value,
            form.availability.checked
        );
        const httpService = new HttpService();
        httpService.put<Book>("books/" + id, book).then((book) => {
            console.log(book);
            dispatch(librarySlice.actions.updateBook(book));
            navigate("/")
        }).catch((error) => {
            console.error(error);
        });
    }
    function setData(book:Book) {
        const form = document.getElementById("edit-form") as any;
        form.title.value = book.title;
        form.author.value = book.author;
        form.publishedDate.value = book.publishedDate;
        form.genre.value = book.genre;
        form.description.value = book.description;
        form.pages.value = book.pages;
        form.ISBN.value = book.ISBN;
        form.price.value = book.price;
        form.availability.checked = book.availability;
    }

    return (
        <div className="m-3">
            <Link to={"/"}>Back</Link>
            <h1>Edit Book</h1>
            <Form id={"edit-form"}>

                <FloatingLabel label={"Title"} className="mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Enter title" />
                </FloatingLabel>

                <FloatingLabel label={"Author"} className="mb-3">
                    <input type="text" className="form-control" id="author" placeholder="Enter author"/>
                </FloatingLabel>

                <FloatingLabel label={"Published Date"} className="mb-3">
                    <input type="text" className="form-control" id="publishedDate" placeholder="Enter published date"/>
                </FloatingLabel>

                <FloatingLabel label={"Genre"} className="mb-3">
                    <input type="text" className="form-control" id="genre" placeholder="Enter genre"/>
                </FloatingLabel>

                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="Enter a description" id="description"
                              style={{minHeight: "100px"}}></textarea>
                    <label htmlFor="description">Description</label>
                </div>

                <FloatingLabel label={"Pages"} className="mb-3">
                    <input type="number" className="form-control" id="pages" placeholder="Enter pages"/>
                </FloatingLabel>

                <FloatingLabel label={"ISBN"} className="mb-3">
                    <input type="text" className="form-control" id="ISBN" placeholder="Enter ISBN"/>
                </FloatingLabel>


                <FloatingLabel label={"Price"} className="mb-3">
                    <input type="number" className="form-control" id="price" placeholder="Enter price"/>
                </FloatingLabel>

                <FormCheck type="checkbox" label="Available" id="availability" className="mb-3"/>


                <Button as={"button"} variant={"success"} onClick={edit}>Edit book</Button>
            </Form>
        </div>
    )
};

export default EditBook;
