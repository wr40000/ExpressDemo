var express = require('express');
var router = express.Router();

const mysql = require('mysql2/promise'); // 引入mysql2/promise以支持异步操作

// MySQL数据库连接配置
const dbConfig = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '123456',
};

// 创建数据库连接池
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'Terraria',
  waitForConnections: true, // 如果连接池耗尽，等待可用连接
  connectionLimit: 10, // 连接池的最大连接数
  queueLimit: 0, // 没有限制等待队列的大小
});
// 创建数据库连接池
const pool_create = mysql.createPool(dbConfig);

router.get('/', async (req, res) => {
  try {
    // 从连接池中获取一个连接
    const connection = await pool.getConnection();

    // 执行SQL查询
    const [rows, fields] = await connection.execute('SELECT * FROM users');

    // 释放连接
    connection.release();

    // 处理查询结果
    res.json(rows);
    res.render('mysql', { title: 'Express', rows:rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/createdb', async (req, res, next) => {
  console.log("createdb");
  
  try {
    // 连接到MySQL数据库
    const connection = await pool_create.getConnection();

    // 创建新的数据库（示例名称为Terraria）
    await connection.query('CREATE DATABASE IF NOT EXISTS Terraria');

    // 释放连接
    connection.release();

    res.status(200).json({ message: '数据库已创建' });
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: '创建数据库时出错' });
  }
});

// 创建名为 'users' 的表
router.get('/create-users-table', async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `;
    await connection.query(createTableQuery);
    connection.release();
    console.log('Table "users" created or already exists.');
    res.status(200).json({ message: 'Table "users" created or already exists.' });
    next();
  } catch (error) {
    console.error('Error creating table:', error);
    res.status(500).json({ message: 'Error creating table.' });
  }
});

router.post('/create-user', async (req, res) => {
  
  try {
      const { username, email } = req.body; // 从请求中获取用户名和电子邮件

      const connection = await pool.getConnection();
      const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
      const values = [username, email];

      await connection.execute(query, values);

      connection.release();

      res.status(200).json({ message: '用户已创建' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: '创建用户时出错' });
  }
});


module.exports = router;