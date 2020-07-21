const express = require('express');
const router = express.Router();

// Dashboard
router.get('/', (req, res) =>{
    res.send('Hello World!');
});

module.exports = router;
