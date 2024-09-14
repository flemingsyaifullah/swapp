// src/App.tsx
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PeopleDetail from './components/PersonDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PeopleList />} />
                <Route path="/people/:id" element={<PeopleDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
