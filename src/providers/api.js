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

async function createChannel(e) {
  console.log(e.target.form.createChannel.value, "channel name");
  let errors = false;

  e.preventDefault();
  await api
    .post("/channel/create", {
      channelName: e.target.form.createChannel.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      errors = error.response;
    });

  return errors;
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

async function getSearchedFriends(value) {
  let users = false;

  await api
    .post("/friend/search", {
      username: value,
    })
    .then(function (res) {
      users = res.data.friends;
    })
    .catch(function (error) {
      users = false;
      console.log(error);
    });

  return users;
}

async function getChannelSearchedFriends(value, id) {
  let users = false;

  await api
    .post(`/friends/invites/searched`, {
      username: value,
      id: id,
    })
    .then(function (res) {
      users = res.data.friends;
    })
    .catch(function (err) {
      console.log(err);
    });

  return users;
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

async function getChannelFriends(id) {
  let friends = false;

  await api
    .get(`/friends/invites/${id}`)
    .then(function (res) {
      friends = res.data.friends;
    })
    .catch(function (err) {
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

async function getBlocked() {
  let blocked = false;

  await api
    .get("/users/blocked")
    .then(function (res) {
      blocked = res.data.blocked;
    })
    .catch(function (err) {
      blocked = false;
      console.log(err);
    });

  return blocked;
}

async function getChannels() {
  let channels = false;

  await api
    .get("/users/channels")
    .then(function (res) {
      channels = res.data;
    })
    .catch(function (err) {
      channels = false;
      console.log(err);
    });

  return channels;
}

async function getDmChannel(id) {
  let channel = false;

  await api
    .get(`/channel/dm/${id}`)
    .then(function (res) {
      channel = res.data;
    })
    .catch(function (err) {
      channel = false;
      console.log(err);
    });

  return channel;
}

async function getSearchedChannels(value) {
  let channels = false;

  await api
    .post("/channel/search", {
      channel: value,
    })
    .then(function (res) {
      channels = res.data.channels;
    })
    .catch(function (error) {
      channels = false;
      console.log(error);
    });

  return channels;
}

async function getChannelUsers(id) {
  let users = false;

  await api
    .get(`/channel/${id}/users`)
    .then(function (res) {
      users = res.data.users;
    })
    .catch(function (err) {
      users = false;
      console.log(err);
    });

  return users;
}

async function getChannelSearchedUsers(value, id) {
  let users = false;

  await api
    .post(`/channel/searched/users`, {
      search: value,
      id: id,
    })
    .then(function (res) {
      users = res.data.users;
    })
    .catch(function (err) {
      users = false;
      console.log(err);
    });

  return users;
}

async function getMessages(channelId) {
  let messages = false;

  await api
    .get(`/channel/${channelId}/messages`)
    .then(function (res) {
      messages = res.data;
    })
    .catch(function (err) {
      messages = false;
      console.log(err);
    });

  return messages;
}

async function sendMessage(message, channelId) {
  await api
    .post(`/message/create`, {
      message: message,
      channelId: channelId,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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

async function kickUser(id, channelId) {
  await api
    .post(`/channel/kick`, {
      userId: id,
      channelId: channelId,
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
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
  let errors = "";

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
      errors = error.response.data.errors;
    });

  return errors;
}

async function sendFriendRequestNoSearch(id) {
  await api
    .post("/friend/request/nosearch", {
      userId: id,
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function sendInviteRequest(userId, channelId) {
  await api
    .post("/channel/invite", {
      userId: userId,
      channelId: channelId,
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
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

async function deleteChannel(channel) {
  console.log(channel);
  await api
    .delete(`/channel/delete`, {
      data: {
        channel: channel,
      },
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
  createChannel,
  loginUser,
  logoutUser,
  getSession,
  getSearchedFriends,
  getFriends,
  getChannelFriends,
  getFriendProfile,
  getFriendRequests,
  getBlocked,
  getChannels,
  getChannelUsers,
  getDmChannel,
  getSearchedChannels,
  getChannelSearchedFriends,
  getChannelSearchedUsers,
  getMessages,
  sendMessage,
  blockUser,
  kickUser,
  unblockUser,
  removeFriend,
  sendFriendRequest,
  sendFriendRequestNoSearch,
  sendInviteRequest,
  acceptFriendRequest,
  cancelFriendRequest,
  deleteChannel,
};
