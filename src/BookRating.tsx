import { AuthProvider } from './context/auth/AuthProvider';
import { BooksProvider } from './context/file/BooksProvider';
import './index.css';
import { AppRouter } from './router/AppRouter';

export const BookRating = () => {
    return (
        <AuthProvider>
            <BooksProvider>
                <AppRouter />
            </BooksProvider>
        </AuthProvider>
    );
};
