// import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, onRemoveEmail }) {
  return (
    <ul className="email-list">
      {emails.map((email) => (
        <li key={email.id}>
          <EmailPreview email={email} />
          <div className="email-actions">
            <button onClick={() => onRemoveEmail(email.id)}>X</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
