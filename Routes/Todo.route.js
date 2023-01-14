const express = require("express")

const TodoRouter = express.Router()
const { TodoModel } = require("../models/todo.model")



TodoRouter.get("/", async (req, res) => {
    try {
        let page=parseInt(req.query.page) - 1 || 0;
        let limit=parseInt(req.query.limit)||5
        let search=req.query.status ||""
        let sort=req.query.sort || "No_ofWord"
        let tag=req.query.tag || "all"
        const tagOption=[
            "personal","family","official","friend","others"
        ]
        tag==="all"?(tag=[...tagOption]):(tag=req.query.tag.split(","))
        req.query.sort?(sort=req.query.sort.split(",")) : (sort=[sort])
        let sortBy = {};
        if (sort[1]){
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc"
        }
        const todo=await TodoModel.find({Task:{$regex:search,$options:"i"}})
        .where("tag")
        .in([...tag])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit)

        const total = await TodoModel.countDocuments({
            Tag:{$in:[...tag]},
            Task:{$regex:search,$options:"i"}
        })

        const response={
            error:false,
            totals:total,
            pages:page+1,
            limits:limit,
            tag:tagOption,
            todos:todo
        }
        res.send(response)

    }catch(er){
        console.log("er",er)
    }

})

TodoRouter.post("/add", async (req, res) => {
    let data = req.body
    try {
        let tdo = new TodoModel(data)
        await tdo.save()
        res.send("data added")

    } catch (er) {
        console.log("er", er)
    }
})

TodoRouter.patch("/edit/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const todo = await TodoModel.findOne({ _id: id })
    const Todouser_id = todo.User_Id
    const Acess_id = payload.User_Id
    try {
        if (Todouser_id !== Acess_id) {
            res.send("you are not Authorised")
        } else {
            await TodoModel.findByIdAndUpdate({ _id: id }, payload)
            res.send("update")
        }

    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})


TodoRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    try {
        await TodoModel.findByIdAndDelete({ _id: id })
        res.send("Delete")
    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})

module.exports = {
    TodoRouter
}
