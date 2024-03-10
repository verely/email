// import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, emailActions}) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} emailActions={emailActions}/>
        </li>
      ))}
    </ul>
  );
}
