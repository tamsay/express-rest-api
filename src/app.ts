import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createError from "http-errors";
import express, {Application, Response, Request, NextFunction} from 'express';
import { getAllDatabaseEntry, getSingleDatabaseEntry, createEntry, updateEntry, deleteEntry } from './controllers/controller';
const request = require('supertest');
import * as dotenv from "dotenv";
dotenv.config();


const port = process.env.PORT || 6000;
const app : Application = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// READ
// function call to get all entries in the database
app.get('/', (req : Request, res : Response, next: NextFunction)=>{
    getAllDatabaseEntry(req, res) 
})
// function call to get a specific entry in the database
app.get('/:id', (req : Request, res : Response, next: NextFunction)=>{
    const id = req.params.id;
    getSingleDatabaseEntry(req, res, id) 
})

// CREATE
// function call to create a new profile entry in the database
app.post('/', (req : Request, res : Response, next: NextFunction)=>{
    createEntry(req, res) 
})


// UPDATE
// function call to delete a profile/user from the database
app.put('/:id', (req : Request, res : Response, next: NextFunction)=>{
    const id = req.params.id;
    updateEntry(req, res, id) 
})

// DELETE
// function call to delete a profile/user from the database
app.delete('/:id', (req : Request, res : Response, next: NextFunction)=>{
    const id = req.params.id;
    deleteEntry(req, res, id) 
})


// catch 404 and forward to error handler
app.use(function(req : Request, res : Response, next: NextFunction) {
    next(createError(404));
});
  
// error handler
app.use(function(err: { message: string; status: number; }, req : Request, res : Response, next : NextFunction) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.send('Page Not Found');
});

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})

module.exports = app;