const authRoutes = require("./auth");
const googleCalendarRoutes = require("./google-calendar");
const repositoriesRoutes = require("./github");

const { helloBuildKeyValidation, tokenVerification } = require('./../middlewares/auth');

const routes = (app) => {
    app.use('', [helloBuildKeyValidation], authRoutes);
    app.use('/google-events', [helloBuildKeyValidation, tokenVerification], googleCalendarRoutes);
    app.use('/github', [helloBuildKeyValidation, tokenVerification], repositoriesRoutes);

};
module.exports = routes;