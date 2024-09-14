// src/components/PeopleDetail.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    gender: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    homeworld: string;
    films: string[];
    species: string[];
    starships: string[];
    vehicles: string[];
}

interface Film {
    title: string;
    url: string;
}

interface Species {
    name: string;
    url: string;
}

interface Starship {
    name: string;
    url: string;
}

interface Vehicle {
    name: string;
    url: string;
}

interface Homeworld {
    name: string;
    url: string;
}

const PeopleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<Person | null>(null);
    const [films, setFilms] = useState<Film[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);
    const [starships, setStarships] = useState<Starship[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [homeworld, setHomeworld] = useState<Homeworld | null>(null);

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}/`)
            .then(response => {
                const personData: Person = response.data;
                setPerson(personData);

                // Fetch related data
                personData.films.forEach(url => {
                    axios.get(url).then(res => setFilms(prev => [...prev, res.data]));
                });
                personData.species.forEach(url => {
                    axios.get(url).then(res => setSpecies(prev => [...prev, res.data]));
                });
                personData.starships.forEach(url => {
                    axios.get(url).then(res => setStarships(prev => [...prev, res.data]));
                });
                personData.vehicles.forEach(url => {
                    axios.get(url).then(res => setVehicles(prev => [...prev, res.data]));
                });
                axios.get(personData.homeworld).then(res => setHomeworld(res.data));
            })
            .catch(error => {
                console.error("Error fetching person data:", error);
            });
    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>{person.name}</h2>
                    <Link
                        to="/"
                        className="btn"
                        style={{ backgroundColor: 'orange', color: 'white' }}
                    >
                        Back to People List
                    </Link>
                </div>
                <div className="card-body">
                    <p><strong>Birth Year:</strong> {person.birth_year}</p>
                    <p><strong>Gender:</strong> {person.gender}</p>
                    <p><strong>Height:</strong> {person.height} cm</p>
                    <p><strong>Mass:</strong> {person.mass} kg</p>
                    <p><strong>Hair Color:</strong> {person.hair_color}</p>
                    <p><strong>Skin Color:</strong> {person.skin_color}</p>
                    <p><strong>Eye Color:</strong> {person.eye_color}</p>
                    <p><strong>Homeworld:</strong> {homeworld ? homeworld.name : 'Loading...'}</p>

                    {/* Bootstrap Tabs */}
                    <ul className="nav nav-tabs" id="personTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="films-tab" data-bs-toggle="tab" data-bs-target="#films" type="button" role="tab" aria-controls="films" aria-selected="true" style={{ color: 'orange' }}>Films</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="species-tab" data-bs-toggle="tab" data-bs-target="#species" type="button" role="tab" aria-controls="species" aria-selected="false" style={{ color: 'orange' }}>Species</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="starships-tab" data-bs-toggle="tab" data-bs-target="#starships" type="button" role="tab" aria-controls="starships" aria-selected="false" style={{ color: 'orange' }}>Starships</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="vehicles-tab" data-bs-toggle="tab" data-bs-target="#vehicles" type="button" role="tab" aria-controls="vehicles" aria-selected="false" style={{ color: 'orange' }}>Vehicles</button>
                        </li>
                    </ul>
                    <div className="tab-content mt-3" id="personTabsContent">
                        {/* Films Tab */}
                        <div className="tab-pane fade show active" id="films" role="tabpanel" aria-labelledby="films-tab">
                            {films.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Title</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {films.map((film, index) => (
                                            <tr key={film.url + index}>
                                                <td>{index + 1}</td>
                                                <td>{film.title}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : <p>No films available.</p>}
                        </div>

                        {/* Species Tab */}
                        <div className="tab-pane fade" id="species" role="tabpanel" aria-labelledby="species-tab">
                            {species.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {species.map((sp, index) => (
                                            <tr key={sp.url + index}>
                                                <td>{index + 1}</td>
                                                <td>{sp.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : <p>No species available.</p>}
                        </div>

                        {/* Starships Tab */}
                        <div className="tab-pane fade" id="starships" role="tabpanel" aria-labelledby="starships-tab">
                            {starships.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {starships.map((starship, index) => (
                                            <tr key={starship.url + index}>
                                                <td>{index + 1}</td>
                                                <td>{starship.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : <p>No starships available.</p>}
                        </div>

                        {/* Vehicles Tab */}
                        <div className="tab-pane fade" id="vehicles" role="tabpanel" aria-labelledby="vehicles-tab">
                            {vehicles.length > 0 ? (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vehicles.map((vehicle, index) => (
                                            <tr key={vehicle.url + index}>
                                                <td>{index + 1}</td>
                                                <td>{vehicle.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : <p>No vehicles available.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeopleDetail;
