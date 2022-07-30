import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { PostingProvider } from './context/PostingProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <PostingProvider>
            <App />
        </PostingProvider>
    </AuthProvider>
);
