import React, { useState } from "react";
import UsersPage from "./pages/UsersPage";
import Header from "./compontents/Header";
import AddUserForm from "./compontents/AddUserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GroupsPage } from "./pages/GroupsPage";
import { GroupExtended, User } from "./types";
import GroupForm from "./compontents/GroupForm";
import { Container, Modal } from "@mui/material";

function App() {
  const [isAddModalShow, setIsAddModalShow] = useState(false);
  const [isGroupModalShow, setIsGroupModalShow] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [group, setGroup] = useState<GroupExtended | undefined>(undefined);
  const modalUserSwitcher = (user: User) => {
    setIsAddModalShow(!isAddModalShow);
    setUser(user);
  };
  const modalGroupSwitcher = (group: GroupExtended) => {
    setIsGroupModalShow(!isGroupModalShow);
    setGroup(group);
  };

  let modal: JSX.Element | string = "";

  if (isAddModalShow)
    modal = <AddUserForm user={user} toggleForm={modalUserSwitcher} />;
  if (isGroupModalShow)
    modal = <GroupForm group={group} toggleForm={modalGroupSwitcher} />;

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Container maxWidth="lg">
          <Routes>
            <Route
              path="/groups"
              element={<GroupsPage addClickHandler={modalGroupSwitcher} />}
            />
            <Route
              path="/"
              element={<UsersPage addClickHandler={modalUserSwitcher} />}
            />
          </Routes>
        </Container>
        <Modal
          open={isAddModalShow || isGroupModalShow}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>{modal}</>
        </Modal>
      </BrowserRouter>
    </div>
  );
}

export default App;
