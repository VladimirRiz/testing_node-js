require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const feedController = require('../controllers/feed');

const User = require('../models/user');
// const Post = require('../models/post');

describe('Feed-Controller', function () {
  before(function (done) {
    mongoose
      .connect(process.env.MONGODB_TEST, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        const user = new User({
          name: 'Name',
          email: 'test@test.com',
          password: 'test',
          _id: '605dedc7576e17414cf180af',
          posts: [],
        });
        return user.save();
      })
      .then(() => {
        done();
      })
      .catch((err) => console.log(err));
  });

  it('should add a created post to the posts of the creator', function (done) {
    const req = {
      body: {
        title: 'test@email.com',
        content: 'test',
      },
      userId: '605dedc7576e17414cf180af',
      file: {
        path: 'xyz',
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    feedController
      .createPost(req, res, () => {})
      .then((savedUser) => {
        expect(savedUser).to.have.property('posts');
        expect(savedUser.posts).to.have.length(1);
        done();
      });
  });

  after(function (done) {
    User.deleteMany({}).then(() => {
      return mongoose.disconnect().then(() => {
        done();
      });
    });
  });
});
