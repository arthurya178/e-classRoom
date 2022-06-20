const express = require('express')
const axios = require("axios");
const qs = require('qs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const store = require("./store")
const router = express.Router()

//---------------- Setting Start ----------------
const line_redirect_URL = "http://magicgo.taipei:8080/line/auth"
const line_client_id = "1657023760"
const line_client_secret = "ed3aa803d424da403adcfd42dc0ccf39"
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

router.get("/test", (req, res) => {
    fs.readFile(user_file, 'utf8', (error, data) => {
        if (error) {
            console.log(error)
            res.sendStatus(401)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})


router.get("/state", (req, res) => {
    let jwtData = {
        state: "LineRegister"
    }
    let signature = jwt.sign(jwtData, "classRoomWithLine")
    //let signature = "123"
    res.send(signature)
})


router.get('/auth', (req, res) => {
    if (typeof req.query.code !== undefined && typeof req.query.state !== undefined) {
        let lineTokenBody = {
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: line_redirect_URL,
            client_id: line_client_id,
            client_secret: line_client_secret,
        }
        //console.log(lineTokenBody);
        // Oauth 取得實際用戶代碼
        axios.request(
            {
                method: "post",
                url: 'https://api.line.me/oauth2/v2.1/token',
                data: qs.stringify(lineTokenBody),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ).then((result) => {
            console.log(result.data)
            let show = jwt.decode(result.data.id_token)
            console.log(show.sub)
            // 取得使用者完整資料
            store.findUserByLineId(user_file, show.sub).then((usrData) => {
                console.log(`User Exist SUB : ${show.sub}`)
                console.log(`User ID : ${usrData}`)
                if (usrData != undefined && usrData.auth) {
                    console.log("Account Exist -> Login")
                    store.generateToken(user_file, usrData.account_id).then((token) => {
                        console.log("Got Token")
                        res.clearCookie("session")
                        res.cookie("session", token, {maxAge: 3600000})
                        res.redirect("http://magicgo.taipei:8081/classroom")
                    })
                } else {
                    console.log("Account Not Exist -> Create")
                    store.createNewUser(user_file, show.sub).then((userID) => {
                        store.generateToken(user_file, userID).then((token) => {
                            res.clearCookie("session")
                            res.cookie("session", token, {maxAge: 3600000})
                            res.redirect("http://magicgo.taipei:8081/register")
                        })
                    })
                }
            })


        }).catch((err)=>{
            console.log(err)
        })

    }
})

router.get('/test2', (req, res) => {
    res.send(store.generateRandomString())
})


router.get('*', (req, res) => {
    res.send("Line Route")
})


module.exports = router