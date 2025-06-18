import './global.css';
import { Menu } from './components/Menu/Menu';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
    return (
        <>
            <Menu />
            <AppRoutes />
        </>
    );
}