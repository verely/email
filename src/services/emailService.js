import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
   query,
   save,
   remove,
   getById,
   createEmail,
};

const STORAGE_KEY = "emails";

_createEmails();

async function query() {
  const emails = await storageService.query(STORAGE_KEY);
  return emails;
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave._id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(from, to, subject="", body="") {
  return { _id: utilService.makeId(),
            from,
            to,
            subject,
            body,
            sentAt: Date.now(),
            isRead: false,
            isStarred: false,
            removedAt: null
        }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY);
    if (!emails || !emails.length) {
      emails = _createSampleData()
      utilService.saveToStorage(STORAGE_KEY, emails);
    }
  }

function _createSampleData() {
  return [
    {
      _id: "e101",
      subject: "Trip",
      boby: "Would you like to take a trip to the Nurth...?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      renovedAt: null,
      from: "friend@friend.com",
      to: "user@user.com",
    },
    {
      _id: "e102",
      subject: "Thech",
      boby: "Would you to join tech event...?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      renovedAt: null,
      from: "tech@tech.com",
      to: "user@user.com",
    },
    {
      _id: "e103",
      subject: "another Trip",
      boby: "Would you like to take another trip to the Nurth?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      renovedAt: null,
      from: "friend@friend.com",
      to: "user@user.com",
    },
    {
      _id: "e104",
      subject: "another Tech",
      boby: "Would you to join tech event...?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      renovedAt: null,
      from: "tech@tech.com",
      to: "user@user.com",
    },
  ];
}




