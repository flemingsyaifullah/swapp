import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_URLS } from '../api';
import Tabs from './Tabs';
import Loading from './Loading';

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

const PersonDetail: React.FC = () => {
    const { id = '0' } = useParams<{ id: string }>();
    const [person, setPerson] = useState<Person | null>(null);
    const [films, setFilms] = useState<{ title: string; release_date: string; url: string }[]>([]);
    const [species, setSpecies] = useState<{ name: string; url: string }[]>([]);
    const [starships, setStarships] = useState<{ name: string; url: string }[]>([]);
    const [vehicles, setVehicles] = useState<{ name: string; url: string }[]>([]);
    const [homeworld, setHomeworld] = useState<{ name: string; url: string } | null>(null);

    useEffect(() => {
        axios.get(API_URLS.people(id))
            .then(response => {
                const personData: Person = response.data;
                setPerson(personData);

                // Fetch related data
                personData.films.forEach(url => {
                    axios.get(url).then(res => {
                        setFilms(prev => {
                            if (!prev.some(film => film.url === url)) {
                                return [...prev, res.data];
                            }
                            return prev;
                        });
                    });
                });

                personData.species.forEach(url => {
                    axios.get(url).then(res => {
                        setSpecies(prev => {
                            if (!prev.some(sp => sp.url === url)) {
                                return [...prev, res.data];
                            }
                            return prev;
                        });
                    });
                });

                personData.starships.forEach(url => {
                    axios.get(url).then(res => {
                        setStarships(prev => {
                            if (!prev.some(starship => starship.url === url)) {
                                return [...prev, res.data];
                            }
                            return prev;
                        });
                    });
                });

                personData.vehicles.forEach(url => {
                    axios.get(url).then(res => {
                        setVehicles(prev => {
                            if (!prev.some(vehicle => vehicle.url === url)) {
                                return [...prev, res.data];
                            }
                            return prev;
                        });
                    });
                });

                axios.get(API_URLS.homeworld(personData.homeworld)).then(res => setHomeworld(res.data));
            })
            .catch(error => {
                console.error("Error fetching person data:", error);
            });
    }, [id]);

    if (!person) return <div><Loading /></div>;

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

                    {/* Use the Tabs component */}
                    <Tabs films={films} species={species} starships={starships} vehicles={vehicles} />
                </div>
            </div>
        </div>
    );
};

export default PersonDetail;
