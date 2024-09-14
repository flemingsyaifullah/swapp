// src/components/PeopleList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    gender: string;
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
        <div className="container mt-4">
            <h1>People List</h1>
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Birth Year</th>
                        <th>Gender</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map((person, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{person.name}</td>
                            <td>{person.birth_year}</td>
                            <td>{person.gender}</td>
                            <td>
                                <Link to={`/people/${index + 1}`} className="btn btn-sm"
                                    style={{ backgroundColor: 'orange', color: 'white' }}>
                                    View Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PeopleList;
