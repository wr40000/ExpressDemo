var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var express = require('express');
var path = require('path');
const fs = require("node:fs/promises");
// const { readdir } = require('fs');
var router = express.Router();
/* GET images page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 读取图片目录  
        let imageDir1 = path.join(__dirname, '../public/images/壁纸/萧容鱼&沈幼楚'); // 你的图片目录路径
        let imageDir2_1 = path.join(__dirname, '../public/images/Terraria/宠物'); // 你的图片目录路径
        let imageDir2_2 = path.join(__dirname, '../public/images/Terraria/时装'); // 你的图片目录路径
        let imageDir2_3 = path.join(__dirname, '../public/images/Terraria/武器'); // 你的图片目录路径
        let imageDir2_4 = path.join(__dirname, '../public/images/Terraria/坐骑'); // 你的图片目录路径
        try {
            const files = yield fs.readdir(imageDir1);
            res.render('images', { title: 'My Images', images: files });
        }
        catch (err) {
            console.log(err);
        }
    });
});
module.exports = router;
//# sourceMappingURL=images.js.map