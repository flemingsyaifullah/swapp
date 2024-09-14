// src/components/PeopleDetail.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Person {
    name: string;
    birth_year: string;
    gender: string;
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

const PeopleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [person, setPerson] = useState<Person | null>(null);
    const [films, setFilms] = useState<Film[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);
    const [starships, setStarships] = useState<Starship[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        axios.get(`https://swapi.dev/api/people/${id}/`)
            .then(response => {
                const personData: Person = response.data;
                setPerson(personData);

                // Fetch films, species, starships, vehicles
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
            })
            .catch(error => {
                console.error("Error fetching person data:", error);
            });
    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <div>
            <h1>{person.name}</h1>
            <p>Birth Year: {person.birth_year}</p>
            <p>Gender: {person.gender}</p>

            <h2>Films</h2>
            <ul>{films.map(film => <li key={film.url}>{film.title}</li>)}</ul>

            <h2>Species</h2>
            <ul>{species.map(sp => <li key={sp.url}>{sp.name}</li>)}</ul>

            <h2>Starships</h2>
            <ul>{starships.map(starship => <li key={starship.url}>{starship.name}</li>)}</ul>

            <h2>Vehicles</h2>
            <ul>{vehicles.map(vehicle => <li key={vehicle.url}>{vehicle.name}</li>)}</ul>
        </div>
    );
};

export default PeopleDetail;
