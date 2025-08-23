import React from 'react';
import { Outlet } from 'react-router';
import Side from './Side';
import './css/template.scss'; // On va créer ce fichier de style

const Template = () => {
    return (
        <div className="admin-layout">
            <Side />
            <main className="admin-content">
                <Outlet /> {/* C'est ici que les pages du dashboard s'afficheront */}
            </main>
        </div>
    );
};

export default Template;
