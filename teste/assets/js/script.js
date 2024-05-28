function showNav(){
    let icon = document.querySelector(".icon-nav-mobile")
    let menu = document.querySelector(".mobile-menu")
    console.log()
    if(menu.classList.contains('open')){
        menu.classList.remove('open')
        icon.classList.add('fa-bars')
        icon.classList.remove('fa-x')

    }else{
        menu.classList.add('open')
        icon.classList.remove('fa-bars')
        icon.classList.add('fa-x')
        
    }
}