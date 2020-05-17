export const validateEmail = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email) !== false;

};

export const validatePassword = (password) => {
    return password.length >= 8;
};
