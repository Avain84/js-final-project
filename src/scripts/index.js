const productAlbum = document.querySelector(".product-album");
const productFilter = document.querySelector(".product-filter");

let productsUrl =
  "https://livejs-api.hexschool.io/api/livejs/v1/customer/levia/products";

axios.get(productsUrl).then((res) => {
  let products = "";
  res.data.products.forEach((obj) => {
    products += `<li class="product-card w-[255px] relative" data-category="${obj.category}">
      <span class="badge">新品</span>
      <img
      src="${obj.images}"
      alt="product"
      class="h-[302px]"
      />
      <button class="btn" data-id="${obj.id}">加入購物車</button>
      <h3 class="text-[20px] my-2">${obj.title}</h3>
      <p class="text-[20px] line-through">NT$${obj["origin_price"]}</p>
      <p class="text-[28px]">NT$${obj.price}</p>
    </li>`;
  });
  renderAlbum(products);
});
function renderAlbum(str) {
  productAlbum.innerHTML = str;
}
productFilter.addEventListener("change", () => {
  const productCard = document.querySelectorAll(".product-card");
  console.log(productFilter.value);
  if (productFilter.value == "all") {
    productCard.forEach((el) => {
      el.classList.remove("hidden");
    });
  } else {
    productCard.forEach((el) => {
      el.classList.remove("hidden");
    });
    productCard.forEach((el) => {
      if (el.getAttribute("data-category") != productFilter.value) {
        el.classList.add("hidden");
      }
    });
  }
});
