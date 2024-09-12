 const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")


const getContacts = (async (req,res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

//@desc createContact
//@route POST /api/contact/
//@access private
const createContact = asyncHandler(async(req,res) => {
    console.log(req.body)
    const{name , email, phone} = req.body;
    if(!name || !email ||!phone) { 
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    const contact = await Contact.create ({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(200).json(contact)
    
});

//@desc getcontact
//@route GET /api/contat/
//@access private
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
     if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
     }
    res.status(200).json(contact)
});

//@desc contact
//@route PUT /api/CONTACT/
//@access private
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id);
     if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
     }
     if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user don't have permission to update other users contact")
     }

     const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
     )

     
    res.status(200).json(updatedContact)
});

/*const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
       res.status(404);
       throw new Error("Contact not found")
    }
  await Contact.remove();
    res.status(200).json(contact)
});*/

//@desc DELETE CONTACT
//@route DELETE /api/contact
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    try {
        console.log('Attempting to delete contact with ID:', req.params.id);

        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
            return;
        }
        if (contact.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("user don't have permission to update other users contact")
         }

        console.log('Contact deleted successfully:', contact);
        res.status(200).json({ message: "Contact removed", contact });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports  = { 
    getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact
}