-  <Navbar /> is a self closing component.
we can also write this:
example-1:
    <Navbar> 
        Hello
    </Navbar>

===============================================================================

example-2:
    <Navbar> 
        <h1>Hello</h1>
    </Navbar>

you can pass values, you can see this using props in Navbar components in childern.

-----------------------------------------------------------------------------------------------

useContext : use context is a centeralised data storage and transfer the data to the components which ask for the data.

Essential things to remember:

- create context folder
- create a UserContext.jsx file, if all user data stored in one place.
- create a UserDataContext function to pass the context to the other childerns.
- creating the userDataContext by the hook, createContext() from react.
- export the userDataContext function.
- Use UserDataContext function, needs two thing,
    - UserDataContext.Provider components in nested add the children where the data will be shared.
    - while sharing the data remember the value property, it is arguments which you are sharing.
- The file you want to use the UserDataContext, you can use useContext(add_the_context_in_it) like useContext(UserDataContext) from React, store the useContext() in a variable and use it.