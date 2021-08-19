let animationFinished = true;
let backspacePressed = false;
let input = document.getElementById('inputz')
let clearButton = document.getElementById('clear')
let sendButton = document.getElementById('send')
let savedInput= []
for (i = 0;i<153;i++){
    savedInput[i] = ""
}
let grid = document.getElementById("grid")
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
let atStartOfInput = false;
playButton.classList.add('setPOS')
clearButton.classList.add('setPOS')
sendButton.classList.add('setPOS')
for (r=0;r<153;r++){
    grid.innerHTML+="<input type=\"text\" id="+r+" maxlength=\"0\" />"
}
for (i=0;i<153;i++){
    textfields.push(document.getElementById(""+i));
    setTextfields(i)
    textfields[i].style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
}
playButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
clearButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
sendButton.style.fontSize =Math.floor((window.innerWidth*(32/1920)))+"px"
if (window.innerWidth<=600){
    playButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
    clearButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
    sendButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
    playButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
    playButton.style.setProperty('--leftPOS', 300/19.2 + "vw")
    clearButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
    clearButton.style.setProperty('--leftPOS', 900/19.2 + "vw")
    sendButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
    sendButton.style.setProperty('--leftPOS', 1500/19.2 + "vw")
}

window.addEventListener('resize', function(){
    if (this.window.innerWidth>600){
        playButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
        clearButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
        sendButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
        playButton.style.setProperty('--topPOS', "6.77vw")
        playButton.style.setProperty('--leftPOS', "88.02083vw")
        clearButton.style.setProperty('--topPOS', "19.53125vw")
        clearButton.style.setProperty('--leftPOS', "88.02083vw")
        sendButton.style.setProperty('--topPOS', "32.2916vw")
        sendButton.style.setProperty('--leftPOS', "88.02083vw")
    }
    else{
        
        playButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
        clearButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
        sendButton.style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
        playButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
        playButton.style.setProperty('--leftPOS', 300/19.2 + "vw")
        clearButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
        clearButton.style.setProperty('--leftPOS', 900/19.2 + "vw")
        sendButton.style.setProperty('--topPOS', 1000/19.2 + "vw")
        sendButton.style.setProperty('--leftPOS', 1500/19.2 + "vw")
        
    }
    for (i=0;i<textfields.length;i++){
        textfields[i].style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
    }
})



if (playButton!=null && clearButton!=null){ 
    playButton.addEventListener('mousedown', function(){
        if (window.innerWidth>600){
            playButton.classList.remove('loose')
            playButton.classList.remove('go-back');
            playButton.classList.add('touching');
            playButton.addEventListener('animationend', function(){
                playButton.classList.remove('setPOS')
                playButton.classList.add('squeeze')
            })
        }
        else{
            playButton.style.backgroundColor = '#AEAEAE';
        }
    })
    clearButton.addEventListener('mousedown', function(){
        if (window.innerWidth>600){
            clearButton.classList.remove('loose')
            clearButton.classList.remove('go-back');
            clearButton.classList.add('touching');
            clearButton.addEventListener('animationend', function(){
                clearButton.classList.remove('setPOS')
                clearButton.classList.add('squeeze')
            })
        }
        else{
            clearButton.style.backgroundColor = '#AEAEAE';
        }
    })
    sendButton.addEventListener('mousedown', function(){
        if (window.innerWidth>600){
            sendButton.classList.remove('loose')
            sendButton.classList.remove('go-back');
            sendButton.classList.add('touching');
            sendButton.addEventListener('animationend', function(){
                sendButton.classList.remove('setPOS')
                sendButton.classList.add('squeeze')
            })
        }
        else{
            sendButton.style.backgroundColor = '#AEAEAE';
        }
    })
    window.addEventListener('mouseup', function(){
        if (this.window.innerWidth>600){
            for (i=0;i<playButton.classList.length;i++){
                if (playButton.classList[i]==='touching'){
                    playButton.classList.remove('touching');
                    playButton.classList.remove('squeeze')
                    playButton.classList.add('go-back');
                    playButton.classList.add('loose')
                    play()
                    
                }
            }
            for (i=0;i<clearButton.classList.length;i++){
                if (clearButton.classList[i]==='touching'){
                    clearButton.classList.remove('touching');
                    clearButton.classList.remove('squeeze')
                    clearButton.classList.add('go-back');
                    clearButton.classList.add('loose')
                    clear()
                    
                }
            }
            for (i=0;i<sendButton.classList.length;i++){
                if (sendButton.classList[i]==='touching'){
                    sendButton.classList.remove('touching');
                    sendButton.classList.remove('squeeze')
                    sendButton.classList.add('go-back');
                    sendButton.classList.add('loose')
                    send()
                
                }
            }
        }
    }) 
    playButton.addEventListener('mouseup', ()=>{
        if (window.innerWidth<=600){
            playButton.style.backgroundColor = '#FFFFFF'
            play()
        }
    })
    clearButton.addEventListener('mouseup', ()=>{
        if (window.innerWidth<=600){
            clearButton.style.backgroundColor = '#FFFFFF'
            clear()
        }
    })
    sendButton.addEventListener('mouseup', ()=>{
        if (window.innerWidth<=600){
            sendButton.style.backgroundColor = '#FFFFFF'
            send()
        }
    })
}

function play(){
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

function clear(){
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

function send(){
    for (i=0;i<savedInput.length;i++){
        savedInput[i] = textfields[i].value
        if (savedInput[i]===""){
            savedInput[i] = " "
        }
    }

    const el = document.createElement('textarea');
    el.value = "http://nilayd-lab.github.io/Write-Board/open.html?arr=" + translate();
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el)
    sendButton.textContent = "COPIED"
    sendButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
    let newTimer = this.setInterval(function(){
        sendButton.textContent = "SEND"
        clearInterval(newTimer)
        newTimer = null
    }, 500)
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
        if (textfields[i].value!="" && event.key=="Backspace"){
            if (textfields[i].value.length!=textfields[i].selectionEnd && i!=0){
                textfields[i-1].focus()
            }
            specialKeyPressed = true;
        }
        else if (textfields[i].value=="" && event.key=="Backspace" && i!=0){
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
            event.preventDefault()
        
        }
        else if (event.key=="ArrowRight" && i!=152){
            specialKeyPressed = true
            textfields[i+1].focus()
            event.preventDefault()
        }
        else if (event.key=="ArrowUp" && i>16){
            specialKeyPressed = true
            textfields[i-17].focus()
            event.preventDefault()
        }
        else if (event.key=="ArrowDown" && i<136){
            specialKeyPressed = true
            textfields[i+17].focus()
            event.preventDefault()
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
