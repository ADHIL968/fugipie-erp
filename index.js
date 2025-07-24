require('dotenv').config()
const express = require('express')
const app = express()
app.set('view engine', 'ejs')

const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const connectMongoose = require('./config/database')

const validateAdmin = require('./middleware/validateAdmin')
const validateClient = require('./middleware/validateClient')
const validateEmployee = require('./middleware/validateEmployee')

const adminAuthRoute = require('./routes/adminAuth')
const adminRoute = require('./routes/admin')
const adminClientsRoute = require('./routes/adminClients')
const adminWorkRoute = require('./routes/adminWork')
const adminEmployeeRoute = require('./routes/adminEmployee')
const adminInvoiceRoute = require('./routes/adminInvoice')
const adminAccountRoute = require('./routes/adminAccount')

const clientAuthRoute = require('./routes/clientAuth')
const clientRoute = require('./routes/client')

const employeeAuthRoute = require('./routes/employeeAuth')
const employeeRoute = require('./routes/employee')

app.use('/admin', adminAuthRoute)
app.use('/admin', validateAdmin, adminRoute)
app.use('/admin/clients', validateAdmin, adminClientsRoute)
app.use('/admin/works', validateAdmin, adminWorkRoute)
app.use('/admin/employee', validateAdmin, adminEmployeeRoute)
app.use('/admin/invoice', validateAdmin, adminInvoiceRoute)
app.use('/admin/account', validateAdmin, adminAccountRoute)

app.use('/employee', employeeAuthRoute)
app.use('/employee', validateEmployee, employeeRoute)

app.use('/', clientAuthRoute)
app.use('/', validateClient, clientRoute)


app.use((req, res) => {
    console.log(`undefined route: ${req.method} ${req.originalUrl}`);
    return res.redirect('/')
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server started @ ${port}`)
    connectMongoose()
})