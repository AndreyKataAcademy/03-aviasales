import { configureStore } from "@reduxjs/toolkit";

import mainReducer from "./contexts/MainSlice";

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
export default store;
