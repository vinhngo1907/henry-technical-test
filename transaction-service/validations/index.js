const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateMobile = (phone) => {
    const re = /^[+]/g
    return re.test(phone)
}

const validateRegister = (user) => {
    let error = "";
    const { account, username } = user;
    if (!account || !username) {
        error = "Missing username or/and email"
    }
    if (!this.validateEmail(account)) {
        error = "Email format is incorrect"
    }
    return error;
}

module.exports = {
    validateEmail,
    validateMobile,
    validateRegister
}