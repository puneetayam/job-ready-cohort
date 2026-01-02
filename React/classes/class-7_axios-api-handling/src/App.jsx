import "./App.css";
import { useState } from "react";
import axios from "axios";


function User(props) {

  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  return <div className="card" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}>
    <h3>{props.data.category}</h3>
  </div>
}

function App() {

  const [allData, setAllData] = useState([])

  async function getData() {

    const response = await axios.get('https://fakestoreapi.com/products');
    setAllData(response.data);
  }

  return (
    <div>
      <h1>Using Axios for API handling</h1>
      <button onClick={getData}>Get Data</button>
      <div className="cards-list">
        {allData.map((data, idx) => (
          <div key={idx}>
            <User data={data} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;