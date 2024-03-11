import { NavLink } from "react-router-dom";
import inboxImgUrl from "../assets/imgs/cmps/sidebar-navigation/inbox.png";
import starredImgUrl from "../assets/imgs/cmps/sidebar-navigation/starred.png";
import sentImgUrl from "../assets/imgs/cmps/sidebar-navigation/sent.png";
import trashImgUrl from "../assets/imgs/cmps/shared/trash.png";
import draftImgUrl from "../assets/imgs/cmps/sidebar-navigation/draft.png";
import editImgUrl from "../assets/imgs/cmps/sidebar-navigation/edit.png";

export function SideBarNavigation({handleComposeClick}) {

  return (
    <div className="sidebar">
        <button className="compose-btn" onClick={handleComposeClick}>
          <img height={20} width={20} src={editImgUrl} alt="Compose"/>
          Compose
        </button>
      <nav className="container">
        <NavLink to="/inbox">
          <img src={inboxImgUrl} alt="Inbox" className="nav-icon" />
          Inbox
        </NavLink>
        <NavLink to="/starred">
          <img src={starredImgUrl} alt="Inbox" className="nav-icon" />
          Starred
        </NavLink>
        <NavLink to="/sent">
          <img src={sentImgUrl} alt="Inbox" className="nav-icon" />
          Sent
        </NavLink>
        <NavLink to="/draft">
          <img src={draftImgUrl} alt="Inbox" className="nav-icon" />
          Draft
        </NavLink>
        <NavLink to="/trash">
          <img src={trashImgUrl} alt="Inbox" className="nav-icon" />
          Trash
        </NavLink>
      </nav>
    </div>
  );
}
