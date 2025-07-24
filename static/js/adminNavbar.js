const navbar = document.createElement('nav');
navbar.classList.add('navbar', 'fixed-top', 'navbar-expand-lg', 'cust-navbar');
navbar.innerHTML = `
    <div class="container-xxl">
        <a class="navbar-brand" href="/admin">
            <img src="/image/logo-black.png" class="navbar-logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#cust-navbar" aria-controls="cust-navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="cust-navbar" style="justify-content: end;">
            <div class="navbar-nav">
                <a class="nav-link" href="/admin">Home</a>
                <a class="nav-link admin-works" href="/admin/works">Works</a>
                <a class="nav-link admin-clients" href="/admin/clients">Clients</a>
                <a class="nav-link admin-employee" href="/admin/employee">Employee</a>
                <a class="nav-link admin-invoice" href="/admin/invoice">Invoice</a>
                <a class="nav-link admin-account" href="/admin/account">Account</a>
            </div>
        </div>
    </div>
`
document.body.append(navbar)


    // < nav class="navbar fixed-top navbar-expand-lg cust-navbar" >
    //     <div class="container-xxl">
    //         <a class="navbar-brand" href="/">
    //             <img src="/image/logo-white.png" class="navbar-logo">
    //         </a>
    //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    //             <span class="navbar-toggler-icon"></span>
    //         </button>
    //         <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style="justify-content: end;">
    //             <div class="navbar-nav">
    //                 <a class="nav-link" href="/admin">Home</a>
    //                 <a class="nav-link admin-works" href="/admin/works">Works</a>
    //                 <a class="nav-link admin-clients" href="/admin/clients">Clients</a>
    //                 <a class="nav-link admin-employee" href="/admin/employee">Employee</a>
    //                 <a class="nav-link admin-invoice" href="/admin/invoice">Invoice</a>
    //                 <a class="nav-link admin-account" href="/admin/account">Account</a>
    //             </div>
    //         </div>
    //     </div>
    // </ >