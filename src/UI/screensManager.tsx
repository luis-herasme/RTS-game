import { MainWindow } from './mainWindow';
import React, { useState, createContext } from 'react';
// import { GameWindow } from "./gameWindow"
export const PageContext = createContext({} as (page: any) => () => void);

export function ScreensManager() {
    const [pageSelected, setPageSelected] = useState(<MainWindow />);
    const goTo = (page) => () => setPageSelected(page);

    return <PageContext.Provider value={goTo}>{pageSelected}</PageContext.Provider>;
}
