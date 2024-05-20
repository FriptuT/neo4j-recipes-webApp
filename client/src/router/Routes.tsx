import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage";
import RecipeDetails from "../components/RecipeDetails";
import RecipeTable from "../components/RecipeTable";
import Header from "../components/Header";
import AuthorPage from "../components/AuthorPage";



export const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {path: '', element: <HomePage/>},
            {path: 'header', element: <Header/>},
            {path: 'recipes', element: <RecipeTable/>},
            {path: 'details/:id', element: <RecipeDetails/>},
            {path: 'authors/:name', element: <AuthorPage/>},
        ]
    }
])