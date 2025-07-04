
const { exec } = require('child_process');
const port = 3000;

const killCommand = process.platform === 'win32'
  ? `for /f "tokens=5" %a in ('netstat -aon ^| find ":${port}" ^| find "LISTENING"') do taskkill /F /PID %a`
  : `lsof -ti:${port} | xargs kill -9`;

exec(killCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`Failed to kill process on port ${port} (maybe none running): ${stderr}`);
  } else {
    console.log(`✅ Port ${port} is now free.`);
  }

  exec('npx nodemon server.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Failed to start server: ${stderr}`);
    } else {
      console.log(stdout);
    }
  });
});
