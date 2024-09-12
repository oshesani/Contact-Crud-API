const express = require("express")
const {getContacts,createContact,getContact,updateContact,deleteContact} = require('../controllers/contactControllers')
const router = express.Router();
const { constants } = require ("../constants");
const validateToken = require("../middleware/validateTokenHandler");

// use this style 0f require (validateToken) because you are requiring for all of the route
//see userRoutes.js for a different method cause it was required for just one specific route
router.use(validateToken)
router.route('/').get(getContacts)

router.route('/').post(createContact)

router.route('/:id').get(getContact)
router.route('/:id').put(updateContact)

router.route('/:id').delete(deleteContact)



module.exports = router;