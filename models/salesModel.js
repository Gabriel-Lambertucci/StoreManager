const connection = require('../db/index');

const getAll = async () => {
  const response = await connection.execute(
    `SELECT sp.sale_id AS saleId, 
    sales.date, sp.product_id AS productId,
    sp.quantity FROM sales_products AS sp INNER JOIN sales ON sales.id = sp.sale_id`,
    );
  return response;
};

const getId = async (id) => {
  const response = await connection.execute(
    `SELECT date, productId, quantity FROM
    (
    SELECT sp.sale_id AS saleId, sales.date,
    sp.product_id AS productId, sp.quantity FROM sales_products AS sp
    INNER JOIN sales
    ON sales.id = sp.sale_id
    ) AS oi
    WHERE saleId = ${id}`,
  );
  return response;
};

const postSale = async (date, productId, quantity) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (?);', [date],
    );
  const saleId = row.insertId;
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);', 
  [saleId, productId, quantity],
  );
  return saleId;
};

const putSale = async (id, productId, quantity) => {
  await connection.execute(
    'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
  [productId, quantity, id],
  );
};

module.exports = { getAll, getId, postSale, putSale };
