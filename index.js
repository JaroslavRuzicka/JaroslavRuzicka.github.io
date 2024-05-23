//Sorting algorithms to implement:
//Buble sort: DONE
//Insertion sort
//Selection sort
//Merge sort
//Quick Sort
//Heap sort
//Radix sort
//Shell sort -- maybe

/*******************Global Variables **************************/
let elementsOrdering = []


/*******************DOM Selectors *****************************/
// let elements = document.getElementById("algoBox").childNodes
let elements = document.getElementById("algoBox").children
let parentElement = document.getElementById("algoBox")

/*******************Functions  *******************************/


//shuffle while soritng breaks algo


function populateSortingBox(){
    let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)
    let numberOfChildren
    deleteAllElements()
    
    //sanitizing input
    if(Number.isInteger(tempNumber) && tempNumber > 0 && tempNumber < 100){
        numberOfChildren =  tempNumber
    } else{
        document.querySelector("#numberOfElementsInput").value = 20
        numberOfChildren = 20
    }   

    let spacing = 100 / numberOfChildren

    for(let i = 0; i < numberOfChildren; i++){
        let div = document.createElement("div")
        div.className = "collumn" + (i + 1)
        
        let heightOfElement = 60 / numberOfChildren * (i + 1);
        
        div.style.height = `${heightOfElement}vh`
        div.style.left = `${i * spacing}%`
        div.style.width = `${spacing}%`

        let header = document.getElementById("algoBox")
        header.appendChild(div)

        let tempElement = {
            element: elements[i],
            height: elements[i].style.height
        }
        elementsOrdering[i] = tempElement
    }
}

function deleteAllElements(){
    let tempElemets = document.getElementById("algoBox").children
    for(let i = tempElemets.length - 1; i >= 0; i--){
        tempElemets[i].remove()
    }
}

function shuffledArray(numOfElements) {
    let positionOfElements = []
    for(let i = 0; i < numOfElements; i++){
        positionOfElements.push((i))
    }
    let currentIndex = positionOfElements.length;

    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [positionOfElements[currentIndex], positionOfElements[randomIndex]] = [
        positionOfElements[randomIndex], positionOfElements[currentIndex]];
    }
    return positionOfElements
}

function shuffleElements(){
    let numberOfChildren = elements.length
    let spacing = 100 / numberOfChildren
    let shuffledArrayList = shuffledArray(numberOfChildren)

    //console.log(shuffledArrayList);
    for(let i = 0; i < numberOfChildren; i++){
        elements[i].style.left = `${shuffledArrayList[i] * spacing}%`

        let tempElement = {
            element: elements[i],
            height: elements[i].style.height
        }
        elementsOrdering[shuffledArrayList[i]] = tempElement
    }
    //console.log(elementsOrdering);
}

function selectionSort(startingIndex){
    // shuffleBtn.disabled = true
    // generateElementsBtn.disabled = true

    i = startingIndex
    let smallestElement = elementsOrdering[i]
    let smallestElementPosition = i

    function loop(i){
        let temp2 = elementsOrdering[i]
        
        smallestElement.element.style.backgroundColor = "lime"
        temp2.element.style.backgroundColor = "lime"

        setTimeout(function(){
            
            let height1 = Number(smallestElement.height.slice(0, -2))
            let height2 = Number(temp2.height.slice(0, -2))

            
            temp2.element.style.backgroundColor = "red"
            
            if(height1 > height2){
                smallestElement.element.style.backgroundColor = "red"
                smallestElement = temp2
                smallestElementPosition = i
                smallestElement.element.style.backgroundColor = "lime"
            }

            if(i < elementsOrdering.length - 1){
                loop(i + 1)
            }else{
                let left1 = smallestElement.element.style.left
                let left2 = elementsOrdering[startingIndex].element.style.left
                
                smallestElement.element.style.left = left2
                elementsOrdering[startingIndex].element.style.left = left1

                elementsOrdering[smallestElementPosition] = elementsOrdering[startingIndex]
                elementsOrdering[startingIndex] = smallestElement
                setTimeout(function(){
                    smallestElement.element.style.backgroundColor = "red"

                },150)
               if(startingIndex < elementsOrdering.length - 2){
                   selectionSort(startingIndex + 1)
               }else{
                    setTimeout(function(){
                        smallestElement.element.style.backgroundColor = "red"
                        temp2.element.style.backgroundColor = "red"
                    },150)
               }
            }
        },10)
    }
    loop(i + 1)

}

function bubleSort(lengthOfLoop){

    shuffleBtn.disabled = true
    generateElementsBtn.disabled = true
    
    let lengthOfLoopTemp = lengthOfLoop
    let numOfSorts = 0

    let i = 0
    function loop(){
        let temp1 = elementsOrdering[i]
        let temp2 = elementsOrdering[i + 1]
        
        temp1.element.style.backgroundColor = "lime"
        temp2.element.style.backgroundColor = "lime"

        setTimeout( function() {

            let height1 = Number(temp1.height.slice(0, -2))
            let height2 = Number(temp2.height.slice(0, -2))

            temp1.element.style.backgroundColor = "red"
            temp2.element.style.backgroundColor = "red"
            if(height1 > height2){
                let left1 = temp1.element.style.left
                let left2 = temp2.element.style.left
                
                elementsOrdering[i].element.style.left = left2
                elementsOrdering[i + 1].element.style.left = left1

                elementsOrdering[i] = temp2
                elementsOrdering[i + 1] = temp1
                //console.log(elementsOrdering);

                numOfSorts++
            }
            i++
            if(i < lengthOfLoopTemp - 1){
                loop()
            }else{
                if(numOfSorts === 0){
                    generateElementsBtn.disabled = false
                    shuffleBtn.disabled = false
                    return
                }else{
                    if(lengthOfLoopTemp > 1){
                        i = 0
                        bubleSort(lengthOfLoopTemp - 1)
                    }
                }
            }
            
        }, 10)
    }
    loop()    //console.log(elementsOrdering);
}

function callSortingAlgorithm(){
    let selection = document.querySelector("#sortingAlgorithmsSelection").value
    switch (selection){
        case "bubbleSort":
            let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)    
            bubleSort(tempNumber)
            break
        case "selectionSort":
            selectionSort(0)
            break
        default:
            break
    }
}

//*******************Funciton Calls *******************************/
populateSortingBox()


/**********************Event Listeners ***************************/
let tempNumber = Number(document.querySelector("#numberOfElementsInput").value)    

let btn = document.querySelector("#sortBtn")
// btn.addEventListener("click", function(){bubleSort(elementsOrdering.length)})
// btn.addEventListener("click", function(){bubleSort(tempNumber)})
btn.addEventListener("click", callSortingAlgorithm)

let shuffleBtn = document.querySelector("#shuffleBtn")
shuffleBtn.addEventListener("click", shuffleElements)

let generateElementsBtn = document.querySelector("#changeNumberOfElementsBtn")
generateElementsBtn.addEventListener("click", populateSortingBox)

