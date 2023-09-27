const { createTask } = require("../controllers/task/task.create");
const { updateTask } = require("../controllers/task/task.update");
const { deleteTask } = require("../controllers/task/task.delete");
const { update } = require("../controllers/update");
const { takeTask } = require('../controllers/employee/employee.task')

const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.post("/upload/:id/:table", multer.single("image"), uploadImg)
route.post('/createTask/CEO', createTask)
route.post('/takeTask/Employee/EmployeeTasks/:employeeId/:idTask', takeTask)
route.put('/createTask/CEO/:id', updateTask)
route.put('/update/:table/:id', update)
route.delete('/deleteTask/CEO/:id', deleteTask)

module.exports = route;