import React from "react";
import MapComponent from "./components/Map";
import MainContainer from "./pages/home";

function App() {
    return (
        <div className="App">
            <MapComponent></MapComponent>
            <MainContainer></MainContainer>
        </div>
    );
}

export default App;
