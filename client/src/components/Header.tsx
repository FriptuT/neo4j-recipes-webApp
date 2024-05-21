import { AppBar, Container, Toolbar, Typography, Box, Tooltip, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";


export default function Header() {

    return (
        <>
            <AppBar position="static" sx={{ mr: 0, backgroundColor: '#808080' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: "flex" }}>

                        <Box sx={{ flexGrow: 0, ml:-25 }}>
                            <Tooltip title="Me">
                                <IconButton component={Link} to={'header'} sx={{ p: 1 }}>
                                    <Avatar alt="Friptu Teodor" sx={{ width: 150, height: 150 }} src="src/images/eu.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Typography
                            variant="h4"
                            noWrap
                            component={Link}
                            to={'/'}
                            sx={{
                                mr: 10,
                                ml: 5,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                           Teo's Recipes
                        </Typography>




                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}