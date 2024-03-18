import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails, emailActions, openEmailDetails }) {
 return (
    <div className="email-list-grid">
      {emails?.map((email) => (
        <EmailPreview
          key={email.id}
          email={email}
          emailActions={emailActions}
          openEmailDetails={openEmailDetails}
        />
      ))}
    </div>
  );
}
