let adOnScreen = false;
let firstTime = true;
let leftArr = document.getElementById('leftarr')
let rightArr = document.getElementById('rightarr')
leftArr.remove()
rightArr.remove()
let popup = document.getElementById('pop-up')
popup.remove()
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;
let animationFinished = true;
let label = document.getElementById("ad")
let link = document.getElementById("link")
let linkText = link.textContent.split("")
label.remove()
let popupLink = document.getElementById('pop-up-link')
let grid = document.getElementById("grid")
let textfields = [];
let alphabets = "ABCDEFGHIJKLMNOQRSTUVWXYZ".split("");
let playButton = document.querySelector(".play");
playButton.classList.add('setPOS')
let count = 0;
let timer;
let alphabetDone= false;
let cycleDone = false;
let savedInput = [];
let smallScreen = window.innerWidth<=1300
let initTop = getComputedStyle(popup).getPropertyValue('top').substring(0, getComputedStyle(popup).getPropertyValue('top').length-2)
let initLeft = getComputedStyle(popup).getPropertyValue('left').substring(0, getComputedStyle(popup).getPropertyValue('left').length-2)
for (i=0;i<153;i++){
    savedInput[i] = " "
}
let thing = detranslate(document.location.search.replace(/^.*?\=/, ""));
for (i=0;i<thing.length;i++){
    savedInput[i] = thing[i]
}

let cycleEnded = [];
let cycle = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!#&?;. ".split("");
let countDown;

for (r=0;r<153;r++){
    grid.innerHTML+="<td><input type=\"text\" id="+r+" readonly=\"true\" /></td>"
}
for (i=0;i<153;i++){
    textfields.push(document.getElementById(""+i));
    textfields[i].style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
}

playButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
if (smallScreen){
    playButton.style.fontSize = Math.floor((window.innerWidth*(128/1920)))+"px"
    playButton.style.setProperty('--topPOS', 1200/19.2 + "vw")
    playButton.style.setProperty('--leftPOS', 680/19.2 + "vw")
}
window.addEventListener('resize', ()=>{
    initTop = getComputedStyle(popup).getPropertyValue('top').substring(0, getComputedStyle(popup).getPropertyValue('top').length-2)
    initLeft = getComputedStyle(popup).getPropertyValue('left').substring(0, getComputedStyle(popup).getPropertyValue('left').length-2)
    smallScreen = window.innerWidth<=1300
    if (!smallScreen){
        playButton.style.fontSize = Math.floor((window.innerWidth*(32/1920)))+"px"
        playButton.style.setProperty('--topPOS', "19.53125vw")
        playButton.style.setProperty('--leftPOS', "88.02083vw")
        leftArr.remove()
        rightArr.remove()
        popup.remove() 
        removeFadeEffect()
        if (!firstTime){
            document.body.appendChild(label)
        }
    }
    else{
        label.remove()
        playButton.style.fontSize = Math.floor((window.innerWidth*(128/1920)))+"px"
        playButton.style.setProperty('--topPOS', 1200/19.2 + "vw")
        playButton.style.setProperty('--leftPOS', 680/19.2 + "vw")
        if (!firstTime){
            document.body.appendChild(leftArr)
            document.body.appendChild(rightArr)
            
        }
    }
    for (i=0;i<textfields.length;i++){
        textfields[i].style.fontSize = Math.floor((window.innerWidth*(38/1920)))+"px"
    }
    diff = Math.abs(getComputedStyle(leftArr).getPropertyValue('top').substring(0, getComputedStyle(leftArr).getPropertyValue('top').length-2) - getComputedStyle(playButton).getPropertyValue('top').substring(0, getComputedStyle(playButton).getPropertyValue('top').length-2))
    adjustArrow()

})

leftArr.addEventListener('click', ()=>{
    document.body.appendChild(popup)
    popup.classList.add('show-pop-up')
    addFadeEffect()
    leftArr.remove()
    rightArr.remove()
    adOnScreen = true
    popup.addEventListener('animationend', ()=>{
        document.body.appendChild(popup)
        document.documentElement.style.overflow = 'hidden';
        
        
    }) 
})

rightArr.addEventListener('click', ()=>{
    document.body.appendChild(popup)
    popup.classList.add('show-pop-up')
    addFadeEffect()
    leftArr.remove()
    rightArr.remove()
    adOnScreen = true
    

    popup.addEventListener('animationend', ()=>{
        document.body.appendChild(popup)
        document.documentElement.style.overflow = 'hidden';
    }) 
    
})

count=0;
if (playButton!=null){
    let down = false;
    playButton.addEventListener('mousedown', function(){
        if (!adOnScreen){
            down = true;
            if (!smallScreen){
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
        }
        
    })
    window.addEventListener('mouseup', function(){
        if (!smallScreen){
            for (i=0;i<playButton.classList.length;i++){
                if (playButton.classList[i]==='touching'){
                    playButton.classList.remove('touching');
                    playButton.classList.remove('squeeze')
                    playButton.classList.add('go-back');
                    playButton.classList.add('loose')
                    play()
                    
                }
            }
        }
        if (smallScreen && down){
            down = false;
            playButton.style.backgroundColor = '#FFFFFF'
            play()
        }
    })

    link.addEventListener('click', function(){
        link.textContent = "";
        // label.classList.add('hide')
        label.remove()
    })
    
}
let offset = [0,0];
let mousedown = false;
if (popup!=null){
    popup.addEventListener('touchstart', event=>{
        downOperation(event.touches[0])
    }, true)
    window.addEventListener('touchmove', event=>{
        moveOperation(event.touches[0])
    }, true)
    window.addEventListener('touchend', ()=>{
        upOperation()
    }, true)
    
    popup.addEventListener('mousedown', event=>{
        downOperation(event)
    }, true)
    window.addEventListener('mousemove', event=>{
        moveOperation(event)
    }, true)
    window.addEventListener('mouseup', ()=>{
       upOperation()
    }, true)
    
}

function handleGesure(){
    let changeX = touchstartX - touchendX
    let changeY = touchstartY - touchendY
    if (touchendY > touchstartY && Math.abs(changeY)>Math.abs(changeX) && Math.abs(changeY)>60){
        return 'down'
    }
    return 'other'
}

function downOperation(event){
    initTop = getComputedStyle(popup).getPropertyValue('top').substring(0, getComputedStyle(popup).getPropertyValue('top').length-2)
    initLeft = getComputedStyle(popup).getPropertyValue('left').substring(0, getComputedStyle(popup).getPropertyValue('left').length-2)
    touchstartX = event.clientX;
    touchstartY = event.clientY;
    //event.preventDefault()
    if (event.target!=popupLink){
        mousedown = true;
        offset = [
            popup.offsetLeft - event.clientX,
            popup.offsetTop - event.clientY
        ];
    
    }
       
}

function moveOperation(event){
    //event.preventDefault()
    if (mousedown){
        touchendX = event.clientX;
        touchendY = event.clientY; 
        let direction = handleGesure() 
        if (direction!='down'){
            if (Math.abs(event.clientX + offset[0]-initLeft) < 60){
                popup.style.left = (event.clientX + offset[0]) +"px"
            }
            if (Math.abs(event.clientY + offset[1]-initTop) < 60){
                popup.style.top = (event.clientY + offset[1]) + "px"
            }  
        }
        else{
            popup.style.setProperty('--start-XPOS', popup.style.left)
            popup.style.setProperty('--start-YPOS', popup.style.top)
            popup.classList.add('hide-pop-up')  
            popup.addEventListener('animationend', hideAD)
        }  
    }
}

function hideAD(){
    document.body.appendChild(leftArr)
    document.body.appendChild(rightArr) 
    adjustArrow()
    adOnScreen = false
    popup.classList.remove('hide-pop-up')
    popup.classList.remove('show-pop-up')
    popup.style.setProperty('--start-XPOS', "17.7vw")
    popup.style.setProperty('--start-YPOS', "18vh")
    removeFadeEffect()
    document.documentElement.style.overflow = 'auto';
    popup.removeEventListener('animationend', hideAD)
    popup.remove()

}
function upOperation(){
    if (mousedown){
        mousedown = false;
        popup.style.setProperty('--start-XPOS', popup.style.left)
        popup.style.setProperty('--start-YPOS', popup.style.top)
        popup.classList.add('return-to-center')  
        popup.addEventListener('animationend', ()=>{
            popup.style.top = '18vh'
            popup.style.left = '17.7vw'
            popup.classList.remove('return-to-center')
            
        })
    }
  
}















function detranslate(message){
    let num = "";
    let decodedMessage = ""
    let shift = parseInt(message[0] + message[2])
    for (i=5;i<message.length;i++){
        if (message[i]=="!"){
            for (z=i+1;message[z]!="!";z++){
                num+=message[z];
            }
            for (j=0;j<parseInt(num);j++){
                decodedMessage += " "
                
            }
            i+=num.length+1
            num=""
        }
        else if (message[i]=="$"){
            for (z=i+1;message[z]!="$";z++){
                num+=message[z]
            }
            decodedMessage+=String.fromCharCode(decipher(num).charCodeAt(0)-shift)
            i+=num.length+1
            num=""
        }
        else if (message[i]=='('){
            num = decipher(message[i+1])
            decodedMessage+=num
            if (num==""){
                decodedMessage+=message[i+1]
            }
            num=""
            i++
        }
        else{
            num=""
            decodedMessage += String.fromCharCode(message[i].charCodeAt(0)-shift)
        }
    }

    return decodedMessage.split("")
}
function decipher(temp){
    switch (temp){
        case "0":
            return "{"
        case "1":
            return "}"
        case "2":
            return "["
        case "3":
            return "]"
        case "4":
            return "<"
        case "5":
            return ">"
        case "6":
            return "|"
        case "7":
            return "'\'"
        case "8":
            return "^"
        case "9":
            return "~"
        case "10":
            return "`"
        default: 
            return ""
            
    }
}

function showChars(){
    link.innerHTML += "<span class=\"letters\">"+ linkText[count]+"</span>"
    count++;
    if (count===linkText.length){
        clearInterval(countDown)
        countDown = null;
    }
}

function play(){
    if (animationFinished){
        animationFinished = false;
        cycleEnded = [];
        alphabetDone = false;
        cycleDone = false;
        count=0;
        timer = setInterval(onTick, 50); 
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
        animationFinished  = true
        if (firstTime){
            if (!smallScreen){
                document.body.appendChild(label)
                label.classList.add('show')
                }
            else{
                adOnScreen = true;
                document.body.appendChild(popup)
                popup.classList.add('show-pop-up')
                addFadeEffect()
                popup.addEventListener('animationend', ()=>{
                    popup.classList.remove('show-pop-up')
                    document.documentElement.style.overflow = 'hidden';
                }) 
            }
            firstTime = false;
        }
        
        

        
        
    }
    else if (alphabetDone){
    
        for (i=0;i<textfields.length;i++){
            if (!cycleEnded.includes(textfields[i])){
                textfields[i].value = cycle[count];
                
            }
            if (textfields[i].value == savedInput[i]){
                cycleEnded.push(textfields[i]);
                console.log("*")
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

function adjustArrow(){
    let diff = Math.abs(getComputedStyle(leftArr).getPropertyValue('top').substring(0, getComputedStyle(leftArr).getPropertyValue('top').length-2) - getComputedStyle(playButton).getPropertyValue('top').substring(0, getComputedStyle(playButton).getPropertyValue('top').length-2))
    if (diff<700){
        leftArr.style.position = "absolute"
        leftArr.style.top =(500+ parseInt(getComputedStyle(playButton).getPropertyValue('top')))+"px"
        rightArr.style.position = "absolute"
        rightArr.style.top =(500+ parseInt(getComputedStyle(playButton).getPropertyValue('top')))+"px"
    }
}

function addFadeEffect(){
    playButton.classList.add('fade')
    grid.classList.add('fade')
    playButton.style.cursor = "auto"
    
}
function removeFadeEffect(){
    playButton.classList.remove('fade')
    grid.classList.remove('fade')
    playButton.style.cursor = "pointer"
}

function out(){
    playButton.classList.remove('touching')
    playButton.classList.add('go-back');
}
function over(){
    playButton.classList.remove('go-back')
    playButton.classList.add('touching')
}

