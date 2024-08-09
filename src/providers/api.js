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
      console.log(error);
    });

  return user;
}

async function getUserCensored() {
  let user = false;

  await api
    .get("/user/censored")
    .then(function (response) {
      user = response.data;
    })
    .catch(function (err) {
      console.log(err);
    });

  return user;
}

async function getNotifications() {
  let notifications = false;

  await api
    .get(`/notifications`)
    .then(function (res) {
      notifications = res.data.notifications;
    })
    .catch(function (err) {
      console.log(err);
    });

  return notifications;
}

async function getNotificationsInvites() {
  let notifications = false;

  await api
    .get(`/notifications/invites`)
    .then(function (res) {
      notifications = res.data.notifications;
    })
    .catch(function (err) {
      console.log(err);
    });

  return notifications;
}

async function getNotificationsAnnouncements() {
  let notifications = false;

  await api
    .get(`/notifications/announcements`)
    .then(function (res) {
      notifications = res.data.notifications;
    })
    .catch(function (err) {
      console.log(err);
    });

  return notifications;
}

async function removeNotification(id) {
  await api
    .post("/notification/remove", {
      notifId: id,
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
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
      console.log(err);
    });

  return friends;
}

async function getOnlineFriends() {
  let friends = false;

  await api
    .get("/friends/online")
    .then(function (res) {
      friends = res.data.friends;
    })
    .catch(function (err) {
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

async function sendFeedback(message) {
  let state = false;

  await api
    .post(`/feedback`, {
      message: message,
    })
    .then(function (res) {
      res.data.state = true;
      state = res.data;
    })
    .catch(function (err) {
      err.response.data.errors[0].state = false;
      state = err.response.data.errors[0];
    });

  return state;
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

async function updateEmail(email) {
  let errors = false;

  await api
    .put("/user/update/email", {
      email: email,
    })
    .then(function (res) {
      errors = false;
    })
    .catch(function (err) {
      errors = err.response.data.errors;
    });

  return errors;
}

async function updateUsername(username) {
  let errors = false;

  await api
    .put("/user/update/username", {
      username: username,
    })
    .then(function (res) {
      errors = false;
    })
    .catch(function (err) {
      errors = err.response.data.errors;
    });

  return errors;
}

async function updatePassword(password) {
  let errors = false;

  await api
    .put("/user/update/password", {
      password: password,
    })
    .then(function (res) {
      errors = false;
    })
    .catch(function (err) {
      errors = err.response.data.errors;
    });

  return errors;
}

async function updateAbout(about) {
  let errors = false;

  await api
    .put("/user/update/about", {
      about: about,
    })
    .then(function (res) {
      errors = false;
    })
    .catch(function (err) {
      errors = err.response.data.errors;
    });

  return errors;
}

export {
  createUser,
  createChannel,
  loginUser,
  logoutUser,
  getSession,
  getUserCensored,
  getNotifications,
  getNotificationsInvites,
  getNotificationsAnnouncements,
  removeNotification,
  getSearchedFriends,
  getFriends,
  getOnlineFriends,
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
  sendFeedback,
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
  updateEmail,
  updateUsername,
  updatePassword,
  updateAbout,
};
