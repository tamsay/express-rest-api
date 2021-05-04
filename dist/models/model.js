"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.createNewEntry = exports.getSingleEntry = exports.getAllData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbFilePath = path_1.default.resolve(__dirname, "../database.json");
const database = require('../database.json');
/**
 * @description This checks if the database file exists and creates one if it doesn't
 * @param dbFilePath
 */
const fileExists = fs_1.default.existsSync(dbFilePath);
if (!fileExists) {
    fs_1.default.appendFileSync("database.json", JSON.stringify([]));
}
// This code block returns all the entries in the database
const getAllData = () => {
    return new Promise((resolve, reject) => {
        if (database.length === 0) {
            reject({ message: 'Database is empty, create a new profile' });
        }
        else {
            resolve(JSON.stringify(database.sort((a, b) => a.id - b.id)));
        }
    });
};
exports.getAllData = getAllData;
// This code block returns a single entry based on the id provided
const getSingleEntry = (id) => {
    return new Promise((resolve, reject) => {
        if (database.length === 0) {
            reject({ message: 'Database is empty, create a new profile' });
        }
        else {
            const matchedEntry = database.find((element) => {
                return (element.id) === (Number(id));
            });
            const matchedIndex = database.findIndex((element) => (element.id) === (Number(id)));
            resolve(JSON.stringify({ index: matchedIndex, entry: matchedEntry }));
        }
    });
};
exports.getSingleEntry = getSingleEntry;
// This code block creates a new entry in the database
const createNewEntry = (details) => {
    return new Promise((resolve, reject) => {
        if (database.length === 0) {
            const date = new Date().toString().split(' ').splice(0, 5).join(' ');
            const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, id } = details;
            const newEntry = {
                organization, createdAt: date, updatedAt: date, products, marketValue, address, ceo, country, noOfEmployees, employees, id
            };
            database.push(newEntry);
            writeDataToFile(dbFilePath, database);
            resolve(JSON.stringify(newEntry));
        }
        else {
            const duplicateID = database.find((element) => element.id === Number(details.id));
            if (!duplicateID) {
                const date = new Date().toString().split(' ').splice(0, 5).join(' ');
                const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees, id } = details;
                const newEntry = {
                    organization, createdAt: date, updatedAt: date, products, marketValue, address, ceo, country, noOfEmployees, employees, id
                };
                database.push(newEntry);
                writeDataToFile(dbFilePath, database);
                resolve(JSON.stringify(newEntry));
            }
            else {
                resolve(JSON.stringify({ message: 'Duplicate ID Found; New profile is not created; Try with another ID' }));
            }
        }
    });
};
exports.createNewEntry = createNewEntry;
// This code block updates an entry/profile in the database
const updateProfile = (details, index) => {
    return new Promise((resolve, reject) => {
        const date = new Date().toString().split(' ').splice(0, 5).join(' ');
        const oldDetails = database[index];
        const { organization, products, marketValue, address, ceo, country, noOfEmployees, employees } = details;
        oldDetails.id;
        oldDetails.organization = organization || oldDetails.organization;
        oldDetails.updatedAt = date;
        oldDetails.products = products || oldDetails.products;
        oldDetails.marketValue = marketValue || oldDetails.marketValue;
        oldDetails.address = address || oldDetails.address;
        oldDetails.noOfEmployees = noOfEmployees;
        oldDetails.ceo = ceo;
        oldDetails.country = country;
        oldDetails.employees = employees || oldDetails.employees;
        writeDataToFile(dbFilePath, database);
        resolve(JSON.stringify(oldDetails));
    });
};
exports.updateProfile = updateProfile;
// This code block deletes an entry/profile from the database
const deleteProfile = (index, ceo, id) => {
    return new Promise((resolve, reject) => {
        database.splice(index, 1);
        writeDataToFile(dbFilePath, database);
        resolve(JSON.stringify({ message: `${ceo} with ID: ${id} successfully removed from the database` }));
    });
};
exports.deleteProfile = deleteProfile;
// This code block writes the current database to the database file
function writeDataToFile(dbPath, content) {
    fs_1.default.writeFile(dbPath, JSON.stringify(content, null, 2), { encoding: 'utf-8' }, (err) => {
        if (err) {
            console.log(err, 'write to db error');
        }
    });
}
