in react -> onchange : in js -> e.target.value

input -> onChange = {(e)=> console.log(e)}

form -> onSubmit = {(e) => {
    e.preventDefault();
    console.log("Form submitted")
}}


using useState and basic variable code to access values:

import { useState } from "react";
import "./App.css";

function App() {

    const [text, setText] = useState('');
    const [contactNum, setContactNum] = useState(0);
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e);
        console.log("form submitted");
    }

    return (
        <div className="App">

            <form>
                <h1>Contact Form</h1>
                <input type="text" placeholder="Enter your name" />
                <input type="tel" placeholder="Enter your contact no." />
                <input type="email" placeholder="Enter your email" />
                <button type="submit" onSubmit={(e) => submitHandler(e)}>Save</button>
            </form>
        </div>
    );
}

export default App;

===========================================================================================================================

using of value in input is important.

because:
- function calling
- resource load setState values
- add in value in input

example: 

import { useState } from "react";
import "./App.css";

function App() {

    const [text, setText] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [email, setEmail] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(text, contactNum, email);

        setText('');
        setContactNum('');
        setEmail('');
    }

    return (
        <div className="App">

            <form onSubmit={submitHandler}>
                <h1>Contact Form</h1>
                <input type="text" placeholder="Enter your name" value={text} onChange={(e) => setText(e.target.value)} />
                <input type="tel" placeholder="Enter your contact no." value={contactNum} onChange={e => setContactNum(e.target.value)} />
                <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <button type="submit">Save</button>
            </form>

            <div className="cards"> hello</div>
        </div>
    );
}

export default App;

==========================================================================================================================================

local storage:

- methods we used : clear(), getItem(key), setItem(key,value), removeItem(key)
- In local storage value will be added in string (format).

problem with array and object in local storage

===============================================================================================

- data flow will be from parent to child : Default
- data flow will be from child to parent : we will learn later