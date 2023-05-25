import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from "../modules/employee/redux/employeeReducer";
import employeePageDetailReducer from "../modules/employee/redux/employeePageDetalReducer";
import CreateOrUpdateReducer from "../modules/createAndUpdate/redux/CreateOrUpdateReducer";


const store = configureStore({
    reducer: {
        employeeData: employeeReducer,
        employeePageDetail: employeePageDetailReducer,
        CreatOrUpdate:CreateOrUpdateReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
