// ─────────────────────────────────────────────────────────────
// Expense Routes
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router({ mergeParams: true }); // to get :projectId
const { protect } = require('../middleware/authMiddleware');
const {
  listExpenses, createExpense, updateExpense, deleteExpense
} = require('../controllers/expenseController');

router.get('/',    protect(), listExpenses);
router.post('/',   protect(), createExpense);
router.put('/:id', protect(), updateExpense);
router.delete('/:id', protect(['admin']), deleteExpense);

module.exports = router;
