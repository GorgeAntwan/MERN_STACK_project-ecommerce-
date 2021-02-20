import express from 'express';
import multer from 'multer';
import path from 'path';
const router =express.Router();

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'upload/');
    },
    filename(req,file,cb){
         cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
});
function checkFileType(file,cb){
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    const mimeType = fileTypes.test(file.mimetype);
   
    if(extname&&mimeType){
       return  cb(null,true);
    }else{
        // return cb('only Image',false);
        cb(new Error('the file must be type of image'))
    }
}
const upload = multer({
    storage: storage,
    fileFilter:function(req,file,cb){
    console.log("🚀 ~ file: uploadRoutes.js ~ line 27 ~ file", file)
        checkFileType(file,cb);
    }
});
router.post('/',upload.single('image'),(req,res)=>{
  
  res.send(`/${req.file.path}`)
});
export default router