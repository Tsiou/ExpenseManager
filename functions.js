
//Loads saved array data during browser initiation
let storageLoad = function(){
    let localData = localStorage.getItem('records')
    if(localData !== null){
        return JSON.parse(localData)
    }
    else{
        return[]
    }
}


//Updates Local Storage with current array status
let updateLocalStorage = function(array){
    localStorage.setItem('records',JSON.stringify(array))
}




//filters array and prints results to browser
let filteringAndPrinting = function (array, filters){
    let filteredArray = array.filter(function(currentRecord){
        if (filters.hideFixed && !filters.hideFlex){
          return currentRecord.category.toLowerCase().includes(filters.textFilter.toLowerCase()) && !currentRecord.status
        }
        else if(!filters.hideFixed && filters.hideFlex){
          return currentRecord.category.toLowerCase().includes(filters.textFilter.toLowerCase()) && currentRecord.status    
        }
        else if(filters.hideFixed && filters.hideFixed){
          return false
        }
        else{
          return currentRecord.category.toLowerCase().includes(filters.textFilter.toLowerCase())
        }
    })
    document.querySelector('#record-list').innerHTML=''

    filteredArray.forEach(function(item){
        document.querySelector('#record-list').appendChild(itemDOMrender(item))
    })
    document.querySelector('#fix-flex-ratio').innerHTML=''
    document.querySelector('#total-expenses').innerHTML=''
    
    document.querySelector('#total-expenses').textContent = totalExpenses(array)
    document.querySelector('#fix-flex-ratio').textContent = ratioCalc(array)
    

}



//renders the array context so that it can later be appeared the way we want it to the browser
let itemDOMrender = function(anItem){
let itemDiv = document.createElement('div')
let categorySpan = document.createElement('span')
let amountSpan = document.createElement('span')
let deleteButton = document.createElement('button')
let editButton = document.createElement('button')

categorySpan.textContent = anItem.category
amountSpan.textContent = anItem.amount
deleteButton.textContent = 'Delete'
editButton.textContent = 'Edit'

deleteButton.addEventListener('click',function(event){
   removeLinkedItem(anItem.id)
   updateLocalStorage(recordings)
   filteringAndPrinting(recordings,filtersDatabase)
   })

editButton.addEventListener('click',function(event){
    location.assign(`edit.html#${anItem.id}`)
})

   itemDiv.appendChild(deleteButton)
   itemDiv.appendChild(categorySpan)
   itemDiv.appendChild(amountSpan)
   itemDiv.appendChild(editButton)

   return itemDiv

 }


let removeLinkedItem = function (itemID){
    let itemPosition = recordings.findIndex(function(currentItem){
        return currentItem.id === itemID
    })
    if (itemPosition != -1){
        recordings.splice(itemPosition, 1)
    }
}

//Total Expenses Calculator
let totalExpenses = function (array){
    let total = 0
    array.forEach(function(item){
       total = total + item.amount
    })
  return ` Total Expenses: ${total} |`
}

//Fixed - Flexible Expenses Calculator
let ratioCalc = function (array){
    let fix = 0
    let flex = 0
    array.forEach(function(item){
       if (item.status){
           fix = fix + item.amount
       }
       else if(!item.status){
           flex = flex + item.amount
       }
    })
  return ` Fixed / Flexible Ratio: ${fix} / ${flex} `
}










/*let itemDOMrendering = function (individualTodo){
  
    //Declaring all 4 new elements that represent an item
   let newDiv = document.createElement('div')
   let newCheckbox = document.createElement('input')
       newCheckbox.setAttribute('type','checkbox')
   let newAnchor = document.createElement('a')
       newAnchor.setAttribute(`href`,`edit.html#${individualTodo.id}`)
   let newButton = document.createElement('button')
     
    //Setting up the appropriate text values for button and span
     newButton.textContent = 'x'
     newAnchor.textContent = individualTodo.title
     
     //linking and establishing button to appropriate working feautures
     newButton.addEventListener('click',function(e){
          //Το όρισμα εδω δεν συμβολιζει την οποια τιμη εχει, ειναι ΦΙΞ σταθερη
          removeLinkedItem(individualTodo.id)
          //Γιατι μολις τελειωσει η itemDOMrendering το individualTodo γινεται UNDEFINED 
          updateLocalStorage(todo)
          filterAndPrint(todo,filterDatabase)

     })
     
     newCheckbox.checked = individualTodo.status
     newCheckbox.addEventListener('change',function(event){
         individualTodo.status = event.target.checked
         updateLocalStorage(todo)
         filterAndPrint(todo,filterDatabase)
     })
        
        newDiv.appendChild(newButton) 
        newDiv.appendChild(newAnchor)
        newDiv.appendChild(newCheckbox)
 
     return newDiv*/