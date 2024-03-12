const productAlbum = document.querySelector(".product-album");
const productFilter = document.querySelector(".product-filter");
const cartContent = document.querySelector(".cart-content");
const totalCartPrice = document.querySelector(".total-price");

const productsUrl =
  "https://livejs-api.hexschool.io/api/livejs/v1/customer/levia/products";
const cartUrl =
  "https://livejs-api.hexschool.io/api/livejs/v1/customer/levia/carts";

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
  render(productAlbum, products);
});
axios.get(cartUrl).then((res) => {
  let cartInfo = "";
  res.data.carts.forEach((obj) => {
    cartInfo += `<tr class="border-b border-gray-border">
    <td class="py-5 pr-[30px] flex gap-[15px] items-center">
      <div class="w-16 h-16 md:w-20 md:h-20 overflow-hidden flex-shrink-0">
        <img
          src="${obj.product.images}"
          alt="Antony遮光窗簾"
          class="cart-img w-full object-cover"
        />
      </div>
      <p class="cart-title">${obj.product.title}</p>
    </td>
    <td class="cart-unitprice py-5">${obj.product.price}</td>
    <td class="cart-num py-5">${obj.quantity}</td>
    <td class="cart-total-price py-5">${obj.product.price * obj.quantity}</td>
    <td class="delete py-5 text-center" data-id="${obj.id}">X</td>
  </tr>`;
  });
  totalCartPrice.textContent = `NT$${res.data.finalTotal}`;
  render(cartContent, cartInfo);
  // console.log(cartInfo[0].product);
});

function render(area, str) {
  area.innerHTML = str;
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
