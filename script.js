

let animationFinished = true;
let backspacePressed = false;
let input = document.getElementById('inputz')
let clearButton = document.getElementById('clear')
let sendButton = document.getElementById('send')
let savedInput= []
for (i = 0;i<153;i++){
    savedInput[i] = ""
}
let table = document.getElementById("table")
let textfields = [];
let alphabets = "ABCDEFGHIJKLMNOQRSTUVWXYZ".split("");
let playButton = document.getElementById("play");
let count = 0;
let timer;
let alphabetDone= false;
let cycleDone = false;
let cycleEnded = [];
let cycle = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!#&?;. ".split("");
let countDown;
playButton.classList.add('setPOS')
clearButton.classList.add('setPOS')
sendButton.classList.add('setPOS')
for (r=0;r<9;r++){
    table.innerHTML+="<tr id=\"row" + r + "\"></tr>"
    for (c=0;c<17;c++){
        document.getElementById("row"+r).innerHTML += "<td><input type=\"text\" id="+count+" maxlength=\"0\" /></td>"
        count++;
    }
}
for (i=0;i<count;i++){
    textfields.push(document.getElementById(""+i));
    setTextfields(i)
}

count=0;

if (playButton!=null && clearButton!=null){ 
    playButton.addEventListener('mousedown', function(){
        playButton.classList.remove('loose')
        playButton.classList.remove('go-back');
        playButton.classList.add('touching');
        playButton.addEventListener('animationend', function(){
            playButton.classList.remove('setPOS')
            playButton.classList.add('squeeze')
        })
    })
    clearButton.addEventListener('mousedown', function(){
        clearButton.classList.remove('loose')
        clearButton.classList.remove('go-back');
        clearButton.classList.add('touching');
        clearButton.addEventListener('animationend', function(){
            clearButton.classList.remove('setPOS')
            clearButton.classList.add('squeeze')
        })
    })
    sendButton.addEventListener('mousedown', function(){
        sendButton.classList.remove('loose')
        sendButton.classList.remove('go-back');
        sendButton.classList.add('touching');
        sendButton.addEventListener('animationend', function(){
            sendButton.classList.remove('setPOS')
            sendButton.classList.add('squeeze')
        })
    })
    window.addEventListener('mouseup', function(){
        for (i=0;i<playButton.classList.length;i++){
            if (playButton.classList[i]==='touching'){
                playButton.classList.remove('touching');
                playButton.classList.remove('squeeze')
                playButton.classList.add('go-back');
                playButton.classList.add('loose')
                if (animationFinished){
                    animationFinished = false;
                    for (i=0;i<textfields.length;i++){
                        savedInput[i] = textfields[i].value
                    }
                    cycleEnded = [];
                    alphabetDone = false;
                    cycleDone = false;
                    count=0;
                    timer = setInterval(onTick, 50); 
                }
                
            }
        }
        for (i=0;i<clearButton.classList.length;i++){
            if (clearButton.classList[i]==='touching'){
                clearButton.classList.remove('touching');
                clearButton.classList.remove('squeeze')
                clearButton.classList.add('go-back');
                clearButton.classList.add('loose')
                if (animationFinished){
                    cycleEnded = [];
                    alphabetDone = false;
                    cycleDone = false;
                    count=0;
                    savedInput = [];
                    for (i=0;i<textfields.length;i++){
                        textfields[i].value = ""
                    } 
                }
                
            }
        }
        for (i=0;i<sendButton.classList.length;i++){
            if (sendButton.classList[i]==='touching'){
                sendButton.classList.remove('touching');
                sendButton.classList.remove('squeeze')
                sendButton.classList.add('go-back');
                sendButton.classList.add('loose')
                for (i=0;i<savedInput.length;i++){
                    savedInput[i] = textfields[i].value
                    if (savedInput[i]===""){
                        savedInput[i] = " "
                    }
                }
            
                const el = document.createElement('textarea');
                el.value = "http://nilayd-lab.github.io/Write-Board/open.html?arr=" + translate();
                console.log("thing")
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el)
                sendButton.textContent = "COPIED"
                sendButton.style.fontSize = "30px";
                let newTimer = this.setInterval(function(){
                    sendButton.textContent = "SEND"
                    clearInterval(newTimer)
                    newTimer = null
                }, 500)
               
            }
        }
    }) 
}

function translate(){
    let temp = ""
    let shift = Math.trunc(((Math.random()*4)+10))
    let message = shift.toString()[0] + Math.trunc(Math.random()*10) + shift.toString()[1] + Math.trunc(Math.random()*10) +"-"
    let count= 0
    for (i=0;i<savedInput.length;i++){
        if (savedInput[i]===" "){
            count++;
        }
        else{
            if (count>0){
                message+="!"+count+"!"
            }
            count=0;
            temp = String.fromCharCode(savedInput[i].charCodeAt(0)+shift)
            if (savedInput[i].charCodeAt(0)+shift<=126){
                message+=cipher(temp)
                if (cipher(temp)==""){
                   message+=String.fromCharCode(savedInput[i].charCodeAt(0)+shift) 
                }
                console.log(message)
            }
            else {
                switch (temp){
                    case "{":
                        message+= "(0"
                        break
                    case "}":
                        message+= "(1"
                        break
                    case "|":
                        message+= "(6"
                        break
                    case "~":
                        message+= "(9"
                        break
                }
                if (message.charAt(message.length-1)!="("){
                    message+="("+savedInput[i]
                 }
               
            }
            
        }
    }
    if (count==savedInput.length){
        message=""
    }

    return message
}

function cipher(temp){
    switch (temp){
        case "{":
            return "$0$"
        case "}":
            return "$1$"
        case "[":
            return "$2$"
        case "]":
            return "$3$"
        case "<":
            return "$4$"
        case ">":
            return "$5$"
        case "|":
            return "$6$"
        case "'\'":
            return "$7$"
        case "^":
            return "$8$"
        case "~":
            return "$9$"
        case "`":
            return "$10$"
        default:
            return ""    
    }
}

function onTick(){
    if (cycleDone){
        for (i=0;i<textfields.length;i++){
            if (savedInput[i] == ""){
                textfields[i].value = "";
            }
            else{
                textfields[i].value = savedInput[i];
            }
        }
        clearInterval(timer);
        timer = null;
        count=0;
        animationFinished = true
        
    }
    else if (alphabetDone){
        for (i=0;i<textfields.length;i++){
            if (!cycleEnded.includes(textfields[i])){
                textfields[i].value = cycle[count];
            }
            if (textfields[i].value == savedInput[i]){
                cycleEnded.push(textfields[i]);
                
            }
        }
        count++;
        if (count===cycle.length){
            cycleDone = true;
        }
    }
    else {
        for (i=0;i<textfields.length;i++){
            textfields[i].value = alphabets[count];
        }
        count++;
        if (count===alphabets.length){
            count=0;
            alphabetDone= true;
        } 
    }
    
    
}
//maxlength=\"1\"
function setTextfields(i){
    textfields[i].addEventListener('keydown', function(event){
        if(textfields[i].value==="" && event.key!="Backspace" && event.key!="Enter" && event.key!="ArrowLeft"){
            textfields[i].value = ""
        }
        if (textfields[i].value==="" && event.key=="Backspace" && i!=0){
            specialKeyPressed = true;
            textfields[i-1].focus()
        }
        else if (event.key=="Enter" && i<136){
            specialKeyPressed = true
            textfields[i+17].focus()
        }
        else if (event.key=="ArrowLeft" && i!=0){
            specialKeyPressed = true
            textfields[i-1].focus()
        }
        else if (event.key=="ArrowRight" && i!=152){
            specialKeyPressed = true
            textfields[i+1].focus()
        }
        else if (event.key=="ArrowUp" && i>16){
            specialKeyPressed = true
            textfields[i-17].focus()
        }
        else if (event.key=="ArrowDown" && i<136){
            specialKeyPressed = true
            textfields[i+17].focus()
        }
        else if (event.key.length<2){ 
            specialKeyPressed = false;
            if (event.key.charCodeAt(0)<=126){
                textfields[i].value = event.key
            }
            else{
                specialKeyPressed = true
            }
           
        }
        textfields[i].addEventListener('keypress', function(){
            if (specialKeyPressed && textfields[i].value!==""){
                savedInput[i] = textfields[i].value
            }
            if (textfields[i].value ==="" && !specialKeyPressed){
                savedInput[i] = textfields[i].value
            }
            if (i+1!=textfields.length && !specialKeyPressed){
                savedInput[i] = textfields[i].value
                textfields[i].blur();
                textfields[i+1].focus()
                 
            }
            
            
            
        })
        
        
    })
}

function out(){
    button.classList.remove('touching')
    button.classList.add('go-back');
}
function over(){
    button.classList.remove('go-back')
    button.classList.add('touching')
}
// link.onclick=function(){
    
//     //sessionStorage.setItem('array', JSON.stringify(array))
//     //localStorage.setItem("vOneLocalStorage", array)
//     window.document.location = './open.html'+'?arr=' + input.value
//     //window.location.href = 'open.html'
// }
