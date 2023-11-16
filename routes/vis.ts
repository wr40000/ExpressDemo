var express = require('express');
var path = require('path');
const fs = require("node:fs/promises");
var router = express.Router();

/* GET images page. */
router.get('/', async function (req, res, next) {
    let fileName = req.query.fileName;
    fileName = decodeURIComponent(req.query.fileName);
    // 拼接 JSON 文件的路径
    console.log(fileName);
    const jsonFilePath = path.join(__dirname, '../public/json/', `${fileName}`);
    console.log(jsonFilePath);

    // 发送 JSON 文件作为响应
    res.sendFile(jsonFilePath);
});

module.exports = router;