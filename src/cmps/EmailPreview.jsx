import { useState, useEffect } from 'react'
import markAsReadImg from "../assets/imgs/cmps/email-preview/markAsRead.png";
import archiveImg from "../assets/imgs/cmps/email-preview/archive.png";
import starImg from "../assets/imgs/cmps/email-preview/star.png";
import trashImg from "../assets/imgs/cmps/shared/trash.png";

export function EmailPreview({ email, emailActions, openEmailDetails}) {
  const [maxLength, setMaxLength] = useState(130);

  const isRead = email.isRead;
  const sent = new Date(email.sentAt).toLocaleString();
  const truncatedBody = truncateText(email.body, maxLength);


  // Effect to handle window resize
  useEffect(() => {
      window.addEventListener('resize', calculateMaxLength);
      // Cleanup function
      return () => window.removeEventListener('resize', calculateMaxLength);
  }, []);

  const calculateMaxLength = () => {
    const containerWidth = document.querySelector('.body-cell').offsetWidth;
    const averageCharWidth = 7;
    const maxCharsPerLine = Math.floor(containerWidth / averageCharWidth);
    setMaxLength(maxCharsPerLine);
  };

  function onEmailDetailsClick(emailId) {
    //ev.stopPropagation()
    openEmailDetails(emailId)
    console.log(`onEmailDetailsClick ${emailId}`);
  }

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }

  return (
    <article className={`email-preview-grid-item ${isRead ? 'read' : 'unread'}`} onClick={() => onEmailDetailsClick(email.id)}>
      <div className="checkbox-cell">
        <input className="checkbox" type="checkbox" />
      </div>
      <div className="star-cell">
        <button className="action-button" onClick={() => emailActions.onStarEmail(email.id)}>
          <img src={starImg} alt="Star" />
        </button>
      </div>
      <div className="from-cell">
        <h4 className="from">{email.from}</h4>
      </div>
      <div className="subject-cell">
        <h4 className="subject">{email.subject}</h4>
      </div>
      <div className="body-cell">
        <p>{truncatedBody}</p>
      </div>
      <div className="sent-cell">
        <h4 className="sent">{sent}</h4>
      </div>

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
