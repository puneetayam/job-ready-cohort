what we are using ? 
    ans: useState
where it is present? 
    ans: in react module
why we use it? 
    ans: for state management
we have variable then what problem will occur? 
    ans: because we are directly interacting with real dom, react is using with virtual dom so we have to use given hook to manage the state of the variable.

what is the difference between js variable (let,const, var) and useState hook?
    ans: we create a component using function. In each function call it, recreates a memory, loads a variables and inner functions. So, in this case previous variable state got vanished and recreates, so don't have the access of previous state, that's why we use "useState" hook.