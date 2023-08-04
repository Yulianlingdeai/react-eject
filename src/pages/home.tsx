import React, { useState } from "react";
import Header from "../components/Header";
import VerificationBtnList from "../components/VerificationBtnList";
import AirportVerificationSituation from "../components/AirportVerificationSituation";
import VerificationMethods from "../components/VerificationMethods";
import SearchInput from "../components/SearchInput";
import VerificationSetting from "../components/VerificationSetting";
import MapSetting from "../components/MapSetting";
import ColorCard from "../components/ColorCard";
import ModelSelect from "../components/ModelSelect";
import TimeIntervalSelect from "../components/TimeIntervalSelect";
import TimeSelect from "../components/TimeSelect";
import TimeAxis from "../components/TimeAxis";

export default function MainContainer() {
    const [type, setType] = useState(1);
    const handleChangeType = (num: number) => {
        setType(num);
    };
    return (
        <>
            <Header></Header>
            <VerificationBtnList type={type} handleChangeType={handleChangeType}></VerificationBtnList>
            {type === 1 && <AirportVerificationSituation></AirportVerificationSituation>}
            {type === 1 && <VerificationMethods></VerificationMethods>}
            <SearchInput></SearchInput>
            <VerificationSetting></VerificationSetting>
            <MapSetting></MapSetting>
            <ColorCard></ColorCard>
            <ModelSelect></ModelSelect>
            <TimeSelect></TimeSelect>
            <TimeIntervalSelect></TimeIntervalSelect>
            <TimeAxis></TimeAxis>
        </>
    );
}
