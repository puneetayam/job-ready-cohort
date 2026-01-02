
function errorReact() {
    let h1 = React.createElement('h1', null, "Hey React, Nice to meet you buddy");

    let main = document.querySelector('main');
    main.appendChild(h1);

    let root = ReactDOM.createRoot(main);

    root.render(h1);
}

function correctReact() {

    let h1 = React.createElement('h1', null, "Hey React, Nice to meet you buddy");
    let main = document.querySelector('main');
    let root = ReactDOM.createRoot(main);
    root.render(h1);
}

function renderingMultipleElementInRoot() {


    function errorInRendering() {
        let h1 = React.createElement('h1', null, "Hey React, This is H1 Nice to meet you buddy");
        let h2 = React.createElement('h2', null, "Hey React, This is H2 Nice to meet you buddy");
        let main = document.querySelector('main');
        let root = ReactDOM.createRoot(main);
        root.render(h1, h2);// error: You passed a second argument to root.render(...) but it only accepts one argument.
    }

    function usingArrayForMultipleFileRendering() {
        let h1 = React.createElement('h1', null, "Hey React, This is H1 Nice to meet you buddy");
        let h2 = React.createElement('h2', null, "Hey React, This is H2 Nice to meet you buddy");
        let main = document.querySelector('main');
        let root = ReactDOM.createRoot(main);
        root.render([h1, h2]);// Warning: Each child in a list should have a unique "key" prop
    }

    function usingParentElementAndAddElements() {
        let h1 = React.createElement('h1', null, "Hey React, This is H1 Nice to meet you buddy");
        let h2 = React.createElement('h2', null, "Hey React, This is H2 Nice to meet you buddy");
        let parent = React.createElement('div', { className: "parent" }, h1, h2);
        let main = document.querySelector('main');
        let root = ReactDOM.createRoot(main);
        root.render(parent);
    }


}