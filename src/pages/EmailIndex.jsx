import { useState, useEffect } from "react";
import { emailService } from "../services/emailService";

import { EmailList } from "../cmps/EmailList";
import { SideBarNavigation } from "../cmps/SideBarNavigation";
import { EmailFilter } from "../cmps/EmailFilter";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilters] = useState(emailService.getDefaultFilter());

  useEffect(() => {
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
    setFilters(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
}

  console.log("emails", emails);
  if (!emails || emails.length < 0) return <div>Loading...</div>;

  return (
    <section className="email-index">
      <SideBarNavigation />
      <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <EmailList emails={emails} />
    </section>
  );
}
