function showNav(){
    let menu = document.querySelector(".mobile-menu")
    console.log()
    if(menu.classList.contains('open')){
        menu.classList.remove('open')
    }else{
        menu.classList.add('open')
    }
}