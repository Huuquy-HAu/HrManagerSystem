import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from "../modules/employee/redux/employeeReducer";
import employeePageDetailReducer from "../modules/employee/redux/employeePageDetalReducer";
import CreateOrUpdateReducer from "../modules/createAndUpdate/redux/CreateOrUpdateReducer";
import DepartmentReducer from "../modules/createAndUpdate/redux/DepartmentReducer";


const store = configureStore({
    reducer: {
        employeeData: employeeReducer,
        employeePageDetail: employeePageDetailReducer,
        CreatOrUpdate:CreateOrUpdateReducer,
        DepartmentData: DepartmentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
