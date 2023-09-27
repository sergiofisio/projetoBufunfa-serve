const { createTask } = require("../controllers/task/task.create");
const { updateTask } = require("../controllers/task/task.update");
const { deleteTask } = require("../controllers/task/task.delete");
const { update } = require("../controllers/update");
const { takeTask } = require('../controllers/employee/employee.task')

const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.post("/upload/:id/:table", multer.single("image"), uploadImg)
route.post('/createTask/ceo', createTask)
route.post('/takeTask/employee/employeeTasks/:employeeId/:idTask', takeTask)
route.put('/createTask/ceo/:id', updateTask)
route.put('/update/:table/:id', update)
route.delete('/deleteTask/ceo/:id', deleteTask)

module.exports = route;