const wayf = require('./types/kdecole-wayf');

module.exports = (url, account, username, password) => wayf({
    url,
    username,
    password,

    casUrl: 'https://cas.mon-ent-occitanie.fr/',
    idp: 'TOULO-ENT'
});
