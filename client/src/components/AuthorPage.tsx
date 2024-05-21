import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthorRecipes } from "../models/authorRecipes";
import agent from "../api/agent";


export default function AuthorPage() {
    const [authorRecipes, setAuthorRecipes] = useState<AuthorRecipes[]>([]);
    const { name } = useParams();

    useEffect(() => {
        agent.authorRecipes.getRecipes(name!).then(recipes => setAuthorRecipes(recipes))
    }, []);

    return (
        <>
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography variant="h5" align="center" gutterBottom sx={{ color: '#FDA7A7', fontWeight: 'bold' }}>
                    OTHER {name}'s RECIPES
                </Typography>

                <Button
                    component={Link}
                    to={'/'}
                    sx={{ backgroundColor: 'lightcoral', color: 'white', mt: 2, '&:hover': { backgroundColor: 'lightblue', color: 'black' } }}
                >
                    Back to Recipes
                </Button>

                <TableContainer component={Paper} sx={{ border: '7px solid lightblue' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#FDA7A7', fontWeight: 'bold' }}>Recipe Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authorRecipes.map((recipe, index) => (
                                <TableRow key={index}>
                                    <TableCell>{recipe.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                
            </Box>
        </>
    )
}