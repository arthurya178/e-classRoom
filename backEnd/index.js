const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const lineRouter = require('./lineAPI.js')
const classroomRoute = require('./classroomRoute.js')
const fs = require("fs");
const path = require("path")
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())
let store = require("./store")
const {findUserByToken, writeUserByToken, writeUserById} = require("./store");

//---------------- Setting Start ----------------
const port = 8080
const user_file = path.join(__dirname, 'data', 'user_info.json')
//----------------- Setting End------------------

let checkLoginStatus = function (req, res, next) {
    req.locals = {}
    //console.log("Check Account")
    //console.log(req.cookies.session)
    store.findUserByToken(user_file, req.cookies.session).then(find => {
        //console.log("Check------------Done")
        // 判斷帳號存在與否 AND 是否認證
        if (find != -1 && find.auth == true) {
            let tmp = req.cookies.session
            res.clearCookie("session")
            res.cookie("session", tmp, {maxAge: 3600000})
            req.locals.user = find
            next()
        } else if (find.auth == false) {
            res.redirect("http://magicgo.taipei:8081/register")
        } else {
            res.clearCookie("session")

            res.sendStatus(403)
        }
    })
}


app.use("/line", lineRouter)
app.use("/classroom", checkLoginStatus, classroomRoute)

app.get("/user/information", checkLoginStatus, (req, res) => {
    store.findUserByToken(user_file, req.cookies.session).then(data => {
        let passData = {
            user_id: data.account_id,
            user_department: data.usr_department,
            user_class: data.usr_class,
            user_std_id: data.usr_id,
            user_name: data.usr_name,
            user_permission: data.usr_position
        }
        res.json(passData)
    })
})

app.post("/editAccount", checkLoginStatus, (req, res) => {
    findUserByToken(user_file, req.cookies.session).then(data => {
        data.usr_department = req.body.stdDepartment
        data.usr_class = req.body.stdClass
        //data.usr_id = req.body.stdId
        data.usr_name = req.body.stdName
        data.auth = true
        writeUserById(user_file, data.account_id, data).then(() => {
            res.sendStatus(201)
        })

    })
})


app.post("/register", (req, res) => {
    findUserByToken(user_file, req.cookies.session).then(data => {
        if (data.auth == false) {
            data.usr_department = req.body.stdDepartment
            data.usr_class = req.body.stdClass
            data.usr_id = req.body.stdId
            data.usr_name = req.body.stdName
            data.auth = true
            writeUserById(user_file, data.account_id, data).then(() => {
                res.sendStatus(201)
            })
        } else {
            res.sendStatus(403)
        }

    })
})

app.get('/logout',(req,res)=>{
    res.clearCookie('session')
    res.sendStatus(200)
})


app.get("/*", (req, res) => {
    res.sendStatus(404)
})


app.listen(port, () => {
    console.log(`>> Back End server start at ${port} port `)
})
