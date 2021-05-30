let recordings = storageLoad()

let filtersDatabase = {
  textFilter: '',
  hideFixed: false,
  hideFlex: false
} 

recordings.forEach(function(currentItem){
  document.querySelector('#record-list').appendChild(itemDOMrender(currentItem))
})


//New Record
document.querySelector('#new-record').addEventListener('submit',function(event){
    event.preventDefault()
    let id = uuidv4()
    let timestamp = moment().valueOf()
    recordings.push({
        id: id,
        category: event.target.elements.categoryElement.value,
        amount: event.target.elements.amountElement.value,
        status: event.target.elements.statusElement.checked,
        createdAt: timestamp,
        updatedAt: timestamp
    })
    event.target.elements.categoryElement.value =''
    event.target.elements.amountElement.value =''
    event.target.elements.statusElement.checked=''
  
  updateLocalStorage(recordings)
  filteringAndPrinting(recordings,filtersDatabase)
})

//Text Filter
document.querySelector('#text-filter').addEventListener('input',function(event){
  filtersDatabase.textFilter = event.target.value
  filteringAndPrinting(recordings,filtersDatabase)
})

//Fixed Filter
document.querySelector('#hide-fixed').addEventListener('change',function(event){
  filtersDatabase.hideFixed = event.target.checked
  filteringAndPrinting(recordings,filtersDatabase)
})

//Flex Filter
document.querySelector('#hide-flexible').addEventListener('change',function(event){
  filtersDatabase.hideFlex = event.target.checked
  filteringAndPrinting(recordings,filtersDatabase)
})



