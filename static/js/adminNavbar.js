
const navbar = document.createElement('div');
navbar.classList.add('cust-navbar');
navbar.innerHTML = `
    <img src="/image/logo-black.png" alt="" class="navbar-logo">
    <i class="bi bi-list offcanvas-open" onclick="openOffcanvas()"></i>
    <i class="bi bi-x-lg offcanvas-close" onclick="closeOffcanvas()"></i>
`

const offcanvas = document.createElement('div')
offcanvas.classList.add('cust-offcanvas')
document.body.append(navbar, offcanvas)

var offCanvasOpenButton = document.querySelector('.offcanvas-open')
var offCanvasCloseButton = document.querySelector('.offcanvas-close')
var offCanvas = document.querySelector('.cust-offcanvas')
var sidebar = document.querySelector('.sidebar')

var content = `
<img src="/image/logo-white.png" alt="" class="sidebar-logo">
            <div class="nav-container">
                <a href="/admin" class="nav-items admin-home"><i class="bi bi-house-door-fill"></i>&nbsp;&nbsp;Home</a>
                <a href="/admin/works" class="nav-items admin-works"><i class="bi bi-diagram-3-fill"></i>&nbsp;&nbsp;Works</a>
                <a href="/admin/clients" class="nav-items admin-clients"><i class="bi bi-people-fill"></i>&nbsp;&nbsp;Clients</a>
                <a href="/admin/employee" class="nav-items admin-employee"><i class="bi bi-person-vcard"></i>&nbsp;&nbsp;Employee</a>
                <a href="/admin/invoice" class="nav-items admin-invoice"><i class="bi bi-receipt-cutoff"></i>&nbsp;&nbsp;Invoice</a>
                <a href="/admin/salary" class="nav-items admin-salary"><i class="bi bi-currency-exchange"></i>&nbsp;&nbsp;Salary</a>
                <a href="/admin/account" class="nav-items admin-account"><i class="bi bi-bar-chart-fill"></i>&nbsp;&nbsp;Account</a>
                <a href="/admin/logout" class="nav-items logout mt-4"><i class="bi bi-box-arrow-left"></i>&nbsp;&nbsp;Logout</a>
            </div>
`
sidebar.innerHTML = content
offCanvas.innerHTML = content

function openOffcanvas() {
    offCanvas.style.display = "block"
    setTimeout(() => {
        offCanvas.style.transform = "translateX(0)"
        offCanvasOpenButton.style.display = "none"
        offCanvasCloseButton.style.display = "block"
    }, 20)
}

function closeOffcanvas() {
    offCanvas.style.transform = "translateX(100vw)"
    setTimeout(() => {
        offCanvas.style.display = "none"
        offCanvasCloseButton.style.display = "none"
        offCanvasOpenButton.style.display = "block"
    }, 420)
}

window.onresize = () => {
    return closeOffcanvas()
}