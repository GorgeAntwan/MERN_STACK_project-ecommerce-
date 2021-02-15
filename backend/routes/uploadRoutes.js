import express from 'express';
import multer from 'multer';
import path from 'path';
const router =express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'upload/');
    },
    filename(req,file,cb){
         cb(null,`${file.filedname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});
function checkFileType(file,cb){
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimeType);
    if(extname&&mimeType){
       return  cb(null,true);
    }else{
        cb('only Image');
    }
}
const upload = multer({
    storage: storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
});
router.post('/',upload.single('image'),(req,res)=>{
  
  res.send(`/${req.file.path}`)
});
export default router