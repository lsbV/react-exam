import {FC} from 'react';
import LibraryControls from "../LibraryControls/LibraryControls.tsx";
import BookList from "../BookList/BookList.tsx";


interface LibraryProps {
}

const Library: FC<LibraryProps> = () => {


    return (
        <>
            <LibraryControls/>
                <BookList/>

        </>
    );

};


export default Library;
