import {configureStore} from "@reduxjs/toolkit";
import librarySlice from "../slices/LibrarySlice.ts";

const store = configureStore({
    reducer: {
        library: librarySlice.reducer,
    }
});
export default store;