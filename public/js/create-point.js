document
  .querySelector("[name=uf]")
  .addEventListener("change", getCities)

document
  .querySelector("[name=city]")
  .addEventListener("change", () => {
    const cityInput = document.querySelector("[name=descCity]")
    cityInput.value = event.target.options[event.target.selectedIndex].text
  })


function getCities(event){
  const citySelect = document.querySelector("[name=city]")
  
  const stateInput = document.querySelector("[name=descState]")
  

  const idUF = event.target.value

  stateInput.value = event.target.options[event.target.selectedIndex].text

  citySelect.innerHTML = `<option value="">Aguarde...</option>`
  citySelect.disabled = true;
  let citiesOfSelect;

  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUF}/municipios?orderBy=nome`)
  .then( res => res.json() )
  .then( cities => {

    citiesOfSelect = `<option value="">Selecione a cidade</option>`

    for(const city of cities){
      citiesOfSelect += `<option value="${city.id }">${city.nome}</option>`
    }

    citySelect.innerHTML = citiesOfSelect
    citySelect.disabled = false;
  } )
}


function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
  .then( res => res.json() ) 
  .then( states => {
    for(const state of states){
      ufSelect.innerHTML += `<option value="${state.id }">${state.nome}</option>`
    }
  })
}

populateUFs();


const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("[name=items]")
let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target

  itemLi.classList.toggle("selected") 

  const itemId = itemLi.dataset.id

  //verificar itens selecionados e adicionar/retirar na seleção


  
  const alreadySelected = selectedItems.findIndex(item => {
    return item == itemId
  })

  // se o item estiver selecionado, retirar da lista
  if(alreadySelected >= 0){
     const filteredItems = selectedItems.filter(item => {
       const itemIsDifferent = item != itemId
       return itemIsDifferent
     })

     selectedItems = filteredItems 
  }else{
    selectedItems.push(itemId)
  }


  collectedItems.value = selectedItems
}