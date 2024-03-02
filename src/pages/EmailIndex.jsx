import { useState, useEffect } from "react";
import { emailService } from "../services/emailService";

import { EmailList } from "../cmps/EmailList";
import { SideBarNavigation } from "../cmps/SideBarNavigation";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);

  useEffect(() => {
    loadEmails();
  },[]);

  async function loadEmails() {
    try {
      const emails = await emailService.query();
      setEmails(emails);
    } catch (err) {
      console.log("Error in loadEmails", err);
    }
  }

  console.log("emails", emails);
  if (!emails || emails.length<0) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <SideBarNavigation />
      <EmailList emails={emails}/>
    </section>
  );
}
