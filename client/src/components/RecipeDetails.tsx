import { Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
             <Typography variant="h5" align="center" gutterBottom>
                    Recipe Details
                </Typography>
            <Card>
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Attribute</TableCell>
                                <TableCell>Value</TableCell>
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
            <Button component={Link} to="/">Back to Recipes</Button>
        </Fragment>

    )


}