let locked = false;

async function submitOrder(send) {
  await send();
  return true;
}

module.exports = { submitOrder };
