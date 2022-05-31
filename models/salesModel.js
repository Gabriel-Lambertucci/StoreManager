const connection = require('../db/index');

const getAll = async () => {
  const response = await connection.execute(
    `SELECT sp.sale_id AS saleId, 
    sales.date, sp.product_id AS productId, sp.quantity FROM sales_products AS sp INNER JOIN sales ON sales.id = sp.sale_id`);
  return response;
}
  const getId = async (id) => {
  const response = await connection.execute(`SELECT date, productId, quantity FROM
	(SELECT sp.sale_id AS saleId, sales.date, sp.product_id AS productId, sp.quantity FROM sales_products AS sp
	INNER JOIN sales
	ON sales.id = sp.sale_id) AS oi
  WHERE saleId = ${id}`);
  return response;
}

module.exports = { getAll, getId };