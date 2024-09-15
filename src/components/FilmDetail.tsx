import React from 'react';

interface FilmDetailProps {
    title: string;
    director: string;
    producer: string;
    release_date: string;
    opening_crawl: string;
}

const FilmDetail: React.FC<FilmDetailProps> = ({ title, director, producer, release_date, opening_crawl }) => {
    return (
        <div className="card" style={{ width: '30%', marginLeft: '20px' }}>
            <div className="card-header">
                <h4>{title}</h4>
            </div>
            <div className="card-body">
                <p><strong>Director:</strong> {director}</p>
                <p><strong>Producer:</strong> {producer}</p>
                <p><strong>Release Date:</strong> {release_date}</p>
                <p><strong>Opening Crawl:</strong></p>
                <p>{opening_crawl}</p>
            </div>
        </div>
    );
};

export default FilmDetail;
