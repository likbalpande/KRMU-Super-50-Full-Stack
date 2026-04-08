const signupController = () => {
    // {email, password}
    // password --> hash (bcrypt)
    // user create in DB
};

const loginController = () => {
    // {email, password}
    // password --> hash (match)
    // token
    //    --> {email, userId} + secret --> token
    // send token in cookie
};
