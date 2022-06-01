const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM entreprise LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(entreprise) {
  const result = await db.query(
    `INSERT INTO entreprise
      (numEntreprise, design) 
      VALUES 
      ("${entreprise.numEntreprise}", "${entreprise.design}")`
  );

  let message = "Error in creating entreprise";

  if (result.affectedRows) {
    message = "Entreprise created successfully";
  }

  return { message };
}

async function update(id, entreprise) {
  const result = await db.query(
    `UPDATE entreprise 
      SET numEntreprise="${entreprise.numEntreprise}", design="${entreprise.design}" 
      WHERE id=${id}`
  );

  let message = "Error in updating entreprise";

  if (result.affectedRows) {
    message = "entreprise updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM entreprise WHERE id=${id}`
  );

  let message = "Error in deleting entreprise";

  if (result.affectedRows) {
    message = "entreprise deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
};
