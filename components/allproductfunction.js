const btncontainer = document.getElementById("btn-container");
const selectcontainer = document.getElementById("select-container");
const cartContianer = document.getElementById("product-container");
const undertwonty_filter_btn = document.getElementById('undertwonty')
const popular_filter_btn = document.getElementById('Popular')





let allProducts = [];


async function fetchData() {
  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();

  allProducts = data;
}


function renderbtn() {
  const categories = allProducts.map(item => item.category);

  const uniqueCategories = [...new Set(categories)];

  btncontainer.innerHTML += "";


  const allBtn = `
    <button 
      data-category="all"
      class="btnfilter rounded-2xl bg-[#F3EFF5] border-gray-300 px-3 py-1">
      All
    </button>
  `;

  btncontainer.innerHTML += allBtn;

  uniqueCategories.forEach(category => {
    const btn = `
      <button 
        data-category="${category}"
        class="btnfilter rounded-2xl bg-[#F3EFF5] border-gray-300 px-3 py-1">
        ${category}
      </button>
    `;

    btncontainer.innerHTML += btn;
  });
}


function renderoption() {
  const brands = allProducts.map(item => item.brand);

  const uniqueBrands = [...new Set(brands)];

  selectcontainer.innerHTML = `
    <option value="all">All Brands</option>
  `;

  uniqueBrands.forEach(brand => {
    const opt = `
      <option value="${brand}">${brand}</option>
    `;

    selectcontainer.innerHTML += opt;
  });
}


function renderAllcart(data) {
  cartContianer.innerHTML = "";

  const dataarr = data.slice(0, 8);

  dataarr.forEach(item => {
    const cartItem = `
      <div class="bg-[#F3EFF5] rounded-2xl overflow-hidden">
        <img
          class="w-full h-auto block mb-2"
          src="${item.image[0]}"
          alt="${item.name}"
        />
        <p class="ml-2 font-sans text-lg font-bold p-2">
          ${item.name}
        </p>
      </div>
    `;

    cartContianer.innerHTML += cartItem;
  });
}


// btncontainer.addEventListener("click", function (event) {
//   if (event.target.classList.contains("btnfilter")) {
//     const selectedCategory = event.target.dataset.category;

//     if (selectedCategory === "all") {
//       renderAllcart(allProducts);
//     } else {
//       const filteredProducts = allProducts.filter(item => {
//         return item.category === selectedCategory;
//       });

//       renderAllcart(filteredProducts);
//     }
//   }
// });

undertwonty_filter_btn.addEventListener("click" , function(){
    console.log("jhfd")
})

popular_filter_btn.addEventListener("click", function (event) {
    // const filteredPopular = allProducts.filter(item => item.is_popular)
    console.log( 'filteredPopular')
    // renderAllcart(filteredPopular)
})

selectcontainer.addEventListener("change", function (event) {
  const selectedBrand = event.target.value;

  if (selectedBrand === "all") {
    renderAllcart(allProducts);
  } else {
    const filteredProducts = allProducts.filter(item => {
      return item.brand === selectedBrand;
    });

    renderAllcart(filteredProducts);
  }
});


async function init() {
  await fetchData();

  renderbtn();
  renderoption();
  renderAllcart(allProducts);
}

init();
