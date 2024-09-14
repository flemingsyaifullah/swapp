// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PeopleDetail from './components/PersonDetail';

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
