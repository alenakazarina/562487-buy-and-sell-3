'use strict';

const User = require(`../models/user`);

class UserService {
  constructor(users) {
    this._users = users;
    this._user = null;
  }

  findByEmail(email) {
    const user = this._users.find((dbUser) => dbUser.email === email);
    return user ? user : null;
  }

  getCurrentUser() {
    return this._user ? User.toJSON(this._user) : null;
  }

  createUser(userData) {
    const dbUser = this.findByEmail(userData.email);
    if (dbUser) {
      return null;
    }
    const newUser = new User(userData);
    this._users.push(newUser);
    return User.toJSON(newUser);
  }

  login(user) {
    this._user = user;
    return User.toJSON(this._user);
  }
}

module.exports = UserService;
