/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// base setting
const apiPath = 'avain';
const token = 'QA0fGyIOUGPnOAvwT5Hl0DDRT763';
const config = {
  headers: { authorization: token },
};
const baseUrl = `https://livejs-api.hexschool.io/api/livejs/v1/admin/${apiPath}/orders`;

// DOM
const admin = document.querySelector('.admin');
const main = document.querySelector('main');
const tbody = document.querySelector('tbody');
const clearAll = document.querySelector('.self-end');

// variable
let adminData;

// function
// 取得每筆訂單的商品名稱
const getOrderProduct = (products) => {
  let productsList = '';
  products.forEach((item) => {
    productsList += `${item.title}<br>`;
  });
  return productsList;
};

// 取得每筆訂單的時間
const getTime = (timeStamp) => {
  const newDate = new Date(timeStamp * 1000);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  return `${year}/${month}/${date}`;
};

// 取得每筆訂單狀態
const getPaidState = (paid) => {
  if (paid) {
    return '已處理';
  }
  return '未處理';
};

// 取得所有訂單資料並渲染
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

// 圖表
const chartInfo = (dataArr) => {
  const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: dataArr,
      type: 'pie',
    },
    color: {
      pattern: ['#DACBFF', '#9D7FEA', '#5434A7', '#301E5F'],
    },
    padding: {
      bottom: 32,
    },
  });
};

// 圖表資料處理
const showChart = (data) => {
  // 取出每筆訂單的產品分類與數量
  const ordersProducts = data.map((item) => {
    const productsItemInfo = item.products.map((productsItem) => {
      const obj = {
        category: productsItem.category,
        quantity: productsItem.quantity,
      };
      return obj;
    });
    return productsItemInfo;
  });
  const dataObj = {};
  // 資料打平並統計同類產品數量
  ordersProducts.flat().forEach((item) => {
    if (dataObj[item.category] === undefined) {
      dataObj[item.category] = item.quantity;
    } else {
      dataObj[item.category] += item.quantity;
    }
  });
  // 將物件轉成陣列並傳給圖表
  chartInfo(Object.entries(dataObj));
};

const init = (data) => {
  main.classList.remove('hidden');
  getOrders(data);
  showChart(data);
};

// get orders API
admin.addEventListener('click', (e) => {
  e.preventDefault();
  axios
    .get(baseUrl, config)
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
    axios.put(baseUrl, postData, config)
      .then((response) => {
        adminData = response.data.orders;
        init(adminData);
      })
      .catch((error) => {
        alert(`錯誤：${error.response.status}`);
      });
  } else if (e.target.nodeName === 'BUTTON') {
    // click delete button for one order
    axios.delete(`${baseUrl}/${orderItem.id}`, config)
      .then((response) => {
        adminData = response.data.orders;
        init(adminData);
      })
      .catch((error) => {
        alert(`錯誤：${error.response.status}`);
      });
  }
});

// delete all orders
clearAll.addEventListener('click', () => {
  axios.delete(baseUrl, config)
    .then((response) => {
      adminData = response.data.orders;
      init(adminData);
    })
    .catch((error) => {
      alert(`錯誤：${error.response.status}`);
    });
});
