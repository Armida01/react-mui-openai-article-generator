import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

// Components
import { Header } from 'components';

const Layouts = () => {
    return (
        <>
            <Header />

            <main>
                <Container sx={{p: 2}}>
                    <Outlet />
                </Container>
            </main>
        </>
    );
};

export default Layouts;