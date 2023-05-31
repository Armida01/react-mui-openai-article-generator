import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Article Generator
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;