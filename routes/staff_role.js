import express from 'express';
const routes = express.Router();
import {getAllStaffRoles, getSingleStaffRole, postStaffRole, deleteStaffRole} from '../controllers/staffRoleController.js';

routes.get('/',getAllStaffRoles);
routes.get('/:id',getSingleStaffRole);
routes.post('/',postStaffRole);

// we have not provide edit staff_role option because staff_role is not edited part ...this is fix.

routes.delete('/:id',deleteStaffRole);

export default routes;