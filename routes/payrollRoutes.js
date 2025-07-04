const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');
const authenticate = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Only admins can trigger payroll runs
router.post('/run', authenticate, roleMiddleware('admin'), payrollController.runPayroll);

// Admins and dispatchers can view all payroll history
router.get('/history', authenticate, roleMiddleware('admin', 'dispatcher'), payrollController.getAllPayrolls);

// Admins, dispatchers, and the driver themselves can view specific driver payroll
router.get('/driver/:driverId', authenticate, payrollController.getPayrollByDriverId);

module.exports = router;
