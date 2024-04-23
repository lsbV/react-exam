import {createSlice} from "@reduxjs/toolkit";
import {Book} from "../../models/Book.ts";
import {HttpService} from "../../HttpService.ts";


const name = "library";


const initialState: {
    books: Book[],
} = {
    books: [],
}


const librarySlice = createSlice({
    name,
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload);
        },
        setBooks: (state, action) => {
            state.books = action.payload;
        },
        removeBook: (state, action) => {
            state.books = state.books.filter((book: Book) => book.id !== action.payload);
        },
        updateBook: (state, action) => {
            state.books = state.books.map((book: Book) => {
                if (book.id === action.payload.id) {
                    book = action.payload;
                }
                return book;
            });
        },
        loadBook: (state, action) => {
            const http = new HttpService();
            console.log(action.payload, "loadBook", state.books);

            http.get<Book>(`books/${action.payload}`).then((book) => {
                state.books.push(book);
            }).catch((error) => {
                console.error(error);
            });
        }
    }
});


export default librarySlice;