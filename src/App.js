import React from "react";
import "./App.css";
import picto2 from "./picto2.png";
import picto3 from "./picto3.png";
import picto4 from "./picto4.png";

import "./FormComponent.js";
import FormComponent from "./FormComponent.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={picto2} className="picto picto2" alt="" />
        <h1>Thanks Giving!</h1>
      </header>
      <div className="App-wrapper">
        <img src={picto3} className="picto picto3" alt="" />
        <FormComponent />
      </div>
      <img src={picto4} className="picto picto4" alt="" />
    </div>
  );
}

export default App;
