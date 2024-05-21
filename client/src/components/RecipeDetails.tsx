import { Box, Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { RecipeDetail } from "../models/RecipeDetail";
import agent from "../api/agent";
import { Link, useParams } from "react-router-dom";


export default function RecipeDetails() {
    const { id } = useParams();
    const [recipeDetail, setRecipeDetail] = useState<RecipeDetail>();

    useEffect(() => {
        agent.Recipes.getOne(id!).then(recipe => setRecipeDetail(recipe))
    }, []);
    return (
        <Fragment>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h5" align="center" gutterBottom sx={{ color: 'lightblue' }}>
                    Recipe Details
                </Typography>
                <Button 
                component={Link} to="/" 
                sx={{ backgroundColor: 'lightcoral', color: 'white', mt: 2, '&:hover': { backgroundColor: 'lightblue', color: 'black' } }}
                >Back to Recipes</Button>
            </Box>

            <Card sx={{ backgroundColor: 'lightyellow' }}>
                <CardContent>
                    <TableContainer component={Paper} sx={{ backgroundColor: 'lightblue' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: 'lightblue' }}>Attribute</TableCell>
                                    <TableCell sx={{ backgroundColor: 'lightblue' }}>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>{recipeDetail?.id}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>{recipeDetail?.description}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Cooking Time</TableCell>
                                    <TableCell>{recipeDetail?.cookingTime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Preparation Time</TableCell>
                                    <TableCell>{recipeDetail?.preparationTime}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Ingredients</TableCell>
                                    <TableCell>
                                        <ul>
                                            {recipeDetail?.ingredients.map((ingredient, index) => (
                                                <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

        </Fragment>

    )


}