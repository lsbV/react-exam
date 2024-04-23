import {Provider} from 'react-redux';
import store from "../../redux/store/store.ts";
import {RouterProvider} from "react-router-dom";
import router from "../../router.tsx";


function Root() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default Root;