"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controllers/controller");
const request = require('supertest');
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const port = process.env.PORT || 6000;
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
// READ
// function call to get all entries in the database
app.get('/', (req, res, next) => {
    controller_1.getAllDatabaseEntry(req, res);
});
// function call to get a specific entry in the database
app.get('/:id', (req, res, next) => {
    const id = req.params.id;
    controller_1.getSingleDatabaseEntry(req, res, id);
});
// CREATE
// function call to create a new profile entry in the database
app.post('/', (req, res, next) => {
    controller_1.createEntry(req, res);
});
// UPDATE
// function call to delete a profile/user from the database
app.put('/:id', (req, res, next) => {
    const id = req.params.id;
    controller_1.updateEntry(req, res, id);
});
// DELETE
// function call to delete a profile/user from the database
app.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    controller_1.deleteEntry(req, res, id);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.send('Page Not Found');
});
app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
module.exports = app;
