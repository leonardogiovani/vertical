import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import './Layout.css';

export const Layout = () => {
    return (
        <div className="app-layout">
            <main className="app-content">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};
