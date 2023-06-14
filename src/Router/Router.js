import React, { useRef, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Consultants from '../Pages/consultants';
import Dashboard from '../Pages/dashboard';
import Header from './header';
import styles from './Router.module.css';
import SideMenu from './sideMenu';
import ScrollToTop from '../Hooks/scrollToTop';
import BusinessUnits from '../Pages/businessUnits';
import { Providers, ProviderState } from "@microsoft/mgt";
import { ContextFunction } from '../Context/ContextProvider';
import SharepointTool from '../Pages/sharepointTool';

function RouterComponent() {
    const obj = ContextFunction();
    const { setUser } = obj;

    const scrollRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            let defaultUser = Providers.globalProvider.state === ProviderState.SignedIn ? true : false
            setUser(() => defaultUser);
        }, 300);
    }, [])

    return (
        <>
            <Header />
            <SideMenu />
            <ScrollToTop component={scrollRef} />
            <div className={styles.routesContainer} ref={scrollRef}>
                <Routes>
                    <Route path="/consultants/:name/:id" element={<Dashboard />} />
                    <Route path="/businessunits/:name/:id" element={<Dashboard />} />
                    <Route path="/consultants" element={<Consultants />} />
                    <Route path="/businessunits" element={<BusinessUnits />} />
                    <Route path="/sharepointdatatool" element={<SharepointTool />} />
                </Routes>
            </div>
        </>
    );
}

export default RouterComponent;