import axios from 'axios';

const bestSellersUrl = 'https://books-backend.p.goit.global/books/top-books';
const categoriesUrl = 'https://books-backend.p.goit.global/books/category-list';

async function searchTopBooks() {
  try {
    const response = await axios.get(bestSellersUrl);
    const books = response.data;
    return books;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to find books');
  }
}

async function searchAllCategory() {
  try {
    const response = await axios.get(categoriesUrl);
    const categories = response.data;
    return categories;
  } catch (error) {
    console.log(error);
    throw new Error('There is no such category');
  }
}

async function searchCategory(selectedCategory) {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/category?category=${selectedCategory}`
    );
    const categories = response.data;

    const selectedCategoryEl = categories.map(el => {
      const currentBookEl = el;
      return {
        image: currentBookEl.book_image,
        title: currentBookEl.title,
        author: currentBookEl.author,
        id: currentBookEl._id,
        description: currentBookEl.description,
        links: currentBookEl.buy_links,
      };
    });

    return selectedCategoryEl;
  } catch (error) {
    console.log(error);
    throw new Error('There is no such category');
  }
}

async function searchById(id) {
  try {
    const response = await axios.get(
      `https://books-backend.p.goit.global/books/${id}`
    );
    const booksId = response.data;

    return booksId;
  } catch (error) {
    console.log(error);
    throw new Error('There is no such id');
  }
}
export { searchTopBooks, searchAllCategory, searchCategory, searchById };
