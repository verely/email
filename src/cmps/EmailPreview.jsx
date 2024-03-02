export function EmailPreview({ email }) {

  const sent  = new Date(email.sentA).toLocaleString();
  return (
    <article className="email-preview">
      <span className="star">★</span>
      <h4 className="from">{email.from}</h4>
      <h4 className="subject">{email.subject}</h4>
      <h4 className="sent">{sent}</h4>
    </article>
  );
}
