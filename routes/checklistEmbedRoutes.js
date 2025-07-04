// routes/checklistEmbedRoutes.js
const express = require('express');
const router = express.Router();

// Embedded Security Checklist Page
router.get('/security', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Security Checklist</title>
      </head>
      <body style="margin:0;padding:0;">
        <iframe 
          src="/checklists/XpressGarage_Full_Security_Checklist.html" 
          width="100%" 
          height="1000px" 
          style="border:none;"
        ></iframe>
      </body>
    </html>
  `);
});

module.exports = router;
