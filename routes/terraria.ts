var express = require('express');
var path = require('path');
const fs = require("node:fs/promises");
var router = express.Router();

/* GET images page. */
router.get('/', async function(req, res, next) {
  // 读取图片目录  server.log
  let imageDir1 = path.resolve(__dirname, '../../../../Terraria/TMLserver/tModLoader-Logs/server.log'); // 你的图片目录路径
  console.log(imageDir1);
  fs.readFile(imageDir1, 'utf8', (err, data)=>{
    if(err){
      console.error(err);
      return;
    }else{
      console.log(data);      
    }
  })

  try{
    // const files = await fs.readdir(imageDir1);
    // res.render('images', { title: 'My Images', images: files });
  }catch(err){
    console.log(err);
  }
});

module.exports = router;
