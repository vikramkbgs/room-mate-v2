const mysql = require('mysql');
const util = require('util');
const pool = require('../db.js');

const DBConnection = pool;/*.getConnection((err, connection) => {
    if(err) {
        connection.release();
        console.error('DB connection issue', err);
        return;
    }
    connectionSuccessHandler();
    constructDB();
});*/
DBConnection.getConnection((err,connection) => {
    if (err) {
        console.error('There was a problem connecting to the DB', err);
        return;
    }
    connectionSuccessHandler();
    constructDB();
 });


const connectionSuccessHandler = () => {
    console.log('Successful DB connection');
}

const constructDB = async () => {
    try {
        //DBConfirmConnect = util.promisify(pool.query).bind(DBConnection);
        //await DBConfirmConnect();

        const find = await DBQuery('CREATE DATABASE IF NOT EXISTS mainData;');
        console.log('Successfully found or create user mainData');
    } catch(err) {
        console.log('Failed to find or create user table');
    }

    try {
        // const useDatabaseQuery = `USE mainData`;
        const userCheck = 'CREATE TABLE IF NOT EXISTS mainData.user (\
            id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,\
            firstName VARCHAR(30) NOT NULL,\
            lastName VARCHAR(30),\
            age INTEGER NOT NULL,\
            desiredRoommates INTEGER,\
            city VARCHAR(30) NOT NULL,\
            bio VARCHAR(300),\
            gender VARCHAR(7),\
            CONSTRAINT chkGender CHECK (gender IN (\'male\', \'female\')),\
            CONSTRAINT checkAge CHECK (age > 0 and age < 100))';
        const preferenceCheck = 'CREATE TABLE IF NOT EXISTS mainData.prefferences (\
            id INTEGER NOT NULL PRIMARY KEY,\
            housingPref JSON,\
            lifestylePref JSON)';
        await Promise.all(
            [
              DBQuery(userCheck),
              DBQuery(preferenceCheck)
            ]
          );
        console.log('Successfully created or found tables in the DB');
    } catch(err) {
        console.error('Failed to find or create tables');
    }
       // We return two things: a function that lets us run queries, and another to
       // disconnect from the DB at the end of a route
};

const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);

module.exports = DBQuery, constructDB;