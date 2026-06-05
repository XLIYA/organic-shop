const container = document.getElementById("bestsellerOnFristPage");



 export async function getBestsellerProducts() {

  const response = await fetch("http://localhost:3000/products");
  const data = await response.json();


  data.forEach(product => {

    if (product.is_best_sellers){
            const card = `
                    <div class="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
                    <img src="${product.image[Math.floor(Math.random() * 3) + 1]}" alt="product 1" class="w-full aspect-square object-cover">
                    <div class="px-3 py-3 flex flex-col gap-1">
                        <p class="text-[10px] text-gray-500 font-medium">${product.category}</p>
                        <h3 class="text-sm font-bold text-gray-800">${product.name}</h3>
                        <p class="text-[#3F7D20] font-bold text-sm">$ ${product.price}</p>
                    </div>
                </div>
    `;

    container.innerHTML += card;
    }



  });

}

getBestsellerProducts()
