"use Strict"

const BASE_URL = "http://localhost:3000"

export async function loadComments() {
    const container = document.getElementById('comments-container');

    try {
        const res = await fetch(`${BASE_URL}/comments`);
        const comments = await res.json();
        container.innerHTML = comments.map(item => {
            const stars = '★'.repeat(item.rate) + '☆'.repeat(5 - item.rate);
            return `
          <div class="bg-white/10 backdrop-blur-sm px-6 py-6 md:py-8 rounded-2xl flex items-center justify-center w-full md:min-w-[280px] border border-white/10">
            <span class="text-white text-base md:text-lg mr-2">${stars} ${item.comment}</span>
          </div>
        `;
        }).join('');
    } catch (err) {
        console.error('error:', err);
    }
}

loadComments();
