const { exec } = require('child_process');
const port = 3000;

const command = `netstat -ano | findstr :${port}`;

exec(command, (err, stdout, stderr) => {
  if (stdout) {
    const lines = stdout.trim().split('\n');
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      exec(`taskkill /F /PID ${pid}`, () => {
        console.log(`Killed process with PID ${pid}`);
      });
    });
  } else {
    console.log(`No process is using port ${port}`);
  }

  exec('npx nodemon server.js');
});
