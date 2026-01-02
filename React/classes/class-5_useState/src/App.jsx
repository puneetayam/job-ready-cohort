import { useState } from "react";
import "./app.css";

function App() {

  const maleName = [
    "Aarav", "Arjun", "Anubhav", "Abhishek", "Aditya",
    "Bharat", "Deepak", "Harry", "Ishaan", "Kabir",
    "Karan", "Manish", "Nitin", "Pranav", "Rahul",
    "Sarthak", "Siddharth", "Tushar", "Varun", "Vivek"
  ];
  const femaleName = [
    "Aavya", "Alia", "Ananya", "Diya", "Disha",
    "Ishani", "Isha", "Kavya", "Kiara", "Myra",
    "Navya", "Priya", "Riya", "Saanvi", "Sara",
    "Shraddha", "Sneha", "Sunidhi", "Tanvi", "Zoya"
  ];
  const [maleIndex, setMaleIndex] = useState(0);
  const [femaleIndex, setFemaleIndex] = useState(0);


  function randomMatch() {

    setMaleIndex(Math.floor(Math.random() * maleName.length));
    setFemaleIndex(Math.floor(Math.random() * femaleName.length));
  }

  return (
    <div className="app">
      <h1><span>{maleName[maleIndex]}</span> X <span>{femaleName[femaleIndex]}.</span></h1>
      <button onClick={randomMatch}>random match</button>
    </div>
  )
}

export default App;