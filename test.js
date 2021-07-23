
let label = document.getElementById("ad")
let link = document.getElementById("link")
let linkText = link.textContent.split("")
link.textContent = ""
let table = document.getElementById("table")
let textfields = [];
let alphabets = "ABCDEFGHIJKLMNOQRSTUVWXYZ".split("");
let button = document.querySelector(".play");
let count = 0;
let timer;
let alphabetDone= false;
let cycleDone = false;
let savedInput = [];
for (i=0;i<153;i++){
    savedInput[i] = " "
}
let thing = detranslate(document.location.search.replace(/^.*?\=/, ""));
for (i=0;i<thing.length;i++){
    savedInput[i] = thing[i]
}
console.log(savedInput)
let cycleEnded = [];
let cycle = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!#&?;. ".split("");
let countDown;


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
                console.log("ddd")
            }
            i+=num.length+1
            console.log(num.length)
        }
        else{
            num=""
            decodedMessage += String.fromCharCode(message[i].charCodeAt(0)-shift)
        }
    }
    console.log(decodedMessage.split(""))
    return decodedMessage.split("")
}

for (r=0;r<9;r++){
    table.innerHTML+="<tr id=\"row" + r + "\"></tr>"
    for (c=0;c<17;c++){
        document.getElementById("row"+r).innerHTML += "<td><input type=\"text\" id="+count+" readonly=\"true\" /></td>"
        count++;
    }
}
for (i=0;i<count;i++){
    textfields.push(document.getElementById(""+i));
}

count=0;
if (button!=null){
    
    button.addEventListener('mousedown', function(){
        button.classList.remove('go-back');
        button.classList.add('touching');
        
    })
    window.addEventListener('mouseup', function(){
        for (i=0;i<button.classList.length;i++){
            if (button.classList[i]==='touching'){
                button.classList.remove('touching');
                button.classList.add('go-back');
                cycleEnded = [];
                alphabetDone = false;
                cycleDone = false;
                count=0;
                timer = setInterval(onTick, 50);
            }
        }
    })
    link.addEventListener('click', function(){
        link.textContent = "";
        label.classList.add('hide')
    })
    
}
function showChars(){
    link.innerHTML += "<span class=\"letters\">"+ linkText[count]+"</span>"
    count++;
    if (count===linkText.length){
        clearInterval(countDown)
        countDown = null;
    }
}
function onTick(){
    let firstTime = true;
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
        for (i=0;i<label.classList.length;i++){
            if (label.classList[i]==='show'){
                firstTime = false;
            }
        }
        if (firstTime){
            label.classList.add('show')
            countDown = setInterval(showChars, 30)
        }
        
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

function out(){
    button.classList.remove('touching')
    button.classList.add('go-back');
}
function over(){
    button.classList.remove('go-back')
    button.classList.add('touching')
}
