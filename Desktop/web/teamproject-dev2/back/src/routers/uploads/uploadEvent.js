// import { Router } from "express";
// const path = require('path');
// const fs = require('fs');
// // const uploadController
// // const middleware
// const multer = require('multer');

////////개인 테스트용~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// //파일 제한
// const limits = {

// }

// // 이미지 확장자 구분
// const fileFilter = (req, file, callback) =>{

//     const typeArray = file.mimetype.split('/');

//     const fileType = typeArray[1]; // 이미지 확장자 추출
    
//     if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png'){
//         callback(null, true)
//     }else {
//         return callback({message: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다."}, false)

//     }
// }

// const a = multer({
//     destination : __dirname + './fileUpload/',
//     limits : limits,
//     fileFilter :fileFilter
// });

