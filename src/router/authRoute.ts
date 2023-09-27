const { createTask } = require("../controllers/task/task.create");
const { updateTask } = require("../controllers/task/task.update");
const { deleteTask } = require("../controllers/task/task.delete");
const { update } = require("../controllers/user/user.update");
const { takeTask, deleteTaskEmployee } = require('../controllers/employee/employee.task')
const { getUserInfo } = require("../controllers/user/user.info");
const { getTaskInfo, getAllTasks } = require("../controllers/task/tasks");
const { createExpense } = require("../controllers/expenses/expenses.create")
const { updateExpense } = require("../controllers/expenses/expenses.update")

const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.get("/userInfo/:table", getUserInfo)
route.get('/task/:table/:taskId', getTaskInfo)
route.get('/tasks/:table', getAllTasks)
route.post("/upload/:table", multer.single("image"), uploadImg)
route.post('/createTask/ceo', createTask)
route.post('/createExpense/:table', createExpense)
route.post('/takeTask/employee/employeeTasks/:taskId', takeTask)
route.put('/updateUser/:table', update)
route.put('/updateTask/ceo/:id', updateTask)
route.put('/updateExpense/:table/:id', updateExpense)
route.delete('/deleteTask/ceo/:id', deleteTask)
route.delete('/deleteExpense/:table/:id', deleteTask)
route.delete('/deleteTask/employee/employeeTasks/:taskId', deleteTaskEmployee)

module.exports = route;