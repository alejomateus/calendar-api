require('dotenv').config();
const Response = require('../utils/response');
const { Octokit } = require("@octokit/rest");
const repos = require('repos');
const octokit = new Octokit();

const getRepositories = async (req, res) => {
    try {
        const userData = await octokit.rest.search
            .users({
                q: req.user.email
            });
        const options2 = {
            token: process.env.GITHUB_TOKEN
        };
        const repositories = await repos([userData.data.items[0].login], options2)
        return Response.success(res, 'Events getted succesfully', repositories, 201);
    } catch (error) {
        console.log(error);
        return Response.error(res, `Error at getRepositories -->`, []);
    }
};


module.exports = {
    getRepositories
}
