import React, { useState } from "react";
import MapComponent from "./components/Map";
import MainContainer from "./pages/home";

import type { stationItem } from "./typings";

export default function App() {
    const [stationList, setStationList] = useState<stationItem[]>([]);
    const handleChangeStationList = (list: stationItem[]) => {
        setStationList(list);
    };
    return (
        <div className="App">
            <MapComponent stationList={stationList}></MapComponent>
            <MainContainer onChangeStationList={handleChangeStationList}></MainContainer>
        </div>
    );
}
