import React, { useState } from 'react'
import axios from "axios";
import "./App.css";

function App() {

  const [allProductData, setAllProductData] = useState([]);

  async function getAllProductData() {

    const response = await axios.get("https://fakestoreapi.com/products");
    setAllProductData(response.data);
    console.log(allProductData);
  }


  return (
    <div className='main'>
      <button onClick={getAllProductData}>getData</button>
      <div className="allProducts">
        {allProductData.map((product, index) => {



          <a className='product' href="#" key={index}>
            <div>
              < img src={product.image} alt="" />
              <h2>{product.title}</h2>
            </div>
          </a>
        })}
      </div>
    </div >
  )
}

export default App