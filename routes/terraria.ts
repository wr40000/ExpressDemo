var express = require('express');
var path = require('path');
const fs = require("node:fs/promises");
var router = express.Router();

// 读取图片目录  server.log
let imageDir1 = path.resolve(__dirname, '../../../../Terraria/TMLserver/tModLoader-Logs/server.log'); // 你的图片目录路径
// JSON 文件路径
const countAllPlayerFilePath = path.resolve(__dirname, '../public/jsonServerTML/countAllPlayer.json');

/* GET images page. */
router.get('/', async function (req, res, next) {
  try {
    const data = await fs.readFile(imageDir1, 'utf8');
    // 正则表达式
    const regexJoin = /: (.+?) has joined/g;
    const regexLeave = /: (.+?) has left/g;

    // 匹配结果存放的数组
    const usernamesJoin = [];
    const usernamesLeave = [];
    let match;

    // 使用正则表达式进行匹配
    while ((match = regexLeave.exec(data)) !== null) {
      usernamesLeave.push(match[1]);
    }
    while ((match = regexJoin.exec(data)) !== null) {
      usernamesJoin.push(match[1]);
    }
    // 创建一个空对象来存储用户出现的次数
    const countJoin = {};
    const countLeave = {};

    let onlinePlayer = new Set();

    // 读取 countAllPlayer.json 文件
    const countAllPlayerData = await fs.readFile(countAllPlayerFilePath, 'utf8');
    const countAllPlayer = new Set(JSON.parse(countAllPlayerData));

    // 遍历用户，计算在线用户
    for (const str of usernamesLeave) {
      // 如果对象中已经有该字符串作为键，就增加计数，否则初始化为1
      countLeave[str] = (countLeave[str] || 0) + 1;
    }
    for (const str of usernamesJoin) {
      countJoin[str] = (countJoin[str] || 0) + 1;
    }
    
    for (const str of usernamesJoin) {
      countAllPlayer.add(str)
      if (countJoin[str] > (countLeave[str] || 0)) {
        onlinePlayer.add(str)
      }
    }

    // 更新 countAllPlayer.json 文件
    await fs.writeFile(countAllPlayerFilePath, JSON.stringify(Array.from(countAllPlayer)));

    res.render('terraria', { terraria: { onlinePlayer, countAllPlayer } });
  } catch (err) {
    console.error(err);
    // 在实际应用中，你可能希望返回一个错误页面或适当的错误响应。
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

