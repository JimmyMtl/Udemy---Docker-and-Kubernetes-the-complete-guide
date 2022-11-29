const express = require('express');
const app = express();
const router = express.Router();

router.get('/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values');
})

module.exports = router;