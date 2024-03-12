// import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, emailActions, openEmailDetails}) {
  return (
    <ul className="email-list">
      {emails?.map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} emailActions={emailActions} openEmailDetails={openEmailDetails}/>
        </li>
      ))}
    </ul>
  );
}
