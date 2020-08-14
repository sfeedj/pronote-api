#!/usr/bin/env node

/* eslint no-console: off */
/* eslint no-unused-vars: off */

const pronote = require('..');

if (process.argv.length < 5) {
    console.log('Syntax: pronote-fetch <URL> <username> <password> [cas/type(ex: parent)]');
    return;
}

const [,, url, username, password, cas = 'none'] = process.argv;

async function fetch()
{
    const session = await pronote.login(url, username, password, cas);
    console.log(`Logged as '${session.user.name}' (${session.user.studentClass.name})`);

    const timetable = await session.timetable(new Date(2020, 8, 1));
    const marks = await session.marks('Trimestre 1');
    const skill = await session.skill();

    // TODO

    console.log("Timetable : "+timetable);
    console.log("Marks : "+marks);
    console.log("Skill : "+skill)
}

fetch().catch(err => {
    if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
        return console.error('Invalid credentials, did you chose the right CAS ?');
    }

    console.error(err);
});
