import React from "react";
import { ModalDialog } from "react-bootstrap";
import { useNavigate } from "react-router";
import CreateUserForm from "./CreateUserForm";

function NavBar() {
  let navigate = useNavigate();
  var isDeleted = false;
  var isShow = true;

  const logout = async (e) => {
    localStorage.clear();
    navigate("../login", { replace: true });
  };
  const changeModalState = async (e) => {
    //invokeModal(!isShow);
    //console.log("Menja stanje");
    //console.log(isShow);
  };

  const calldeleteUser = async (e) => {
    e.preventDefault();
    await deleteUser(JSON.parse(localStorage.getItem("username")));
    if (isDeleted) {
      alert("Your account is deactivated");
      navigate("../login", { replace: true });
    } else {
      alert("neuspesno");
    }
    //localStorage.clear();
  };

  const createUser = async (e) => {
    console.log("CreateUserFOrm");
    navigate("../createuser", { replace: true });
    window.location.reload();
  };

  async function deleteUser(username) {
    return fetch("http://localhost:8090/api/user/delete/" + username, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,DELETE,PATCH,OPTIONS",
      },
    }).then(function (response) {
      if (response.ok) {
        isDeleted = true;
      } else {
        isDeleted = false;
      }
    });
  }

  if (JSON.parse(localStorage.getItem("admin")) == "false") {
    return (
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h4 class="text-white">Collapsed content</h4>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-primary">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={calldeleteUser}
          >
            Delete account
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={logout}
          >
            LOGOUT
          </button>
        </nav>
      </div>
    );
  } else {
    return (
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <h4 class="text-white">Collapsed content</h4>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-primary">
          <ModalDialog></ModalDialog>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={createUser}
          ></button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={changeModalState}
          >
            Change group name
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={logout}
          >
            LOGOUT
          </button>
        </nav>
      </div>
    );
  }
}

export default NavBar;
