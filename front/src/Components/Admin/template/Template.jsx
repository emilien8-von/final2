import React from 'react';
import { Outlet } from 'react-router';
import Side from './Side';
import './css/template.scss'; 

const Template = () => {
    return (
        <div className="admin-layout">
            <Side />
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Template;
