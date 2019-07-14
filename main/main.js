'use strict';

const allItems = loadAllItems();

function printReceipt(inputs) {
  let items = generateItemDetails(inputs);
  let receipt = generateReceiptTemplate(generateReciptBody(items), getTotalCost(items))
  console.log(receipt);
}

function generateItemDetails(inputs) {
  return inputs.reduce((result, itemBarcode) => {
    let item = result.filter(itemDetail => itemDetail.itemInfo.barcode == itemBarcode);
    if(item.length !== 0) {
      item[0].count++;
      item[0].total += item[0].itemInfo.price;
    } else {
      let itemOriginInfo = findItemDetailByBarcode(itemBarcode);
      result.push({itemInfo: findItemDetailByBarcode(itemBarcode), count: 1, total:itemOriginInfo.price})
    }
    return result;
  }, []);
}

function findItemDetailByBarcode(barcode) {
  let item = allItems.filter(item => item.barcode === barcode)[0];
  return item;
}

function generateReceiptTemplate(itemDetails, totalCost) {
  return `***<没钱赚商店>收据***
${itemDetails}
----------------------
总计：${formatPrice(totalCost)}(元)
**********************`
}

function getTotalCost(items) {
  return items.reduce((totalCost, item) => totalCost + item.total, 0)
}

function gernerateItemDescription(itemDetail) {
  return `名称：${itemDetail.itemInfo.name}，数量：${itemDetail.count}${itemDetail.itemInfo.unit}，单价：${formatPrice(itemDetail.itemInfo.price)}(元)，小计：${formatPrice(itemDetail.total)}(元)`;
}

function generateReciptBody(items) {
  return items.map(item => gernerateItemDescription(item)).join("\n");
}

function formatPrice(price) {
  return price.toFixed(2);
}