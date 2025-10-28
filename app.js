const bodyEl = document.body;
const formEl = document.querySelector('.form');
const wrapperEl = document.querySelector('.wrapper');
const prevBtn = document.querySelector('.btn:nth-child(1)');
const nextBtn = document.querySelector('.btn:nth-child(2)');



// colors
const colors = JSON.parse(localStorage.getItem('colors')) || []

// active color
let activeColor = colors.length-1;

// create square
const createSquareEl = (colors) => {
    wrapperEl.innerHTML = '';
    colors.forEach((color) => {
        let squareEl = document.createElement('span');
        squareEl.className = 'square'; 
        squareEl.style.backgroundColor = color;
        wrapperEl.append(squareEl);
    });
    if (wrapperEl.children[activeColor]) {
        wrapperEl.children[activeColor].classList.add("active-square");
        bodyEl.style.backgroundColor = colors[activeColor];
    }
}
if(activeColor>0){
    createSquareEl(colors)
}

// submit form
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formEl);
    const color = formData.get('color').trim();

    bodyEl.style.backgroundColor = color;
    formEl.style.setProperty('--form-bg', color); 

    if(
        bodyEl.style.backgroundColor === color && 
        colors[colors.length-1] != color
    ){
        activeColor++;
        colors.push(color);
        createSquareEl(colors);

        localStorage.setItem('colors', JSON.stringify(colors));
    }
    formEl.reset();
});


function updateFormBg() {
    formEl.style.setProperty('--form-bg', colors[activeColor] || '#fff');
}
prevBtn.addEventListener("click", ()=>{
    if(activeColor > 0 ){
        activeColor--;
    wrapperEl.childNodes.forEach((el)=>{
        el.classList.remove("active-square")
    });
        if(wrapperEl.children[activeColor]){
            wrapperEl.children[activeColor].classList.add("active-square")
        }
    }else{
        activeColor = colors.length - 1;
    wrapperEl.childNodes.forEach((el)=>{
        el.classList.remove("active-square")
    });
        if(wrapperEl.children[activeColor]){
            wrapperEl.children[activeColor].classList.add("active-square")
        }
    }
    bodyEl.style.backgroundColor = colors[activeColor]
    updateFormBg();
})

nextBtn.addEventListener("click", ()=>{
    if(activeColor < colors.length - 1){
        activeColor++;
    wrapperEl.childNodes.forEach((el)=>{
        el.classList.remove("active-square")
    });
        if(wrapperEl.children[activeColor]){
            wrapperEl.children[activeColor].classList.add("active-square")
        }
    }else{
        activeColor = 0;
    wrapperEl.childNodes.forEach((el)=>{
        el.classList.remove("active-square")
    });
        if(wrapperEl.children[activeColor]){
            wrapperEl.children[activeColor].classList.add("active-square")
        }
    }
    bodyEl.style.backgroundColor = colors[activeColor]
    updateFormBg();
})
