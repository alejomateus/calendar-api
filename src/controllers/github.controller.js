require('dotenv').config();
const Response = require('../utils/response');
const { Octokit } = require("@octokit/rest");
const repos = require('repos');
const octokit = new Octokit();

const getRepositories = async (req, res) => {
    try {
        userData = await getGitHubProfileData(req);
        if (userData) {
            const optionsGitHub = {
                token: process.env.GITHUB_TOKEN
            };
            let repositories = await repos([userData.login], optionsGitHub);
            repositories.map(repository => {
                delete repository.owner;
                delete repository.permissions;
            });
            return Response.success(res, 'Events getted succesfully', repositories, 200);
        } else {
            return Response.error(res, `You don´t have any repository`, []);
        }
    } catch (error) {
        console.log(error);
        return Response.error(res, `Error at getRepositories -->`, []);
    }
};

const getGitHubProfile = async (req, res) => {
    try {
        userData = await getGitHubProfileData(req);
        return Response.success(res, 'Events getted succesfully', userData, 200);
    } catch (error) {
        console.log(error);
        return Response.error(res, `Error at getRepositories -->`, []);
    }
};

async function getGitHubProfileData(req) {
    const userData = await octokit.rest.search
        .users({
            q: req.user.email
        });
    return userData.data.items[0];
};

module.exports = {
    getRepositories,
    getGitHubProfile
}
