const {
    addContact,
    listContacts,
    getContactById,
    removeContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await listContacts();
            console.table(contacts);
            break;

        case "get":
            const contactById = await getContactById(id);
            if (!contactById) {
                console.log(`no contact by id ${id}`);
                return;
            }
            console.table(contactById);
            break;

        case "add":
            const newContact = await addContact(name, email, phone);
            console.table(newContact);
            break;

        case "remove":
            const remContact = await removeContact(id);
            if (!remContact) {
                console.log(`no contact by id ${id}`);
                return;
            }
            console.log(remContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);