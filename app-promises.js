const users = [{
    id:1,
    name:"navjot",
    schoolId: 101
}, {
    id: 2,
    name: "jot",
    schoolId: 111
}]
const grades = [{
    id:1,
    schoolId:101,
    grade:99
}, {
    id: 2,
    schoolId: 111,
    grade: 89
}, {
    id: 3,
    schoolId: 101,
    grade: 100
}]

const getUser = (id)=>{
    return new Promise((resolve,reject)=>{
        const user = users.find((user)=>{
            return user.id === id;
        })
        if(user){
            resolve(user)
        }else{
            reject(`no user with id: ${id} `)
        }
    })
}

const getGrades = (schoolId)=>{
    return new Promise((resolve,reject)=>{
        resolve(grades.filter((grade)=>{
         return   grade.schoolId===schoolId
        }))
    })
}

const getStatus = (userId)=>{
    let user
    return getUser(userId).then((tempUser) => {
        user = tempUser
        return getGrades(user.schoolId)
    }).then((grades)=>{
        let average =0
        if(grades.length>0){
            average = grades.map((grade)=>grade.grade).reduce((a,b)=>a+b)/grades.length
        }
        return `${user.name} has a ${average}% in the class `
        console.log(average)
    })
}

const getStatusAlt = async (userId)=>{
    const user = await getUser(userId)
    const grades = await getGrades(user.schoolId)
    let average = 0
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length
    }
    return `${user.name} has a ${average}% in the class `
}

getStatusAlt(2).then((data)=>{
    console.log(data)
}).catch((e)=>{
    console.log(e)
})

// getUser(1).then((user)=>{
//     console.log(user)
// }).catch((e)=>{
//     console.log(e)
// })
// getGrades(111).then((grades)=>{
//     console.log(grades)
// }).catch((e)=>{
//     console.log(e)
// })
// getStatus(1).then((status) => {
//     console.log(status)
// }).catch((e)=>{
//     console.log(e)
// })