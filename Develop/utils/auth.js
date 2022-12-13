const withAuth = (req, res, next) => {
// if session not logged in, go to login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  