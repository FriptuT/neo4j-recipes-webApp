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
                <Typography variant="h5" align="center" gutterBottom>
                    OTHER {name}'s RECIPES
                </Typography>

                <Button
                    component={Link}
                    to={'/'}
                    sx={{ marginTop: 2, backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'blue', color: 'white' } }}
                >
                    Back to Recipes
                </Button>

                <TableContainer component={Paper} sx={{ border: '2px solid blue' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: 'red', fontWeight: 'bold' }}>Recipe Name</TableCell>
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