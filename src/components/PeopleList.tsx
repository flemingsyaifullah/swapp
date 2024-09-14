// src/components/PeopleList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Person {
    name: string;
    url: string;
}

const PeopleList: React.FC = () => {
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        axios.get('https://swapi.dev/api/people/')
            .then(response => {
                setPeople(response.data.results);
            })
            .catch(error => {
                console.error("Error fetching people data:", error);
            });
    }, []);

    return (
        <div>
            <h1>People List</h1>
            <ul>
                {people.map((person, index) => (
                    <li key={index}>
                        <Link to={`/people/${index + 1}`}>{person.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PeopleList;
