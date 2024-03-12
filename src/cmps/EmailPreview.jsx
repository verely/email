import markAsReadImg from "../assets/imgs/cmps/email-preview/markAsRead.png";
import archiveImg from "../assets/imgs/cmps/email-preview/archive.png";
import starImg from "../assets/imgs/cmps/email-preview/star.png";
import trashImg from "../assets/imgs/cmps/shared/trash.png";

export function EmailPreview({ email, emailActions, openEmailDetails}) {
  const sent = new Date(email.sentA).toLocaleString();

  function onEmailDetailsClick(emailId) {
    //ev.stopPropagation()
    openEmailDetails(emailId)
    console.log(`onEmailDetailsClick ${emailId}`);
 }

  return (
    <article className="email-preview" onClick={() => onEmailDetailsClick(email.id)}>
      <input className="checkbox" type="checkbox" />
      <button className="action-button"onClick={() => emailActions.onStarEmail(email.id)}>
        <img src={starImg} alt="Star" />
      </button>
      <h4 className="from">{email.from}</h4>
      <h4 className="subject">{email.subject}</h4>
      <h4 className="sent">{sent}</h4>
      <div className="email-actions">
        <div>
          <button className="action-button" onClick={() => emailActions.onArchiveEmail(email.id)}>
            <img src={archiveImg} alt="Archive" />
          </button>

          <button className="action-button"onClick={() => emailActions.onRemoveEmail(email.id)}>
            <img src={trashImg} alt="Delete" />
          </button>

          <button className="action-button" onClick={() => emailActions.onMarkAsRead(email.id)}>
            <img src={markAsReadImg} alt="Mark as read" />
          </button>

        </div>
      </div>
    </article>
  );
}
