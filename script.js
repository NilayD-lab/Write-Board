let link = document.getElementById("testlink")
let input = document.getElementById('inputz')
let array= []

link.onclick=function(){
    array = input.value.split("")
    //sessionStorage.setItem('array', JSON.stringify(array))
    localStorage.setItem("vOneLocalStorage", array)
    window.location.href = 'open.html'
}
