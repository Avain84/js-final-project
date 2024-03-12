const chart = c3.generate({
  bindto: '#chart',
  data: {
    columns: [
      ['Louvre 雙人床架', 10],
      ['Antony 單人床架', 20],
      ['Antony 雙人床架', 30],
      ['其他', 40],
    ],
    type: 'pie',
  },
  color: {
    pattern: ['#DACBFF', '#9D7FEA', '#5434A7', '#301E5F'],
  },
  padding: {
    bottom: 32,
  },
});

// base setting
const baseUrl = 'https://livejs-api.hexschool.io';
const apiPath = 'avain';
const token = 'QA0fGyIOUGPnOAvwT5Hl0DDRT763';
const config = {
  headers: { authorization: token },
};
const getOrderUrl = `${baseUrl}/api/livejs/v1/admin/${apiPath}/orders`;
const changePaidUrl = `${baseUrl}/api/livejs/v1/admin/${apiPath}/orders`;

// DOM
const admin = document.querySelector('.admin');
const main = document.querySelector('main');
const tbody = document.querySelector('tbody');

// variable
let adminData;

// function
const getOrderProduct = (products) => {
  let productsList = '';
  products.forEach((item) => {
    productsList += `${item.title}<br>`;
  });
  return productsList;
};

const getTime = (timeStamp) => {
  const newDate = new Date(timeStamp * 1000);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${year}/${month}/${date}`;
};

const getPaidState = (paid) => {
  if (paid) {
    return '已處理';
  }
  return '未處理';
};

const getOrders = (data) => {
  let listStr = '';
  data.forEach((item) => {
    listStr += `<tr id="${item.id}">
    <td class="back-table-style">${item.createdAt}</td>
    <td class="back-table-style">${item.user.name}<br />${item.user.tel}</td>
    <td class="back-table-style">
      ${item.user.address}
    </td>
    <td class="back-table-style">
      ${item.user.email}
    </td>
    <td class="back-table-style">${getOrderProduct(item.products)}</td>
    <td class="back-table-style"><time>${getTime(item.createdAt)}</time></td>
    <td class="back-table-style"><a href="#" class="underline text-blue-state">${getPaidState(item.paid)}</a></td>
    <td class="back-table-style px-0 text-center">
      <button
        type="button"
        class="text-white bg-red-delete px-3 py-2"
      >
        刪除
      </button>
    </td>
  </tr>`;
  });
  tbody.innerHTML = listStr;
};

const init = (data) => {
  main.classList.remove('hidden');
  getOrders(data);
};

// get orders API
admin.addEventListener('click', (e) => {
  e.preventDefault();
  axios
    .get(getOrderUrl, config)
    .then((response) => {
      adminData = response.data.orders;
      init(adminData);
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
});

tbody.addEventListener('click', (e) => {
  e.preventDefault();
  const orderItem = e.target.closest('tr');
  // change paid state API
  if (e.target.nodeName === 'A') {
    const clickItem = adminData.filter((item) => orderItem.id === item.id);
    const postData = {
      data: {
        id: orderItem.id,
        paid: !clickItem[0].paid,
      },
    };
    axios.put(changePaidUrl, postData, config)
      .then((response) => {
        adminData = response.data.orders;
        init(adminData);
      })
      .catch((error) => {
        alert(`錯誤：${error.response.status}`);
      });
  }
});
