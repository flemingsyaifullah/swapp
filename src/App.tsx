// src/App.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PersonDetail from './components/PersonDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<PeopleList />} />
            <Route path="/people/:id" element={<PersonDetail />} />
        </Routes>
    );
};

export default App;
