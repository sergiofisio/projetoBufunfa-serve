const { createTask } = require("../controllers/task/task.create");
const { updateTask } = require("../controllers/task/task.update");
const { deleteTask } = require("../controllers/task/task.delete");
const { update } = require("../controllers/user/user.update");
const { takeTask, deleteTaskEmployee } = require('../controllers/employee/employee.task')
const { getUserInfo } = require("../controllers/user/user.info");
const { getTaskInfo, getAllTasks } = require("../controllers/task/tasks");

const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.get("/userInfo/:table/:id", getUserInfo)
route.get('/task/:table/:id', getTaskInfo)
route.get('/tasks/:table', getAllTasks)
route.post("/upload/:table/:id", multer.single("image"), uploadImg)
route.post('/createTask/ceo', createTask)
route.post('/takeTask/employee/employeeTasks/:employeeId/:taskId', takeTask)
route.put('/createTask/ceo/:id', updateTask)
route.put('/update/:table/:id', update)
route.delete('/deleteTask/ceo/:id', deleteTask)
route.delete('/deleteTask/employee/employeeTasks/:employeeId/:taskId', deleteTaskEmployee)

module.exports = route;