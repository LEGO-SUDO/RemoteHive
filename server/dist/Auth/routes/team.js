import express from 'express';
import { createTeam, addMember, removeMember, updateRole, deleteTeam } from '../controller/Team.js';
const router = express.Router();
// Create new team
router.post('/newteam', createTeam);
// Add members to team
router.put('/addmember/:team_id', addMember);
// Remove members from team
router.delete('/removemember/:team_id', removeMember);
// Manage roles
router.put('/roles/:team_id', updateRole);
// Delete team
router.delete('/delete/:team_id', deleteTeam);
export default router;
//# sourceMappingURL=team.js.map