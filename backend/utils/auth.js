const crypto = require('crypto');

const generateAccessToken = (userId) => {
  const accessToken = crypto.randomBytes(18).toString('hex');
  const signedAccessToken = `${accessToken}.${userId}`;
  return signedAccessToken;
};

module.exports = { generateAccessToken };   