useEffect: 
    - The useEffect hook in React allows you to perform side effects in function components. 
    It replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount in class components.

useEffect: 
    use hota h kisi bhi task ko side stack me chalata h

=============================================

react process:
    - main process - UI banana and render krna -> in main stack
    - Data insert - Data load krna khi se leke like (API) -> in side stack

=============================================

useEffect defination:

- useEffect(callbackFunction) : runs everytime when parent fnc. get call/render UI
- useEffect(callbackFunction,[]) : runs only one time because of empty array ([]).
- useEffect(callbackFunction,[dependency1, dependency2,...]) : runs only when there is change in dependency