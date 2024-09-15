import React from 'react';

interface TabProps {
    films: { title: string; release_date: string; url: string }[];
    species: { name: string; url: string }[];
    starships: { name: string; url: string }[];
    vehicles: { name: string; url: string }[];
}

const Tabs: React.FC<TabProps> = ({ films, species, starships, vehicles }) => {
    return (
        <div>
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
                                    <th>Release Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {films.map((film, index) => (
                                    <tr key={film.url + index}>
                                        <td>{index + 1}</td>
                                        <td>{film.title}</td>
                                        <td>{film.release_date}</td>
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
    );
};

export default Tabs;
