import pool from "../database/userdb.js"

// Create new team
export const createTeam = async (req,res) =>{
 const {name, description} = req.body
 console.log(name,description)
 res.status(200).json({message:`${name} ${description}`})
}


// Add members to team
export const addMember = async (req,res) =>{}


// Remove member from the team
export const removeMember = async (req,res) =>{}


// Manage roles
export const updateRole = async (req,res) =>{}


// Delete team
export const deleteTeam = async (req,res) =>{}