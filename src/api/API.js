import axios from 'axios';
// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function fetchAllAnimals() {
  try {
    const { data: animals } = await axios.get('/api/animals')
    return animals;
  } catch(err) {
    console.error(err)
  }
}

export async function fetchAllCategories() {
  try {
    const { data: categories } = await axios.get('/api/animal_categories')
    return categories;
  } catch(err) {
    console.error(err)
  }
}

export async function registerUser(user) {
  try {
    const response = await axios.post('/api/users/register', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(user) {
  try {
    const response = await axios.post('/api/users/login', JSON.stringify(user), 
    {
      headers: { 
        "content-type": "application/json"
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchAllSaleItems(customerToken) {
  try {
    const { data: sale_items } = await axios.get(`/api/sale_items`,
      {
        headers: {
          "Authorization": `Bearer ${customerToken}`
        }
      }
    );
    console.log(sale_items, 'sale_items');
    return sale_items;
  } catch (error) {
    console.error(error);
  }
}