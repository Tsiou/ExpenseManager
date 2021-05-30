let itemID = location.hash.substring(1)
let recordings = storageLoad()
let linkedItem = recordings.find(function(item){
    return item.id === itemID
})

console.log(linkedItem)

if (linkedItem === undefined){
    location.assign('/index.html')
}

categoryElement = document.querySelector('#category')
amountElement = document.querySelector('#amount')
statusElement = document.querySelector('#status')
dateElement = document.querySelector('#date')
returnElement = document.querySelector('#return')
deleteElement = document.querySelector('#delete')

categoryElement.value = linkedItem.category 
amountElement.value = linkedItem.amount 
statusElement.checked = linkedItem.status

categoryElement.addEventListener('input',function(event){
    linkedItem.category = event.target.value
    updateLocalStorage(recordings)
})

amountElement.addEventListener('input',function(event){
    linkedItem.amount = event.target.value
    updateLocalStorage(recordings)
})

statusElement.addEventListener('change',function(event){
    linkedItem.status = event.target.checked
    updateLocalStorage(recordings)
})

returnElement.addEventListener('click',function(event){
    location.assign('/index.html')
})

deleteElement.addEventListener('click',function(event){
    let indexToDelete = recordings.findIndex(function(item){
        return item.id === itemID
    })
    recordings.splice(indexToDelete, 1)
    updateLocalStorage(recordings)
    location.assign('/index.html')
})

