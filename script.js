//hide the breakdowns
const breakdowns = document.querySelectorAll(".breakdown");
[...breakdowns].forEach((element)=>{
    element.style.opacity = "0";
})

//assign the hovering
const bars = document.querySelectorAll(".bar");
[...bars].forEach((element)=>{
    element.addEventListener('mouseover', (e)=>{
        e.target.previousElementSibling.style.opacity="1";
    })
    element.addEventListener('mouseout', (e)=>{
        e.target.previousElementSibling.style.opacity="0";
    })
})

//change today's color
let day = new Date().getDay();
const days = document.querySelectorAll(".day");
days[day].children[1].style.backgroundColor = "hsl(186, 34%, 60%)";

fetch('data.json')
    .then(res => res.json())
    .then((data) => {
        let values = data.map(day => day.amount);
        let percent_as_pixel = 150/(Math.max(...values));
        for (let i=0; i<days.length; i++){
            bars[i].style.height = (data[i].amount*percent_as_pixel)+"px";
            breakdowns[i].innerText = "$"+data[i].amount;
        }
    })