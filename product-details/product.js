const BASE_URL = "http://localhost:3000";

// DOM Elements
const loadingBox = document.getElementById("loading-box");
const productSection = document.getElementById("product-section");
const reviewsSection = document.getElementById("reviews-section");

const mainProductImage = document.getElementById("main-product-image");
const productThumbnails = document.getElementById("product-thumbnails");
const productCategory = document.getElementById("product-category");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productDetails = document.getElementById("product-details");
const reviewsContainer = document.getElementById("reviews-container");

// Utils
const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
};

const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
};

const createStars = (rate = 5) => {
    const validRate = Math.round(Math.max(0, Math.min(5, Number(rate) || 0)));
    return "★".repeat(validRate) + "☆".repeat(5 - validRate);
};

// Renderers
const renderProductImages = (images = []) => {
    productThumbnails.innerHTML = "";

    if (!Array.isArray(images) || images.length === 0) {
        mainProductImage.src = "https://placehold.co/800x500?text=No+Image";
        return;
    }

    mainProductImage.src = images[0];

    productThumbnails.innerHTML = images
        .map((image, index) => {
            const activeClass = index === 0 ? "border-green-500" : "border-transparent";
            return `
                <img
                    src="${escapeHtml(image)}"
                    alt="product thumbnail"
                    class="thumbnail-image h-20 w-full cursor-pointer rounded-xl border-2 object-cover ${activeClass} hover:opacity-75"
                />
            `;
        })
        .join("");

    const thumbnails = document.querySelectorAll(".thumbnail-image");

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            mainProductImage.src = thumbnail.src;

            thumbnails.forEach((item) => {
                item.classList.replace("border-green-500", "border-transparent");
            });

            thumbnail.classList.replace("border-transparent", "border-green-500");
        });
    });
};

const renderProduct = (product) => {
    productCategory.textContent = product.category || "Organic Collection";
    productName.textContent = product.name || "Product Name";
    productPrice.textContent = product.price ? `$${product.price}` : "$0";
    productDescription.textContent = product.description || "";
    productDetails.textContent = product.product_details || "";

    renderProductImages(product.image || []);
};

const renderReviews = (comments = []) => {
    if (!Array.isArray(comments) || comments.length === 0) {
        reviewsContainer.innerHTML = `
            <div class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p class="text-gray-500">No reviews yet.</p>
            </div>
        `;
        return;
    }

    reviewsContainer.innerHTML = comments
        .map((item) => {
            const rate = item.rate ?? item.rating ?? 5;
            const comment = escapeHtml(item.comment || item.text || item.message || "");

            return `
                <div class="mb-5 rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
                    <p class="flex items-center gap-4 text-lg text-gray-800">
                        <span class="font-bold tracking-widest text-black">${createStars(rate)}</span>
                        <span>${comment}</span>
                    </p>
                </div>
            `;
        })
        .join("");
};

// API
const getProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error("Product not found");
    return response.json();
};

const getProductComments = async (productId) => {
    const response = await fetch(`${BASE_URL}/products_comments/`);
    if (!response.ok) throw new Error("Comments not found");
    const comments = await response.json();
    return comments.filter(comment => comment.productId === productId);
};

// UI State
const showPage = () => {
    loadingBox.classList.add("hidden");
    productSection.classList.remove("hidden");
    reviewsSection.classList.remove("hidden");
};

const showError = () => {
    loadingBox.innerHTML = `
        <div class="py-20 text-center">
            <h1 class="mb-4 text-3xl font-bold text-red-600">Product not found</h1>
            <p class="text-gray-500">There was a problem loading this product.</p>
        </div>
    `;
};

// Init
const loadProductDetails = async () => {
    try {
        const productId = getProductIdFromUrl();

        const [product, comments] = await Promise.all([
            getProduct(productId),
            getProductComments(productId),
        ]);

        renderProduct(product);
        renderReviews(comments);
        showPage();
    } catch (error) {
        console.error(error);
        showError();
    }
};

loadProductDetails();
