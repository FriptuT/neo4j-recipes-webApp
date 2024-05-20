import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { Recipe } from "../models/Recipe";
import { Link, NavLink, useNavigate } from "react-router-dom";



export default function RecipeTable() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchName, setSearchName] = useState('');


    const fetchRecipes = async (name?: string) => {
        try{
            const recipes = await agent.Recipes.getAll(name);
            setRecipes(recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        fetchRecipes(searchName);
    }, [searchName])

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2, mt:1 }}>
                    <TextField
                        label='Search recipes'
                        variant='outlined'
                        fullWidth
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </Paper>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">numberOfIngredients</TableCell>
                            <TableCell align="right">SkillLevel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.map((recipe) => (
                            <TableRow
                                key={recipe.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{recipe.id}</TableCell>
                                <TableCell component="th" scope="row">
                                    <Button component={Link} to={`/details/${recipe.id}`}>{recipe.name}</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button component={Link} to={`/authors/${recipe.author}`}>{recipe.author}</Button>
                                </TableCell>
                                <TableCell align="right">{recipe.nr_ingredients}</TableCell>
                                <TableCell align="right">{recipe.skillLevel}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}


// description, cooking time, preparation time, ingredients