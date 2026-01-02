/*
import { useState } from "react";
import "./App.css";

function App() {


    const [formDetails, setFormDetails] = useState({
        text: '',
        contactNum: '',
        email: ''
    })

    const [allForms, setAllForms] = useState([]);

    const changeHandler = (e) => {

        const { name, value } = e.target;

        setFormDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();


        setAllForms(prevForm => ([
            ...prevForm,
            formDetails
        ]))

        console.log(allForms);

        setFormDetails({
            text: '',
            contactNum: '',
            email: ''
        })
    }

    return (
        <div className="App">

            <form onSubmit={submitHandler}>
                <h1>Contact Form</h1>
                <input type="text" placeholder="Enter your name" value={formDetails.text} onChange={changeHandler} />
                <input type="tel" placeholder="Enter your contact no." value={formDetails.contactNum} onChange={changeHandler} />
                <input type="email" placeholder="Enter your email" value={formDetails.email} onChange={changeHandler} />
                <button type="submit">Save</button>
            </form>

            <div className="cards"> hello</div>
        </div>
    );
}

export default App;
*/

import { useState } from "react";
import "./App.css";

function App() {

    const [formDetails, setFormDetails] = useState({
        text: '',
        contactNum: '',
        email: ''
    });

    const localData = JSON.parse(localStorage.getItem('all-users')) || []

    const [allForms, setAllForms] = useState(localData);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const deleteHandler = (index) => {
        console.log(index);

        const copyUserForm = [...allForms];
        copyUserForm.splice(index, 1);

        setAllForms(copyUserForm);
        localStorage.setItem('all-users', JSON.stringify(copyUserForm));
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const oldForms = [...allForms];
        oldForms.push(formDetails);

        setAllForms(oldForms);
        (localStorage.setItem('all-users', JSON.stringify(oldForms)));

        setFormDetails({
            text: '',
            contactNum: '',
            email: ''
        });
    };

    return (
        <div className="App">
            <form onSubmit={submitHandler}>
                <h1>Contact Form</h1>

                <input
                    type="text"
                    name="text"
                    placeholder="Enter your name"
                    value={formDetails.text}
                    onChange={changeHandler}
                />

                <input
                    type="tel"
                    name="contactNum"
                    placeholder="Enter your contact no."
                    value={formDetails.contactNum}
                    onChange={changeHandler}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formDetails.email}
                    onChange={changeHandler}
                />

                <button type="submit">Save</button>
            </form>

            <div className="cards">
                <h1>Contact List</h1>
                {allForms.map((item, index) => (
                    <div key={index} className="card">
                        <p>{item.text}</p>
                        <p>{item.contactNum}</p>
                        <p>{item.email}</p>
                        <button className="remove" onClick={() => deleteHandler(index)}>remove</button>
                    </div>
                ))}


            </div>
        </div>
    );
}

export default App;
