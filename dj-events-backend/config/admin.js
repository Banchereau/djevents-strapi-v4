module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1e865efd3690ac5d9b1c04454886fa25'),
  },
});
