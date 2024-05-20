import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField, Chip, Box, TableFooter, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { Recipe } from "../models/Recipe";
import { Link, NavLink, useNavigate } from "react-router-dom";



export default function RecipeTable() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);


    // state for filtering
    // const [ingredient, setIngredient] = useState('');
    // const [ingredients, setIngredients] = useState<string[]>([]);


    const fetchRecipes = async (name: string, page: number, pageSize: number) => {
        try {
            const recipes = await agent.Recipes.getAll({ name, page: page + 1, pageSize });
            setRecipes(recipes);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    useEffect(() => {
        fetchRecipes(searchName, page, rowsPerPage);
    }, [searchName, page, rowsPerPage]);


    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 20));
        setPage(0);
    };

    // functions for filtering by ingredients
    // const AddIngredient = () => {
    //     if (ingredient && !ingredients.includes(ingredient)) {
    //         setIngredients([...ingredients, ingredient]);
    //         setIngredient('');
    //     }
    // };

    // const RemoveIngredient = (ingredientToRemove: any) => {
    //     setIngredients(ingredients.filter(i => i !== ingredientToRemove));
    // }

    // const handleKeyDown = (e: any) => {
    //     if (e.key === 'Enter') {
    //         AddIngredient();
    //     }
    // };

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2, mt: 1 }}>
                    <TextField
                        label='Search recipes'
                        variant='outlined'
                        fullWidth
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    {/* <TextField
                        label='Add ingredient filter'
                        variant='outlined'
                        fullWidth
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={AddIngredient} variant="contained" sx={{ mt: 2 }}>
                        Add Ingredient
                    </Button>
                    <Box sx={{ mt: 2 }}>
                        {ingredients.map((ing, index) => (
                            <Chip
                                key={index}
                                label={ing}
                                onDelete={() => RemoveIngredient(ing)}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box> */}
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
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Box display="flex" justifyContent="center">
                                    <TablePagination
                                        rowsPerPageOptions={[20]}
                                        colSpan={4}
                                        count={-1}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`}
                                        labelRowsPerPage="Rows per page"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    );
}


// description, cooking time, preparation time, ingredients