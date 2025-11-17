const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'altaf555',
  database: 'cinematics_db'
});

connection.connect(err => {
  if (err) console.error('❌ Connection failed:', err);
  else console.log('✅ Database connected!');
});
