const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, "..", "data", "users.json");

const readUserData = async () => {
    try {
        const jsonData = await fs.readFile(FILE_PATH);
        return JSON.parse(jsonData);
    } catch (error) {
        console.log('error: ', error);
    }
};

const saveUserData = async (data) => {
    try {
        const stringifyData = JSON.stringify(data);
        return await fs.writeFile(FILE_PATH, stringifyData);
    } catch (error) {
        console.log('error: ', error);
    }
};

module.exports = { readUserData, saveUserData };