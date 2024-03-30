import express from 'express';
import { syncTables } from '../helpers/sequelize';

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

module.exports = router;
