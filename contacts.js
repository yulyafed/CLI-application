const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const { resolve, parse } = require("path");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contactFind = contacts.find((contact) => contact.id === contactId);
    return contactFind || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const newContactList = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(
        contactsPath,
        JSON.stringify(newContactList, null, 2),
        "utf8"
    );
    return newContactList;
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const contacts = await listContacts();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    addContact,
    listContacts,
    getContactById,
    removeContact,
};