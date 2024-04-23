import {FC} from 'react';
import {Book} from "../../models/Book.ts";
import {Link} from "react-router-dom";

interface BookCardProps {
    book: Book
}

// const descriptionLength = 40;




const BookCard: FC<BookCardProps> = (props) => {
    const {book} = props;

    // function getDescription() {
    //     return book.description.length > descriptionLength ? book.description.substring(0, descriptionLength) + "..." : book.description;
    // }


    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.ISBN}</h6>
                {/*<p className="card-text">{getDescription()}</p>*/}
                <span className="card-text">{book.author}</span>
                <Link to={`/books/${book.id}`} className="card-link">View</Link>

            </div>
        </div>
    );
};

export default BookCard;
