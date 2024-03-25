import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  createEmail,
  getDefaultFilter,
  remove,
  markAsRead
  //  getById,
};

const STORAGE_KEY = "emails";
const DEFAULT_TO = "user@user.com";

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

function getById(id) {
  return storageService.get(STORAGE_KEY, id);
}

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
//to-do
// function update(emailId, propertyToUpdate)
// {
//   markAsRead(emailId)
// }

async function markAsRead(emailId) {
  try {
    const email = await getById(emailId);
    if (!email) {
      throw new Error(`Email with ID ${emailId} not found.`);
    }

    email.isRead = true;

    await save(email);
    console.log(`Email with ID ${emailId} marked as read.`);
 } catch (error) {
    console.error(`Error marking email as read: ${error.message}`);
    //to do: show a notification to the user
 }
}

// Factory function for creating email objects
function createEmail(from, to=DEFAULT_TO, subject = "", body = "") {
  _createEmail(from, subject, body, Date.now(), to)
}

function _createEmail(from, subject, body, sentAt, isRead=false, isStarred=false, to=DEFAULT_TO) {
  return {
    id: utilService.makeId(),
    from,
    to,
    subject,
    body,
    sentAt,
    isRead,
    isStarred,
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
  const sampleData = []
  const subjects = ['News', 'Sport', 'Tech', 'Shopping', 'Trip', 'ECard', 'Doctor'];

  for (let i = 1; i <= 20; i++) {
    const from = `sample${i}@example.com`;
    const subject = subjects[i % subjects.length];
    const body = `Sample email ${i} like Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Sed euismod, nunc at cursus pellentesque, nisl eros pellentesque quam, a faucibus nisl risus id nisi.
      Sed auctor, nunc at cursus pellentesque, nisl eros pellentesque quam, a faucibus nisl risus id nisi.
      Sed auctor, nunc at cursus pellentesque, nisl eros pellentesque quam, a faucibus nisl risus id nisi.`;
    const isRead = i % 2 === 0;
    const isStarred = i % 3 === 0;
    const sentAt = simulateSentAtDate(i);

    sampleData.push(_createEmail(from, subject, body, sentAt, isRead, isStarred));
  }
  return sampleData;

  function simulateSentAtDate(i) {
    let sentAt;
    switch (i % 5) {
      case 0: // Today
        sentAt = new Date().getTime();
        break;
      case 1: // Yesterday
        sentAt = getRelativeDate(1);
        break;
      case 2: // A week ago
        sentAt = getRelativeDate(7);
        break;
      case 3: // Two months ago
        sentAt = getRelativeDate(60); // Approximation
        break;
      case 4: // One year ago
        sentAt = getRelativeDate(365);
        break;
      default: // For any other case, use Today
        sentAt = getRelativeDate(0);
    }
    return sentAt;
  }

  function getRelativeDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.getTime();
  }
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
