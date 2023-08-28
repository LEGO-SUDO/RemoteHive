import pool from "../database/userdb.js"



// Create new team
export const createTeam = async (req,res) =>{
 const {name, description} = req.body
 try{
 const checkIfTeamExistsQuery = {
  text: 'SELECT * FROM public.teams WHERE name = $1',
  values: [name]
 }
 const checkTeamExists = await pool.query(checkIfTeamExistsQuery)
 const teamResult = checkTeamExists.rows[0]
 if(teamResult){
  return res.status(401).json({message:'Team with given name already exists please select a different name!'})
 }
 const createTeamQuery = {
  text : 'INSERT INTO public.teams (name, description) VALUES ($1, $2)',
  values : [name, description]
 }
 await pool.query( createTeamQuery)
 res.status(201).json({message:'Team created successfully!'})
}catch(error){
 console.error(`THERE WAS AN ERROR WHILE CREATING NEW TEAM ${error}`)
 res.status(500).json({message:'Internal server error!'})
}
}


// Add members to team
export const addMember = async (req,res) =>{
 const {team_id} = req.params
 const {user_id, roles} = req.body

 try{
  const checkIfTeamExistsQuery = {
   text: 'SELECT * FROM public.teams WHERE team_id = $1',
   values: [team_id]
  }
  const checkIfTeamExists  = await pool.query(checkIfTeamExistsQuery)
  const teamExists = checkIfTeamExists.rows[0]

  if(!teamExists){
   return res.status(404).json({message:'Team does not exists!'})
  }
  const checkIfUserExistsQuery = {
   text: "SELECT * FROM public.users WHERE user_id = $1",
   values: [user_id]
  }
  const checkIfUserExist = await pool.query(checkIfUserExistsQuery)
  const userExists = checkIfUserExist.rows[0]
  if(!userExists){
   return res.status(404).json({message:'User not found!'})
  }
  const checkMembershipQuery = {
  text: `
    SELECT * FROM public.team_members WHERE team_id = $1 AND user_id = $2
  `,
  values: [team_id, user_id],
}
  const membershipExists = await pool.query(checkMembershipQuery)
  const membershipResult = membershipExists.rows[0]

  if(membershipResult){
   return res.status(400).json({message:"User already a member of team!"})
  }

  const addMemberQuery = {
    text: 'INSERT INTO public.team_members (team_id, user_id, roles) VALUES ($1, $2, $3)',
    values: [team_id, user_id, roles],
  }
  await pool.query(addMemberQuery);
  
  res.status(201).json({message:'User added to the team successfully!'})

 }catch(error){
  console.error(`THERE WAS AN ERROR WHILE ADDING USER TO THE DATABASE ${error}`)
  res.status(500).json({message:"Internal server Error!"})
 }
 
}


// Remove member from the team
export const removeMember = async (req,res) =>{
 const {team_id} = req.params
 const {user_id} = req.body

 try{
  const checkIfTeamExistsQuery = {
   text: 'SELECT * FROM public.team_members WHERE team_id = $1',
   values: [team_id]
  }
  const checkIfTeamExists = await pool.query(checkIfTeamExistsQuery)
  const teamExists = checkIfTeamExists.rows[0]
  if(!teamExists){
   return res.status(404).json({message:"Team not found!"})
  }

  const checkIfUserExistsQuery = {
   text: 'SELECT * FROM public.team_members WHERE team_id = $1 AND user_id = $2',
   values: [team_id, user_id]
  }
  const checkIfUserExist = await pool.query(checkIfUserExistsQuery)
  const userExists = checkIfUserExist.rows[0]
  if(!userExists) {
   return res.status(404).json({message:"No such member exists!"})
  }

  const removeMemberQuery = {
   text : "DELETE FROM public.team_members WHERE team_id = $1 AND user_id = $2",
   values : [team_id, user_id]
  }
  await pool.query(removeMemberQuery)

  res.status(201).json({message: `User with user_id: ${user_id} removed from the team with team_id: ${team_id} successfully!`})

 }catch(error){
  console.error(`There was an error while removing the user from the team ${error}`)
  res.status(500).json({message:"Internal server error!"})
 }
}


// Manage roles
export const updateRole = async (req,res) =>{

  const { team_id } = req.params
  const { user_id, role } = req.body

  try {
    // Check if the team exists
    const checkTeamQuery = {
      text: 'SELECT * FROM public.teams WHERE team_id = $1',
      values: [team_id],
    };

    const checkTeamResult = await pool.query(checkTeamQuery)
    const team = checkTeamResult.rows[0]

    if (!team) {
      return res.status(404).json({ message: 'Team not found' })
    }
    if(!role){
     res.status(201).json({message:"No action required!!"})
    }
    // Check if the user is a member of the team
    const checkMembershipQuery = {
      text: 'SELECT * FROM team_members WHERE team_id = $1 AND user_id = $2',
      values: [team_id, user_id],
    };

    const checkMembershipResult = await pool.query(checkMembershipQuery)
    const membership = checkMembershipResult.rows[0]

    if (!membership) {
      return res.status(404).json({ message: 'User is not a member of the team' })
    }
    // Update the user's role in the team
    const updateRoleQuery = {
      text: 'UPDATE team_members SET roles = $1 WHERE team_id = $2 AND user_id = $3',
      values: [role, team_id, user_id],
    };

    await pool.query(updateRoleQuery)

    res.status(200).json({ message: 'User role updated successfully' })
  } catch (error) {
    console.error(`Error updating user role: ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }

}


// Delete team
export const deleteTeam = async (req,res) =>{
 const { team_id } = req.params

  try {

    const checkTeamQuery = {
      text: 'SELECT * FROM teams WHERE team_id = $1',
      values: [team_id],
    };

    const checkTeamResult = await pool.query(checkTeamQuery)
    const team = checkTeamResult.rows[0]

    if (!team) {
      return res.status(404).json({ message: 'Team not found' })
    }

    // Delete the team, and cascade deletion will remove team members
    const deleteTeamQuery = {
      text: 'DELETE FROM teams WHERE team_id = $1',
      values: [team_id],
    };

    await pool.query(deleteTeamQuery)

    res.status(204).json({message:`Team with team_id: ${team_id} Deleted successfully!`}); 
  } catch (error) {
    console.error(`Error deleting team: ${error}`)
    res.status(500).json({ message: 'Internal server error' })
  }
}