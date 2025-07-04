const { exec } = require('child_process');
const port = 3000;

exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
  if (!stdout) return console.log(`Nothing using port ${port}`);

  const lines = stdout.trim().split('\n');
  lines.forEach(line => {
    const pid = line.trim().split(/\s+/).pop();
    exec(`taskkill /F /PID ${pid}`, (err) => {
      if (err) {
        console.error(`Failed to kill PID ${pid}`);
      } else {
        console.log(`✅ Killed PID ${pid}`);
      }
    });
  });
});
