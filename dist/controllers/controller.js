"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntry = exports.updateEntry = exports.createEntry = exports.getSingleDatabaseEntry = exports.getAllDatabaseEntry = void 0;
const model_1 = require("../models/model");
/**
 * @description Returns all the entries in the database
 * @param req Incoming request parameter
 * @param res Outgoing response result
 * @route GET /
 * @returns It returns a string
 */
const getAllDatabaseEntry = async (req, res) => {
    try {
        const data = await model_1.getAllData();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(data);
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
    }
};
exports.getAllDatabaseEntry = getAllDatabaseEntry;
/**
 * @description Gets the details of a particular entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @param entryId Entry ID to be searched in the database
 * @route GET /:id
 */
const getSingleDatabaseEntry = async (req, res, entryId) => {
    try {
        const output = await model_1.getSingleEntry(entryId);
        const result = JSON.parse(output);
        if (result.index === -1) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'ID not found in the database' }));
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end((JSON.stringify(result.entry)));
        }
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
    }
};
exports.getSingleDatabaseEntry = getSingleDatabaseEntry;
/**
 * @description Creates an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @route POST /
 */
const createEntry = async (req, res) => {
    try {
        const output = JSON.stringify(req.body);
        const body = JSON.parse(output);
        const newEntry = await model_1.createNewEntry(body);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(newEntry);
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
};
exports.createEntry = createEntry;
/**
 * @description Updates an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @param id Entry ID to be updated in the database
 * @route PUT /:id
 */
const updateEntry = async (req, res, id) => {
    try {
        const output = await model_1.getSingleEntry(id);
        const profileEntry = JSON.parse(output);
        if (profileEntry.index === -1) {
            res.writeHead(404, { 'Content-Type': "application/json" });
            res.end(JSON.stringify({ message: 'Profile Not Found' }));
        }
        else {
            const output = JSON.stringify(req.body);
            const body = JSON.parse(output);
            const profileDetails = await model_1.updateProfile(body, profileEntry.index);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(profileDetails);
        }
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
};
exports.updateEntry = updateEntry;
/**
 * @description Deletes an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @param id Entry ID to be deleted from the database
 * @route DELETE /:id
 */
const deleteEntry = async (req, res, id) => {
    try {
        const output = await model_1.getSingleEntry(id);
        const profileEntry = JSON.parse(output);
        const { index, entry } = profileEntry;
        if (index === -1 || index === undefined) {
            res.writeHead(404, { 'Content-Type': "application/json" });
            res.end(JSON.stringify({ message: 'Profile Not Found' }));
        }
        else {
            const ceo = entry.ceo;
            const deleteUser = await model_1.deleteProfile(index, ceo, id);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(deleteUser);
        }
    }
    catch (error) {
        res.writeHead(404, { 'Content-Type': "application/json" });
        res.end(JSON.stringify({ message: error }));
    }
};
exports.deleteEntry = deleteEntry;
