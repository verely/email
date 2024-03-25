import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Outlet, useSearchParams } from "react-router-dom";

import { EmailList } from "../cmps/EmailList";
import { SideBarNavigation } from "../cmps/SideBarNavigation";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailCompose } from "./EmailCompose";

import { emailService } from "../services/emailService";

export function EmailIndex() {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [emails, setEmails] = useState(null)
  const [filterBy, setFilters] = useState(
    emailService.getDefaultFilter(location.pathname.split("/")[1])
  );

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  useEffect(() => {
    onSetFilter(emailService.getDefaultFilter(location.pathname.split("/")[1]));
  }, [params.folder]);


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
    if (fieldsToUpdate.folder === 'compose') {
      navigate(`${location.pathname}/compose`)
    }
    setFilters((prevFilter) => ({ ...prevFilter, ...fieldsToUpdate }));
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId);
      setEmails((prevEmails) => {
        return prevEmails.filter((email) => email.id !== emailId);
      });
    } catch (err) {
      console.log("Error in onRemoveEmail", err);
    }
  }

  async function onMarkAsRead(emailId) {
    try {
      console.log("markAsRead email", emailId)
      emailService.markAsRead(emailId)
      setEmails(emails.map(email => {
        if (email.id === emailId) {
          return { ...email, isRead: true };
        }
        return email;
      }));
    } catch (err) {
      console.log("Error in onMarkAsRead", err)
    }
  }

  async function onStarEmail(emailId) {
    try {
      console.log("Starr email", emailId);
    } catch (err) {
      console.log("Error in onStarEmail", err);
    }
  }

  async function onArchiveEmail(emailId) {
    try {
      console.log("Archive email", emailId);
    } catch (err) {
      console.log("Error in onArchiveEmail", err);
    }
  }

  console.log("emails", emails);
  if (!emails || emails.length < 0) return <div>Loading...</div>;

  const emailActions = {
    onStarEmail: onStarEmail,
    onArchiveEmail: onArchiveEmail,
    onMarkAsRead: onMarkAsRead,
    onRemoveEmail: onRemoveEmail,
   };

   const handleComposeClick = () => {
    // const currentFolder = location.pathname;
    // const composeUrl = `${currentFolder}?compose=new`;
    // navigate(composeUrl);
    setSearchParams("compose=new")
  };

  function openEmailDetails(emailId) {
    console.log(params)
    const currentFolder = params.folder
    const emailDetailsUrl = `/${currentFolder}/${emailId}`
    console.log(`openEmailDetails ${emailDetailsUrl}`)
    onMarkAsRead(emailId)
    navigate(emailDetailsUrl);
  }
  const isCompose = !!searchParams.get('compose')
  const isEmailDetails = !!params.emailId

  return (
    <section className="email-index">
      <div className="aside-container">
        <SideBarNavigation handleComposeClick={handleComposeClick}/>
      </div>
      <div className="main-container">
        <div className="filter-container">
          <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        </div>
        {(!isEmailDetails) &&
          <div className="emails-container">
            <EmailList emails={emails} emailActions={emailActions}
                openEmailDetails={openEmailDetails}  />
          </div>
        }
        {isEmailDetails && <Outlet />}
        {(isCompose) && <EmailCompose/>}
      </div>
    </section>
  );
}
