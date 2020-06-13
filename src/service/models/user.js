'use strict';

const makeId = require(`../utils/make-id`);

class User {
  constructor(user) {
    this.id = makeId();
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.avatar = user.avatarSrcset;
    this.avatarSrcset = user.avatarSrcset;
    this.createdAt = new Date();
  }

  static toJSON(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      avatarSrcset: user.avatarSrcset
    };
  }
}

module.exports = User;
