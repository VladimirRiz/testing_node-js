const { expect } = require('chai');
const sinon = require('sinon');

const authController = require('../controllers/auth');

const User = require('../models/user');

describe('Auth-Controller - Login ', function () {
  it('should throw an error with code 500 if accessing the database failed', function (done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@email.com',
        password: 'test',
      },
    };

    authController
      .login(req, {}, () => {})
      .then((result) => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      });

    User.findOne.restore();
  });
});
