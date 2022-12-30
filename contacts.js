const fs = require("fs/promises");
const path = require("path");
const shortid = require('shortid');

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
    const contactsRaw = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsRaw);
    return contacts ;
}

async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const updateContactById = contacts.find((contact) => contact.id === contactId);
    return updateContactById || null;
}

async function addContact(name, email, phone) {
    const id = shortid.generate();
    const contact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(contact);
    await writeContacts(contacts);

    return contact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const updateContact = contacts.filter((contact) => contact.id !== contactId);
    await writeContacts(updateContact);
    return updateContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};