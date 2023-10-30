import { Request, Response } from "express";

const { createTask } = require("../controllers/task/task.create");
const { updateTask } = require("../controllers/task/task.update");
const { deleteTask } = require("../controllers/task/task.delete");
const { update } = require("../controllers/user/user.update");
const { takeTask } = require('../controllers/employee/employee.task')
const { getUserInfo } = require("../controllers/user/user.info");
const { getFunctionInfo, getFunctionAllInfo } = require("../controllers/company/company.functions");
const { createExpense } = require("../controllers/expenses/expenses.create")
const { updateExpense } = require("../controllers/expenses/expenses.update")
const { deleteExpense } = require("../controllers/expenses/expenses.delete")
const { createLoan } = require("../controllers/loan/loan.create")
const { acceptLoan } = require("../controllers/loan/loan.accepted")
const { deleteLoan } = require("../controllers/loan/loan.delete")
const { companyInfo } = require("../controllers/company/company.info")
const { createCompany } = require("../controllers/company/company.create")
const { hireEmployee } = require("../controllers/company/company.hireEmployee")
const { updateCompany } = require("../controllers/company/company.update")
const { addCeo } = require("../controllers/company/company.addCeo")
const { employeeInfo } = require("../controllers/employee/employee.info")
const { deleteEmployee } = require('../controllers/company/company.deleteEmployee')
const { employeeFind } = require("../controllers/employee/employee.find")

const route = require("express").Router();
const { uploadImg } = require("../controllers/upload");
const multer = require("../middleware/multer");

route.get('/verifyToken/:table', function (_: Request, res: Response) {
    try {
        res.json({ ok: true });
    } catch (error: any) {
        res.json({ ok: false })
    }
})
route.get("/userInfo/:table", getUserInfo)
route.get('/functionInfo/:table/:companyFunction/:id', getFunctionInfo)
route.get('/allFunctionInfo/:table/:companyFunction', getFunctionAllInfo)
route.get('/companyInfo/:table/:companyId', companyInfo)
route.get('/employeeInfo/:table/:employeeId', employeeInfo)
route.post("/upload/:table", multer.single("image"), uploadImg)
route.post('/createCompany/ceo', createCompany)
route.post('/createTask/ceo/:companyId', createTask)
route.post('/createExpense/ceo/:companyId', createExpense)
route.post('/createLoan/employee', createLoan)
route.post('/takeTask/employee/employeeTasks/:companyId', takeTask)
route.post('/findEmployee/ceo', employeeFind)
route.put('/updateUser/:table', update)
route.put('/updateTask/ceo/:id', updateTask)
route.put('/updateExpense/ceo/:id', updateExpense)
route.put('/acceptLoan/ceo/:id', acceptLoan)
route.put('/hireEmployee/ceo/:employeeId/:companyId', hireEmployee)
route.put('/updateCompany/ceo/:companyId', updateCompany)
route.put('/addCeo/ceo/:companyId', addCeo)
route.delete('/deleteEmployee/ceo/:employeeId/:companyId', deleteEmployee)
route.delete('/deleteTask/ceo/:id/:companyId', deleteTask)
route.delete('/deleteExpense/ceo/:id/:companyId', deleteExpense)
route.delete('/deleteLoan/ceo/:id', deleteLoan)

module.exports = route;