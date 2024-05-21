import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, TextField, Box, TableFooter, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { Recipe } from "../models/Recipe";
import { Link } from "react-router-dom";
import { green } from "@mui/material/colors";



export default function RecipeTable() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);


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


    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minWidth="170vh"
                >
                    <Paper sx={{ mb: 2, mt: 1, width: 390 }}>
                        <TextField
                            label='Search in Teo recipes list ...'
                            variant='outlined'
                            fullWidth
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />

                    </Paper>
                </Box>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#808080', fontWeight:'bold'}}>ID</TableCell>
                            <TableCell sx={{ color: '#808080' , fontWeight:'bold'}}>Name</TableCell>
                            <TableCell align="right" sx={{ color: '#808080' , fontWeight:'bold'}}>Author</TableCell>
                            <TableCell align="right" sx={{ color: '#808080' , fontWeight:'bold'}}>numberOfIngredients</TableCell>
                            <TableCell align="right" sx={{ color: '#808080' , fontWeight:'bold'}}>SkillLevel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{border: '7px solid lightblue'}}>
                        {recipes.map((recipe) => (
                            <TableRow
                                key={recipe.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right" sx={{ color:'#808080', fontWeight: 'bold', borderBottom:'3px solid lightblue' }}>{recipe.id}</TableCell>
                                <TableCell component="th" scope="row" sx={{ borderBottom:'3px solid lightblue' }}>
                                    <Button 
                                    title="RECIPE DETAILS"
                                    component={Link} 
                                    to={`/details/${recipe.id}`}
                                    sx={{ backgroundColor: 'lightcoral', color: 'white', mt: 2, '&:hover': { backgroundColor: 'lightblue', color: '#72613E' } }}
                                    >{recipe.name}</Button>
                                </TableCell>
                                <TableCell align="right" sx={{ borderBottom:'3px solid lightblue' }}>
                                    <Button 
                                    title="OTHER RECIPES"
                                    component={Link} 
                                    to={`/authors/${recipe.author}`}
                                    sx={{ backgroundColor: 'lightcoral', color: 'white', mt: 2, '&:hover': { backgroundColor: 'lightblue', color: '#72613E' } }}
                                    >{recipe.author}</Button>
                                </TableCell>
                                <TableCell align="right" sx={{ borderBottom:'3px solid lightblue', color:'#808080', fontWeight: 'bold' }}>{recipe.nr_ingredients}</TableCell>
                                <TableCell align="right" sx={{ borderBottom:'3px solid lightblue', color:'#808080', fontWeight: 'bold' }}>{recipe.skillLevel}</TableCell>
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