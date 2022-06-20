const express = require('express')
const path = require("path");
const {getClassroomAll, updateClassroomStdStatus, createClassroomAll, findClassroomUserById,
    createClassroomExceptTeacher
} = require("./store");
const store = require("./store");
const router = express.Router()


const classroom_file = path.join(__dirname, 'data', 'classroom.json')
const user_file = path.join(__dirname, 'data', 'user_info.json')
const classroom_setting_file = path.join(__dirname, 'data', 'classRoomSetting.json')
let teacherPermission = function (req,res,next){
    req.locals = {}
    //console.log("Check Permission")
    //console.log(req.cookies.session)
    store.findUserByToken(user_file, req.cookies.session).then(find=>{
        //console.log("Check Permission-------------Done")
        // 判斷帳號存在與否 AND 是否認證
        if (find.usr_position == "teacher") {
            next()
        } else {
            res.sendStatus(403)
        }
    })
}

router.post("/title/set",teacherPermission,(req,res)=>{

    store.setClassroomTitle(classroom_setting_file,req.body.title).then(()=>{
        res.sendStatus(201)
    })
})

router.get("/title/get",(req,res)=>{
    store.getClassroomTitle(classroom_setting_file).then((data)=>{
        res.json(data)
    })
})

router.get("/create",teacherPermission,(req,res)=>{
    //console.log("call create")
    createClassroomExceptTeacher(user_file, classroom_file).then((r) =>{
        //console.log("create-----------Done")
       //console.log(r)
        res.sendStatus(201)
    })
})

router.get("/user",(req,res)=>{
    //console.log("call Find User")
    findClassroomUserById(classroom_file,req.locals.user.account_id).then((data)=>{
        //console.log("Find User-----------Done")
        res.json(data)
    })
})

router.post('/update',(req,res)=>{
    console.log("call update")
    console.log(`Update USER ${req.locals.user.account_id} status to ${req.body.stat}`)
    updateClassroomStdStatus(classroom_file,req.locals.user.account_id,req.body.stat)
    console.log("update--------Done")
    res.sendStatus(200)
})

router.get('/control',teacherPermission,(req,res)=>{
    res.sendStatus(200)
})


router.get("/",(req,res)=>{
    getClassroomAll(classroom_file).then((data)=>{
        res.json(data)
    })
})


module.exports = router