const client = require('../client');

async function createAnimal({ categoryId, breed_name, image_url, description, inventory_count, price, gender }) {
  try {
    const { rows: [ animal ]} = await client.query(`
        INSERT INTO animals ("categoryId", breed_name, image_url, description, inventory_count, price, gender)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
        `, [categoryId, breed_name, image_url, description, inventory_count, price, gender]
    );
    return animal;
  } catch (error) {
    console.log(error);
  }
}

async function getAllAnimals() {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM animals;
    `);
    return rows;
  } catch (error) {
    console.log("Error getting categories!")
  }
}

async function getAnimalById(id) {
  try{
    const { rows: [ animal ] } = await client.query(`
      SELECT * 
      FROM animals
      WHERE id =${id};
    `);

    return animal;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

async function getAnimalByGender(id, gender) {
  try{
    const { rows: [ animal ] } = await client.query(`
      SELECT * 
      FROM animals
      WHERE id =${id} AND gender =${gender};
    `);

    return animal;
  } catch (error) {
    console.log("Error getting categories by id!")
  }
}

async function attachAnimalsToSalesItem(sale_item){
  const returnAnimals = await getAllAnimals();
  const animalCopy = [...returnAnimals]
  console.log(returnAnimals, 'animal');
  console.log(sale_item,'sale_item');

  const sale_ItemsIds = sale_item.map(item => item.id);
  const insertValues = sale_item.map((_,index) => `$${index + 1}`).join (', ');

  try {
  const { rows: animals } = await client.query(` 
    SELECT animals.* , sale_items.*
    FROM animals
    JOIN sale_items ON sale_items."animalId" = animals.id
    WHERE sale_items."animalId" IN (${insertValues})
  ;`, sale_ItemsIds);

  for (let i = 0 ; i < animalCopy.length; i++){
    const addAnimalsInfo = animalCopy.filter (animal => animal.id === animalCopy[i].id);
    animalCopy[i].animals = addAnimalsInfo;
  } 
  return animals;
}catch (error){
  console.log(error)
}
}

async function updateAnimal({ id, ...fields }) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
      const { rows: [ animal ] } = await client.query(`
        UPDATE animals
        SET ${ setString }
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));

  return animal;
  } catch (error) {
    console.log("Error updating the animal!")
  }
}

async function deleteAnimal(id) {
  const { rows: [animal] } = await client.query(`
  DELETE FROM animals
  WHERE id = $1
  RETURNING *;
  `, [id]);

  return animal;
}

module.exports = {
  createAnimal,
  getAllAnimals,
  getAnimalById,
  getAnimalByGender,
  attachAnimalsToSalesItem,
  updateAnimal,
  deleteAnimal
}