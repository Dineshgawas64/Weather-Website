console.log("Hello")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.getElementById('message-1')
const messagetwo = document.getElementById('message-2')

// messageone.textContent = 'From Javascript'

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location= search.value

    messageone.textContent= 'Loading .....'
    messagetwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }
        else{
            messageone.textContent = data.forecast
            messagetwo.textContent = data.location
        }
    })
})

    
})