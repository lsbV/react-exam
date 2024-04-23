import { FC } from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";


interface LibraryControlsProps {}

const LibraryControls: FC<LibraryControlsProps> = () => {

    return (
        <>
            <div className="d-flex justify-content-between">
                <h2>Library</h2>
                <Button as={"button"} variant={"primary"} >
                    <Link to={"/books/add"} style={{color: "white"}} >Add Book</Link>
                </Button>

            </div>
        </>
    )
};

export default LibraryControls;
