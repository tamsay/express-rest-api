/* eslint-disable @typescript-eslint/no-unused-vars */

import fs from "fs"
import path from "path"
const dbFilePath = path.resolve(__dirname, "../database.json")
const database = require('../database.json')


/**
 * @description This checks if the database file exists and creates one if it doesn't
 * @param dbFilePath 
 */
const fileExists = fs.existsSync(dbFilePath);
    if(!fileExists){
    fs.appendFileSync("database.json", JSON.stringify([]))
}

// This code block returns all the entries in the database
const  getAllData =() : Promise<string> =>{
    return new Promise((resolve, reject)=>{
        if(database.length === 0){
            reject({message: 'Database is empty, create a new profile'})
        }else{
            resolve(JSON.stringify(database.sort((a: { id: number; }, b: { id: number; })=> a.id - b.id)))
        }
    })
}

// This code block returns a single entry based on the id provided
const getSingleEntry = (id:string) : Promise <string> =>{
    return new Promise((resolve, reject)=>{
        if(database.length === 0){
            reject({message: 'Database is empty, create a new profile'})
        }
        else{
            const matchedEntry =  database.find((element: { id: number; })=>{
            return (element.id) === (Number(id));
            })
            const matchedIndex : number = database.findIndex((element: { id: number; })=> (element.id) === (Number(id)))
            resolve (JSON.stringify({index: matchedIndex, entry: matchedEntry}))
        }
    })
}

// This code block creates a new entry in the database
const createNewEntry =(details: { id: number; organization: string; products: string[]; marketValue: string; address: string; ceo: string; country: string; noOfEmployees: number; employees: string[]; updatedAt:string; createdAt:string }) : Promise<string> =>{

    return new Promise((resolve, reject) =>{

        if(database.length === 0){
            const date:string = new Date().toString().split(' ').splice(0,5).join(' ');

                const {organization, products, marketValue, address, ceo, country, noOfEmployees, employees, id} = details

                const newEntry = {
                    organization, createdAt : date, updatedAt : date, products, marketValue, address, ceo, country, noOfEmployees, employees, id
                }
                database.push(newEntry)
                writeDataToFile(dbFilePath, database);
                resolve(JSON.stringify(newEntry))
        }
        else{
            const duplicateID = database.find((element: { id: number; })=> element.id === Number(details.id))

            if(!duplicateID){
                const date:string = new Date().toString().split(' ').splice(0,5).join(' ')
                const {organization, products, marketValue, address, ceo, country, noOfEmployees, employees, id} = details

                const newEntry = {
                    organization, createdAt : date, updatedAt : date, products, marketValue, address, ceo, country, noOfEmployees, employees, id
                }
                database.push(newEntry)
                writeDataToFile(dbFilePath, database);
                resolve(JSON.stringify(newEntry))
            }
            else{
                resolve(JSON.stringify({ message: 'Duplicate ID Found; New profile is not created; Try with another ID'} ))
            } 
        }
        
    })
}

// This code block updates an entry/profile in the database
const updateProfile =( details: { id: number; organization: string; products: string[]; marketValue: string; address: string; ceo: string; country: string; noOfEmployees: number; employees: string[];}, index:number) : Promise<string> =>{
    
    return new Promise((resolve, reject)=>{ 

        const date:string = new Date().toString().split(' ').splice(0,5).join(' ');

        const oldDetails = database[index];

        const  {organization, products, marketValue, address, ceo, country, noOfEmployees, employees} = details;

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
        resolve(JSON.stringify(oldDetails)) 
    })
}

// This code block deletes an entry/profile from the database
const deleteProfile =(index:number, ceo:string, id:string) : Promise<string>=>{
    return new Promise((resolve, reject)=>{
        
        database.splice(index, 1)
        writeDataToFile(dbFilePath, database);
        
        resolve(JSON.stringify({message: `${ceo} with ID: ${id} successfully removed from the database`}))
    })
}

// This code block writes the current database to the database file
function writeDataToFile(dbPath:string, content:unknown) {
    fs.writeFile(dbPath, JSON.stringify(content, null, 2), {encoding:'utf-8'}, (err) => {
        if(err) {
            console.log(err, 'write to db error')
        }
    })
}

export {getAllData, getSingleEntry, createNewEntry, updateProfile, deleteProfile};
