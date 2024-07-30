module.exports = func => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};
//if u forget to write product name or descrption