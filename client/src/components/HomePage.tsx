import { Fragment } from "react/jsx-runtime";
import Header from "./Header";
import RecipeTable from "./RecipeTable";
import { Outlet } from "react-router-dom";


export default function HomePage() {

    return (
        <Fragment>
            <Header/>
            <RecipeTable />
        </Fragment>
    )
}