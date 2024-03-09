const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // display a show all button 
    const showAll = document.getElementById('show-all');
    if (phones.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden');
    }
    else {
        showAll.classList.add('hidden');
    }
    // console.log('is show all',isShowAll);
    // display first 12 phones  if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    // clear phone container 
    phoneContainer.textContent = ` `;


    phones.forEach(phone => {
        console.log(phone);
        //1. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card  bg-gray-100 shadow-xl p-4`;
        phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>There are many variations of passages of available, but the majority have suffered</p>
                      <div class="card-actions justify-center">
                        <button onclick="handleShodDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
    `;
        // append child 
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner 
    toggolLoadingSpeaner(false);
}
// handle search button

const handleSearch = (isShowAll) => {
    toggolLoadingSpeaner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggolLoadingSpeaner = (isLoading) => {
    const loadingSpeaner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpeaner.classList.remove('hidden');
    }
    else {
        loadingSpeaner.classList.add('hidden');
    }
}

// handle show all 
const handleShowAll = () => {
    handleSearch(true);
}


const handleShodDetails = async (id) => {
    // console.log(id);
    // load data single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhonwDetails(phone);
}

const showPhonwDetails = (phone) => {
    // show th emodal
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name
    const showDetailContainer= document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <img class="p-2" src="${phone.image}"/>
    <p><span class="text-lg font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize} </p>
    <p><span class="text-lg font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet} </p>
    <p><span class="text-lg font-bold">Memory: </span>${phone?.mainFeatures?.memory} </p>
    <p><span class="text-lg font-bold">Slug: </span>${phone?.slug} </p>
    <p><span class="text-lg font-bold">Release Date: </span>${phone?.releaseDate} </p>
    <p><span class="text-lg font-bold">brand: </span>${phone?.brand} </p>
    <p><span class="text-lg font-bold">GPS: </span>${phone?.others?.GPS || 'no Data'} </p>
    `
    show_details_modal.showModal()

}
// loadPhone();
