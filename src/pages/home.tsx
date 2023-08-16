import React, { useState } from "react";
import Header from "../components/Header";
import VerificationBtnList from "../components/VerificationBtnList";
import AirportVerificationComponents from "../components/AirportVerificationComponents";
import SearchInput from "../components/SearchInput";
import VerificationSetting from "../components/VerificationSetting";
import MapSetting from "../components/MapSetting";
import ColorCard from "../components/ColorCard";
// import ModelSelect from "../components/ModelSelect";
// import TimeIntervalSelect from "../components/TimeIntervalSelect";
// import TimeSelect from "../components/TimeSelect";
// import TimeAxis from "../components/TimeAxis";
import AirportVerificationModal from "../components/AirportVerificationModal";
import AreaVerificationModal from "../components/AreaVerificationModal";
import CustomArea from "../components/CustomArea";

import type { stationItem } from "../typings";

type props = {
    onChangeStationList: (list: stationItem[]) => void;
};
export default function MainContainer({ onChangeStationList }: props) {
    // const [stationList, setStationList] = useState<stationItem[]>([]);
    const [type, setType] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isShowCustomArea, setIsShowCustomArea] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleCloseAreaModal = () => {
        setType(1);
    };
    const handleShowModal = () => {
        setIsModalOpen(true);
    };
    const handleChangeType = (num: number) => {
        setType(num);
    };
    const handleShowCustomArea = () => {
        setType(0);
        setIsShowCustomArea(true);
    };
    const handleCloseCustomArea = () => {
        setIsShowCustomArea(false);
    };
    const handleChangeStationList = (list: stationItem[]) => {
        // setStationList(list);
        onChangeStationList(list);
    };
    return (
        <>
            <Header onClick={handleShowModal}></Header>
            <VerificationBtnList type={type} handleChangeType={handleChangeType}></VerificationBtnList>
            {type === 1 && (
                <AirportVerificationComponents
                    onChangeStationList={handleChangeStationList}
                ></AirportVerificationComponents>
            )}
            <SearchInput></SearchInput>
            <VerificationSetting></VerificationSetting>
            <MapSetting></MapSetting>
            <ColorCard></ColorCard>
            <AirportVerificationModal open={isModalOpen} onClose={handleCloseModal}></AirportVerificationModal>
            <AreaVerificationModal
                open={type === 2}
                onClose={handleCloseAreaModal}
                showCustomArea={handleShowCustomArea}
            ></AreaVerificationModal>
            <CustomArea open={isShowCustomArea} onClose={handleCloseCustomArea}></CustomArea>
        </>
    );
}
