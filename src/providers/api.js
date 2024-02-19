import axios from "axios";

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
  axios.defaults.withCredentials = true;
  return axios
    .post("http://localhost:3000/api/v1/user/login", {
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

async function getSession() {
  let user = false;

  axios.defaults.withCredentials = true;

  await axios
    .post("http://localhost:3000/api/v1/user/session")
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

export { createUser, loginUser, getSession };
