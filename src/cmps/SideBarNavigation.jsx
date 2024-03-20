import { NavLink } from "react-router-dom";
import inboxImgUrl from "../assets/imgs/cmps/sidebar-navigation/inbox.png";
import starredImgUrl from "../assets/imgs/cmps/sidebar-navigation/starred.png";
import sentImgUrl from "../assets/imgs/cmps/sidebar-navigation/sent.png";
import trashImgUrl from "../assets/imgs/cmps/shared/trash.png";
import draftImgUrl from "../assets/imgs/cmps/sidebar-navigation/draft.png";
import editImgUrl from "../assets/imgs/cmps/sidebar-navigation/edit.png";
import { useSearchParams } from "react-router-dom";

export function SideBarNavigation({handleComposeClick}) {
  const [searchParams] = useSearchParams()
  console.log(searchParams)
  const isCompose = searchParams.get('compose')

  function generateUrl(route, searchParams, isCompose) {
    if (isCompose) {
       return `${route}?${searchParams}`;
    }
    return route;
   }

  return (
    <div className="sidebar">
        <button className="compose-btn" onClick={handleComposeClick}>
          <img height={20} width={20} src={editImgUrl} alt="Compose"/>
          Compose
        </button>
      <nav className="container">
        <NavLink to={generateUrl("/inbox", searchParams, isCompose)}>
          <img src={inboxImgUrl} alt="Inbox" className="nav-icon" />
          Inbox
        </NavLink>
        <NavLink to={generateUrl("/starred", searchParams, isCompose)}>
          <img src={starredImgUrl} alt="Starred" className="nav-icon" />
          Starred
        </NavLink>
        <NavLink to={generateUrl("/sent", searchParams, isCompose)}>
          <img src={sentImgUrl} alt="Sent" className="nav-icon" />
          Sent
        </NavLink>
        <NavLink to={generateUrl("/draft", searchParams, isCompose)}>
          <img src={draftImgUrl} alt="Draft" className="nav-icon" />
          Draft
        </NavLink>
        <NavLink to={generateUrl("/trash", searchParams, isCompose)}>
          <img src={trashImgUrl} alt="Trash" className="nav-icon" />
          Trash
        </NavLink>
      </nav>
    </div>
  );
}
