const fs = require("fs");
const {resolve} = require("@babel/core/lib/vendor/import-meta-resolve");

module.exports = {
    generateRandomString: function () {
        let text = ""
        text += Math.random().toString(36).slice(2, 10).toUpperCase();
        text += Math.random().toString(36).slice(2, 10).toUpperCase();
        text += Math.random().toString(36).slice(2, 10).toUpperCase();
        return text
    },
    generateToken: async function (file_path, userId) {
        return new Promise((resolve) => {
            //console.log("GenerateToken")
            fs.readFile(file_path, 'utf8', (error, data) => {
                //console.log("Open Success")
                let userData = JSON.parse(data)
                for (let i = 0; i < userData.length; i++) {
                    if (userData[i].account_id == userId) {
                        userData[i].session = this.generateRandomString()
                        fs.writeFile(file_path, JSON.stringify(userData, null, '\t'), (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                //console.log("FindOut")
                                resolve(userData[i].session)
                            }
                        })
                    }
                }
            })
        })
    }
    ,
    findUserByToken: async function (file_path, userSession) {
        return new Promise((resolve) => {
            fs.readFile(file_path, 'utf8', (error, data) => {
                //console.log(data)
                let userData = JSON.parse(data)
                userData.find((usr) => {
                    if (usr.session == userSession) {
                        //console.log("Find User")
                        //console.log(usr)
                        resolve(usr)
                    }
                })
                resolve(-1)
            })
        })
    },
    findUserByLineId: async function (file_path, lineId) {
        return new Promise((resolve) => {
            fs.readFile(file_path, 'utf8', (err, data) => {
                let userData = JSON.parse(data)
                userData.map((element) => {
                    if (element.line_id == lineId) {
                        resolve(element)
                    }
                })
                resolve(undefined)
            })
        })
    },
    findClassroomUserById:async function(file_path,userId){
        return new Promise((resolve)=>{
            fs.readFile(file_path, 'utf8', (err, data)=>{
                let userData = JSON.parse(data)
                userData.map((element)=>{
                    if(element.stdId == userId)
                    {
                        resolve(element)
                    }
                })
            })
        })
    },
    createNewUser: async function (file_path, lineId) {
        return new Promise((resolve) => {
            fs.readFile(file_path, 'utf8', (err, data) => {
                let userData = JSON.parse(data)
                console.log(userData)
                let newUserData = {
                    line_id: lineId,
                    usr_department: "",
                    usr_class: "",
                    usr_id: "",
                    usr_name: "",
                    last_login: "",
                    usr_position: "student",
                    reg_session: "",
                    auth: false
                }
                if (userData.length == 0) {
                    newUserData.account_id = 0
                } else {
                    newUserData.account_id = userData[userData.length - 1].account_id + 1
                }

                userData.push(newUserData)
                fs.writeFile(file_path, JSON.stringify(userData, null, '\t'), (err) => {
                    if (err)
                        console.log("store/CreateNewUser/writeFile:", err.toString())
                    resolve(newUserData.account_id)
                })
            })
        })
    },
    getClassroomAll: async function (file_path) {
        return new Promise(resolve => {
            fs.readFile(file_path, 'utf8', (err, data) => {
                if(err)
                {
                    console.log(err)
                    resolve()
                }
                else {
                    try{
                        let classroomData = JSON.parse(data)
                        resolve(classroomData)
                    }catch (e)
                    {
                        console.log(e.toString())
                        resolve()
                    }

                }

            })
        })
    },
    createClassroomAll: async function (user_file, classroom_file) {
        return new Promise(resolve => {
            fs.readFile(user_file, 'utf-8', (err, data) => {
                let userData = JSON.parse(data)
                let classRoom = []
                for (let i = 0; i < userData.length; i++) {
                    classRoom.push({
                        accId: userData[i].account_id,
                        stdName: userData[i].usr_name,
                        stdId: userData[i].usr_id,
                        stdStatus: 0,
                    })
                }
                fs.writeFile(classroom_file, JSON.stringify(classRoom, null, '\t'), (err) => {
                    if (err)
                        console.log(err)
                    resolve(classRoom)
                })

            })
        })
    },
    createClassroomExceptTeacher: async function (user_file, classroom_file) {
        return new Promise(resolve => {
            fs.readFile(user_file, 'utf-8', (err, data) => {
                let userData = JSON.parse(data)
                let classRoom = []
                for (let i = 0; i < userData.length; i++) {
                    //console.log(userData[i].usr_position)
                    if(userData[i].usr_position == "student")
                    {
                        classRoom.push({
                            accId: userData[i].account_id,
                            stdName: userData[i].usr_name,
                            stdId: userData[i].usr_id,
                            stdStatus: 0,
                        })
                    }

                }
                fs.writeFile(classroom_file, JSON.stringify(classRoom, null, '\t'), (err) => {
                    if (err)
                        console.log(err)
                    resolve(classRoom)
                })

            })
        })
    },
    updateClassroomStdStatus: function (classroom_file, accId, status) {
        fs.readFile(classroom_file, 'utf-8', (err, data) => {
            let classroomData = JSON.parse(data)
            console.log(`stdID is ${accId} it status is ${status}`)
            for (let i = 0; i < classroomData.length; i++) {
                if (classroomData[i].accId == accId) {
                    console.log(`change`)
                    classroomData[i].stdStatus = status
                }
            }
            fs.writeFile(classroom_file, JSON.stringify(classroomData, null, '\t'), (err) => {
                if (err)
                    console.log(err)
            })
        })
    },
    writeUserById: async function (user_file, accountID, writeInfo) {
        return new Promise(resolve => {
            //console.log("Start Write")
            fs.readFile(user_file, 'utf-8', (err, data) => {
                let userData = JSON.parse(data)
                for (let i = 0; i < userData.length; i++) {
                    //console.log(`Find USER ${userData[i].account_id} TARGET ${accountID}`)
                    if (userData[i].account_id == accountID) {
                        //console.log(`Write USER ${userData[i].account_id}`)
                        userData[i] = writeInfo
                        fs.writeFile(user_file,JSON.stringify(userData,null,"\t"),(err)=>{
                            if(err)
                                console.log(err)
                            else
                                resolve()
                        })

                    }
                }
            })
        })
    },
    getClassroomTitle:async function(classroom_setting_file){
        return new Promise(resolve=>{
            fs.readFile(classroom_setting_file,'utf-8',(err,data)=>{
                if(err)
                {
                    console.log(err)
                    resolve()
                }
                else {
                    let jsonData = JSON.parse(data)
                    resolve(jsonData)
                }


            })
        })

    },
    setClassroomTitle:async function(classroom_setting_file,newTitle){
        return new Promise(resolve=>{
            let data = {
                title:newTitle
            }
            fs.writeFile(classroom_setting_file,JSON.stringify(data,null,'\t'),err => {
                resolve()
            })
        })
    }

}