const start_btn = document.querySelector(".start-btn button")
const info_box = document.querySelector(".info_box")
const exist_btn = info_box.querySelector(".buttons .quit")
const continue_btn = info_box.querySelector(".buttons .restart")
const quiz_box = document.querySelector(".quiz_box")
const timeCount = quiz_box.querySelector(".timer .timer_sec")
const timeLine  = quiz_box.querySelector(".time_line")


const options_list = document.querySelector(".option_list")

// if the start quiz btn is clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");//show the info box
}
// if the exist quiz is clicked
exist_btn.onclick =()=>{
    info_box.classList.remove("activeInfo");//hide the info box
}
// if the continue quiz is clicked
continue_btn.onclick = ()=>{
    // info_box.classList.remove("activeInfo"); hide the info box
    quiz_box.classList.add("activeQuiz");//show the quiz box
    showQuestions(0)
    queCounter(1)
    startTimer(15)
    startTimerLine(0)
}

let que_count = 0
let que_numb = 1
let counter;
let counterLine;
let timeValue = 15
let widthValue = 0
let userScore = 0

const next_btn = quiz_box.querySelector(".next_btn")
const result_box = document.querySelector(".result_box")
const restart_quiz = result_box.querySelector(".restart")
const quit_quiz = result_box.querySelector(".quit")

restart_quiz.onclick = ()=>{
result_box.classList.remove("activeResult")
quiz_box.classList.add("activeQuiz")
let que_count = 0
let que_numb = 1
let timeValue = 15
let widthValue = 0
let userScore = 0
showQuestions(que_count)
queCounter(que_numb)
clearInterval(counter)
startTimer(timeValue)
clearInterval(counterLine)
startTimerLine(widthValue)
next_btn.style.display = "none"
}

quit_quiz.onclick= ()=>{
    window.location.reload()
}
//if next button is click 
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++
        que_numb++
        showQuestions(que_count)
        queCounter(que_numb)
        clearInterval(counter)
        startTimer(timeValue)
        clearInterval(counterLine)
        startTimerLine(widthValue)
        next_btn.style.display = "none"
    }else{
        console.log("Questions Completed")
        showResultBox()
    }
}

//getting the questions and answers from the array
function showQuestions(index){
    const que_text = document.querySelector(".que_text")
    // const options_list = document.querySelector(".option_list")
    let que_tag = "<span>"+ questions[index].numb +"." + questions[index].question +"</span>"
   let options_tag = '<div class = "option">' + questions[index].options[0] + '<span></span></div>'
                     + '<div class= "option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class= "option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class= "option">'+ questions[index].options[3] +'<span></span></div>'
    que_text.innerHTML = que_tag
    options_list.innerHTML = options_tag


    const option = options_list.querySelectorAll(".option")
    for (let i= 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)")
    }
}
let tickIcon = `<div class="icon tick"><i class="fa fa-check"></i></div>`
let crossIcon = `<div class="icon cross"><i class="fa fa-times"></i></div>`

function optionSelected(answer){
    clearInterval(counter)
    clearInterval(counterLine)
    // startTimer(timeValue)
    let userAns = answer.textContent
    let correctAns = questions[que_count].answer
    let allOptions = options_list.children.length
    // userScore += 1
    console.log(userScore)
    if(userAns == correctAns ){
        userScore += 1
        answer.classList.add("correct")
        console.log("Answer is correct")
        answer.insertAdjacentHTML("beforeend",tickIcon)
    }else{
        answer.classList.add("incorrect")
        console.log("Answer is incorrect")
        answer.insertAdjacentHTML("beforeend",crossIcon)

        //if answers is incorrect then it automatically select the correct answer
        for (let i= 0; i < allOptions; i++) {
            // option[i].setAttribute("onclick","optionSelected(this)")
            if(options_list.children[i].textContent=== correctAns){
                options_list.children[i].setAttribute("class","option correct")
                options_list.children[i].insertAdjacentHTML("beforeend",tickIcon)
            }
        }
    }
    //once user selected disabled all options

    for(let i = 0 ; i < allOptions.length; i++){
        options_list.children[i].classList.add("disabled")
    }
    next_btn.style.display = "block"
}

function showResultBox(){
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");// hide the quix box
    result_box.classList.add("activeResult");// show the result box
    const scoreText = result_box.querySelector(".score_text")
    if(userScore > 3){
        let scoreTag = '<span>and Congrats!!! ,You got <p>'+userScore +'</p>out of<p>'+questions.length +'</p><span>'
        scoreText.innerHTML = scoreTag
    }else if(userScore > 1){
        let scoreTag = '<span>and nice, You got <p>'+userScore +'</p>out of<p>'+questions.length +'</p><span>'
        scoreText.innerHTML = scoreTag
}else{
    let scoreTag = '<span>and sorry, You got only<p>'+userScore +'</p>out of<p>'+questions.length +'</p><span>'
    scoreText.innerHTML = scoreTag
}
}

function startTimer(time){
    counter = setInterval(timer,1000)
    function timer(){
        timeCount.textContent = time
        time--
        if(time < 9){
            let addZero = textContent
            timeCount.textContent = "0" + addZero
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"

            let correctAns = questions[que_count].answer
            let allOptions = options_list.children.length

            for (let i= 0; i < allOptions; i++) {
                // option[i].setAttribute("onclick","optionSelected(this)")
                if(options_list.children[i].textContent=== correctAns){
                    options_list.children[i].setAttribute("class","option correct")
                    options_list.children[i].insertAdjacentHTML("beforeend",tickIcon)
                }
            }
            
            for(let i = 0 ; i < allOptions.length; i++){
        options_list.children[i].classList.add("disabled")
        }
       next_btn.style.display = "block"
        }
    }
}




function startTimerLine(time){
    counterLine = setInterval(timer,29)
    function timer(){
     time += 1
     timeLine.style.width = time + "px"
        // if(time < 9){
        //     let addZero = textContent
        //     timeCount.textContent = "0" + addZero
        // }
        if(time > 549){
            clearInterval(counterLine)
            // timeCount.textContent = "00"
        }
    }
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que")
    let totalQuesCounTag =  '<span><p>'+ index +'</p>of<p>' + questions.length+'</p>Questions</span>'
    bottom_ques_counter.innerHTML = totalQuesCounTag
}