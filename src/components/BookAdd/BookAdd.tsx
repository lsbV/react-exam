import {FC} from 'react';
import {Button, FloatingLabel, Form, FormCheck} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {Book} from "../../models/Book.ts";
import librarySlice from "../../redux/slices/LibrarySlice.ts";
import {HttpService} from "../../HttpService.ts";
import {useDispatch} from "react-redux";


interface BookAddProps {
}

const BookAdd: FC<BookAddProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function add(e: any) {
        e.preventDefault();
        const form = e.target.form;
        const book = new Book(
            "",
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
        book.id = undefined as any;
        console.log(book);
        const httpService = new HttpService();
        httpService.post<Book>("books", book).then((book) => {
            console.log(book);
            dispatch(librarySlice.actions.addBook(book));
            // move to /
            navigate("/")
        }).catch((error) => {
            console.error(error);
        });
    }


    function generateData(e: any) {
        e.preventDefault();
        const form = document.getElementById("add-form") as any;
        form.title.value = "Title " + Math.random();
        form.author.value = "Author " + Math.random();
        form.publishedDate.value = "2021-01-01";
        form.genre.value = "Genre " + Math.random();
        form.description.value = "Description " + Math.random();
        form.pages.value = Math.floor(Math.random() * 1000);
        form.ISBN.value = Math.floor(Math.random() * 1000000000000);
        form.price.value = Math.floor(Math.random() * 100);
        form.availability.checked = Math.random() > 0.5;
    }

    return (
        <div className="m-3">
            <Link to={"/"}>Back</Link>
            <h1>Add Book</h1>
            <Button as={"button"} variant={"primary"} onClick={generateData}> Generate random data</Button>
            <Form id={"add-form"}>

                <FloatingLabel label={"Title"} className="mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Enter title" required={true}/>
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


                <Button as={"button"} variant={"success"} onClick={add}>Add book</Button>
            </Form>
        </div>
    );
};

export default BookAdd;
