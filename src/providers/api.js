import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
});

function createUser(e) {
  e.preventDefault();
  axios
    .post("http://localhost:3000/api/v1/user/create", {
      username: e.target.form.name.value,
      password: e.target.form.password.value,
      email: e.target.form.email.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function loginUser(e) {
  e.preventDefault();
  return api
    .post("/user/login", {
      username: e.target.form.name.value,
      password: e.target.form.password.value,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function logoutUser() {
  await api
    .post("/user/logout")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function getSession() {
  let user = false;

  await api
    .post("/user/session")
    .then(function (response) {
      if (response.data === false) {
        user = false;
      } else {
        user = response.data;
      }
    })
    .catch(function (error) {
      user = false;
      console.log(error);
    });

  return user;
}

async function getFriends() {
  let friends = false;

  await api
    .get("/friends")
    .then(function (res) {
      friends = res.data.friends;
    })
    .catch(function (err) {
      friends = false;
      console.log(err);
    });

  return friends;
}

async function getFriendProfile(id) {
  let friend = false;

  await api
    .get(`/friend/${id}`)
    .then(function (res) {
      friend = res.data;
    })
    .catch(function (err) {
      friend = false;
      console.log(err);
    });

  return friend;
}

async function getFriendRequests() {
  let requests = false;

  await api
    .get("/friends/pending")
    .then(function (res) {
      requests = res.data.friendRequests;
    })
    .catch(function (err) {
      requests = false;
      console.log(err);
    });

  return requests;
}

// change route to /users/blocked
async function getBlocked() {
  let blocked = false;

  await api
    .get("/friends/blocked")
    .then(function (res) {
      blocked = res.data.blocked;
    })
    .catch(function (err) {
      blocked = false;
      console.log(err);
    });

  return blocked;
}

async function blockUser(id) {
  await api
    .post("/user/block", {
      friendId: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function unblockUser(id) {
  await api
    .post("/user/unblock", {
      friendId: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function removeFriend(id) {
  await api
    .post("/friend/remove", {
      friendId: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function sendFriendRequest(e, id) {
  e.preventDefault();
  const name = e.target.form.sendReq.value;

  await api
    .post("/friend/request", {
      friendName: name,
      userId: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function acceptFriendRequest(id) {
  await api
    .post(`/friend/accept`, {
      friendId: id,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function cancelFriendRequest(id, type) {
  await api
    .post(`/friend/cancel`, {
      friendId: id,
      type: type,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export {
  createUser,
  loginUser,
  logoutUser,
  getSession,
  getFriends,
  getFriendProfile,
  getFriendRequests,
  getBlocked,
  blockUser,
  unblockUser,
  removeFriend,
  sendFriendRequest,
  acceptFriendRequest,
  cancelFriendRequest,
};
