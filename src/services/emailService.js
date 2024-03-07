import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  createEmail,
  getDefaultFilter,
  remove,
  //  getById,
};

const STORAGE_KEY = "emails";

_createEmails();



async function query(filters) {
  let emails = await storageService.query(STORAGE_KEY);
  if (!filters) return emails;

  const { subject = "", folder = "" } = filters;

  if (folder) {
    emails = emails.filter((email) => _filterEmailsByFolder(email, folder));
  }

  const lowerCaseSubject = subject.toLowerCase();
  if (subject) {
    emails = emails.filter((email) =>
        email.subject.toLowerCase().includes(lowerCaseSubject)
    );
  }

  // console.log(JSON.stringify(emails, null, 2))
  return emails;
}

// function getById(id) {
//   return storageService.get(STORAGE_KEY, id);
// }

function remove(id) {
  return storageService.remove(STORAGE_KEY, id);
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(from, to, subject = "", body = "") {
  return {
    id: utilService.makeId(),
    from,
    to,
    subject,
    body,
    sentAt: Date.now(),
    isRead: false,
    isStarred: false,
    removedAt: null,
  };
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = _createSampleData();
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}

function _createSampleData() {
  return [
    {
      id: "e101",
      subject: "Trip",
      body: "Would you like to take a trip to the North...?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      removedAt: null,
      from: "friend@friend.com",
      to: "user@user.com",
    },
    {
      id: "e102",
      subject: "Tech",
      body: "Would you to join tech event...?",
      isRead: true,
      isStarred: true,
      sentA: 1551133930594,
      removedAt: null,
      from: "tech@tech.com",
      to: "user@user.com",
    },
    {
      id: "e103",
      subject: "another Trip",
      body: "Would you like to take another trip to the North?",
      isRead: true,
      isStarred: false,
      sentA: 1551133930594,
      removedAt: null,
      from: "friend@friend.com",
      to: "user@user.com",
    },
    {
      id: "e104",
      subject: "News",
      body: "Do you know about new product...?",
      isRead: false,
      isStarred: false,
      sentA: 1551133930594,
      removedAt: null,
      from: "news@news.com",
      to: "user@user.com",
    },
  ];
}

function getDefaultFilter(folder = "inbox") {
  return { folder, subject: "" };
}

function _filterEmailsByFolder(email, folder) {
  switch (folder) {
     case 'inbox':
       return !email.isStarred && email.removedAt === null && email.from !== email.to;
     case 'starred':
       return email.isStarred;
     case 'sent':
       return email.from === email.to;
     case 'draft':
       return email.sentA === null;
     case 'trash':
       return email.removedAt !== null;
     default:
       return false;
  }
 }
