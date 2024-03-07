import { useState, useEffect } from "react";
import { emailService } from "../services/emailService";

import { EmailList } from "../cmps/EmailList";
import { SideBarNavigation } from "../cmps/SideBarNavigation";
import { EmailFilter } from "../cmps/EmailFilter";
import { useParams } from "react-router-dom";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilters] = useState(emailService.getDefaultFilter());
  const params = useParams()

  useEffect(() => {
    console.log('params',params)
    loadEmails();
  }, [filterBy]);

  async function loadEmails() {
    try {
      
      console.log("filterBy", filterBy);
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log("Error in loadEmails", err);
    }
  }

  function onSetFilter(fieldsToUpdate) {
    setFilters((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }

  async function onRemoveEmail(emailId) {
    try {
        await emailService.remove(emailId)
        setEmails((prevEmails) => {
            return prevEmails.filter(email => email.id !== emailId)
        })
    } catch (err) {
        console.log('Error in onRemoveEmail', err)
    }
}

  console.log("emails", emails);
  if (!emails || emails.length < 0) return <div>Loading...</div>;

  return (
    <section className="email-index">
      <div className="aside-container"><SideBarNavigation /></div>
      <div className="main-container">
        <div className="filter-container">
          <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </div>
        <div className="emails-container"><EmailList emails={emails} onRemoveEmail={onRemoveEmail} />
        </div>
      </div>
    </section>
  );
}
