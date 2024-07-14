import express from 'express';
import { syncTables } from '../helpers/sequelize';
const { auth } = require("express-oauth2-jwt-bearer");


const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Home page');
});

router.post('/syncTables', async (req, res) => {
  try {
    await syncTables();
    console.log('synced');
    res.status(201);
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send();
  }
});

const checkJwt = auth({
  audience: 'forum-api',
  issuerBaseURL: `https://dev-ez2f8ejiacjig1qh.us.auth0.com/`,
  algorithms: ["RS256"],
});
router.get("/test", checkJwt,  (req, res) => {
  console.log(req.auth);
  res.send({ msg: "Your access token was successfully validated!", });
});

module.exports = router;
