import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Library from "./components/Library/Library.tsx";
import {Provider} from "react-redux";
import store from "./redux/store/store";


function App() {

    return (
        <>
            <Provider store={store}>
                <Library/>
            </Provider>
        </>
    )
}




export default App
