import React from "react";
import Header from "../components/Header";
import VerificationBtnList from "../components/VerificationBtnList";
import AirportVerificationSituation from "../components/AirportVerificationSituation";
import VerificationMethods from "../components/VerificationMethods";

export default function MainContainer() {
    return (
        <>
            <Header></Header>
            <VerificationBtnList type={1}></VerificationBtnList>
            <AirportVerificationSituation></AirportVerificationSituation>
            <VerificationMethods></VerificationMethods>
        </>
    );
}
