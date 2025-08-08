var nav = document.createElement("div")
nav.classList.add("custom-navbar", "fixed-top")
nav.innerHTML = `<div class="container-xxl d-flex justify-content-between align-items-center">
            <a href=""><img src="/image/logo-black.png" alt="" class="navbar-logo"></a>
            <a href="/logout" class="delete-anchor py-2 px-5">Logout</a>
        </div>`

var adjust = document.createElement("div")
adjust.classList.add("adjust")


document.body.prepend(nav, adjust)