var express = require('express');
var path = require('path');
const fs = require("node:fs/promises");
var router = express.Router();

/* GET images page. */
router.get('/', async function(req, res, next) {
  // 读取图片目录  
  let imageDir1 = path.join(__dirname, '../public/images/壁纸/萧容鱼&沈幼楚'); // 你的图片目录路径
  let imageDir2_1 = path.join(__dirname, '../public/images/Terraria/宠物'); // 你的图片目录路径
  let imageDir2_2 = path.join(__dirname, '../public/images/Terraria/时装'); // 你的图片目录路径
  let imageDir2_3 = path.join(__dirname, '../public/images/Terraria/武器'); // 你的图片目录路径
  let imageDir2_4 = path.join(__dirname, '../public/images/Terraria/坐骑'); // 你的图片目录路径

  try{
    const files = await fs.readdir(imageDir1);
    res.render('images', { title: 'My Images', images: files });
  }catch(err){
    console.log(err);
  }
});

module.exports = router;
