import { useEffect, useState } from "react";
import "./App.css";

const App = () => {

  const [counter, setCounter] = useState(0);
  const [text, setText] = useState('');

  // useEffect(() => console.log("useEffect is running...")) # error: call everytime whenever any UI render
  // useEffect(() => console.log("useEffect is running..."), []); # run only at initial one not the change of data in UI

  // now, useEffect only run when their is a change in counter useState.
  useEffect(() => console.log("useEffect is running with dependencies"), [counter])


  return (
    <div className="wrapper">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>increase</button>
    </div>)
}

export default App;