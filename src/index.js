fetch('http://localhost:3000/current-exhibits')
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    handleDetails(data)
    handleForm(data)
    handleTickets(data)
})

function handleComments(data){
   let comments = data[0].comments
   
    comments.forEach(comment => {
        
        p = document.createElement('p')
        p.textContent = comment
        document.querySelector("#comments-section").appendChild(p)
    
   });

   obj = {
    comments: data[0].comments
   }

   fetch('http://localhost:3000/current-exhibits/1', {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(obj)
        })
        .then((res)=>res.json())
        .then((change)=>{
            console.log(change)
        })
    }
    


function handleDetails(data){
    let description = data[0].description
    let image = data[0].image
    let title = data[0].title 

    document.querySelector('#exhibit-title').textContent = title
    document.querySelector('#exhibit-description').textContent = description
    document.querySelector('#exhibit-image').src = image

    handleComments(data)

}

function handleForm(data){
    let form = document.querySelector('#comment-form')

    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        let newComment = form.querySelector('input').value
        data[0].comments.push(newComment)
        console.log(data[0].comments)
        document.querySelector("#comments-section").innerHTML = ''

        handleComments(data)

    })
}

function handleTickets(data){
    let button = document.querySelector("#buy-tickets-button")
    let counter = data[0].tickets_bought
    document.querySelector('#tickets-bought').textContent = `${data[0].tickets_bought} Tickets Bought`

    button.addEventListener('click', ()=>{
        counter++
        data[0].tickets_bought = counter
        document.querySelector('#tickets-bought').textContent = `${data[0].tickets_bought} Tickets Bought`

        let obj = {
            tickets_bought : data[0].tickets_bought
        }

        fetch('http://localhost:3000/current-exhibits/1', {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(obj)
        })
        .then((res)=>res.json())
        .then((change)=>{
            console.log(change)
        })
    })

}