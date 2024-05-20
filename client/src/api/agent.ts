import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = "http://localhost:5203/";
// axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string, params?: object) => axios.get(url, {params}).then(responseBody)
};


const Recipes = {
    getAll: (name?: string) => requests.get("recipe", { name }),
    getOne: (id: string) => requests.get(`recipe/${id}`)
}

const authorRecipes = {
    getRecipes: (name: string) => requests.get(`author/${name}`)
}

const agent = {
    Recipes,
    authorRecipes
}

export default agent;