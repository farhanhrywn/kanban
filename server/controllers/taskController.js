const  { Task } = require('../models')

class Controller {
    static async fetchAllTask(req, res, next) {
        try {
            const allTask = await Task.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(allTask)
        } catch (error) {
            res.status(500).json("Internal Server Error")
        }
    }

    static async addTask(req, res, next) {
        let userId = req.loginUser.id
        try {
            const payload = {
                title: req.body.title,
                description: req.body.description,
                UserId: userId
            }
            const task = await Task.create(payload)
            res.status(201).json(task)
        } catch(err) {
            next(err)
        }
    }

    static async editTask(req, res, next) {
        try {
            const id = +req.params.id
            const payload = {
                title: req.body.title,
                description: req.body.description
            }
            const task = await Task.update(payload, {
                where: {
                    id
                },
                returning: true
            })
            if(task[0] == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json(task[1][0])
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTask(req, res, next) {
        try {
            let id = +req.params.id
            const task = await Task.destroy({
                where: {
                    id
                }
            })
            if(task == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json({ message: 'To do success delete' })
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateTask(req, res, next) {
        try {
            const id = +req.params.id
            const payload = { category: req.body.category }
            const task = await Task.update(payload, {
                where: {
                    id
                },
                returning: true
            })
            if(task[0] == 0) {
                throw { name: "Not Found" }
            } else {
                res.status(200).json(task[1][0])
            }
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller