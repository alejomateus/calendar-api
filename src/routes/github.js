const { Router } = require('express');
const { getRepositories, getGitHubProfile } = require('../controllers/github.controller');
const router = Router();
router.get('/repositories', getRepositories);
router.get('/profile', getGitHubProfile);
module.exports = router;
