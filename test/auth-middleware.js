const { expect } = require('chai');

const authMiddleware = require('../middleware/is-auth');

describe('Auth authorization', function () {
  it('should throw an error if no authorization header is represent', function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      'Not authenticated'
    );
  });

  it('should throw an error if the authorization header is only one string', function () {
    const req = {
      get: function () {
        return 'null';
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
