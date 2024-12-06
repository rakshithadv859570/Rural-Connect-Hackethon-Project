// src/Services.jsx
import React from 'react';

function Services() {
    // Dummy services data
    const dummyServices = [
        {
            id: 1,
            name: 'Agricultural Support',
            description: 'Access to subsidies and support for local farmers.',
        },
        {
            id: 2,
            name: 'Health Care Services',
            description: 'Free health check-ups and medical facilities for villagers.',
        },
        {
            id: 3,
            name: 'Education Programs',
            description: 'Various educational initiatives for children and adults.',
        },
        {
            id: 4,
            name: 'Financial Assistance',
            description: 'Support for small businesses and loans at low interest.',
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Available Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dummyServices.map((service) => (
                    <div key={service.id} className="bg-white shadow-lg rounded-lg p-4 border border-green-300">
                        <h2 className="text-lg font-semibold text-green-700">{service.name}</h2>
                        <p className="text-gray-700">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
