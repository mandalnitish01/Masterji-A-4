// Global variables
let books = [];
let currentQuery = "javascript programming";
let currentStartIndex = 0;
let isLoading = false;
let currentView = "grid";
let currentSort = "relevance";
const ITEMS_PER_PAGE = 30;

// DOM Elements
const booksContainer = document.getElementById("books-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const gridViewBtn = document.getElementById("grid-view");
const listViewBtn = document.getElementById("list-view");
const sortSelect = document.getElementById("sort-select");
const loadingElement = document.getElementById("loading");
const noResultsElement = document.getElementById("no-results");

// Initialize the application
function init() {
  // Set up event listeners
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });

  gridViewBtn.addEventListener("click", () => switchView("grid"));
  listViewBtn.addEventListener("click", () => switchView("list"));

  sortSelect.addEventListener("change", handleSort);

  // Infinite scroll
  window.addEventListener("scroll", handleScroll);

  // Initial search
  fetchBooks(currentQuery, currentStartIndex);
}

// Fetch books from the API
async function fetchBooks(query, startIndex) {
  if (isLoading) return;

  isLoading = true;
  loadingElement.classList.remove("hidden");

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&startIndex=${startIndex}&maxResults=${ITEMS_PER_PAGE}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      if (startIndex === 0) {
        books = [];
        booksContainer.innerHTML = "";
        noResultsElement.classList.add("hidden");
      }

      books = [...books, ...data.items];
      sortBooks();
      renderBooks();
    } else {
      if (startIndex === 0) {
        books = [];
        booksContainer.innerHTML = "";
        noResultsElement.classList.remove("hidden");
      } else {
        // If no more results while scrolling, don't clear existing books
        loadingElement.classList.add("hidden");
      }
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  } finally {
    isLoading = false;
    loadingElement.classList.add("hidden");
  }
}

// Render books to the DOM
function renderBooks() {
  if (books.length === 0) return;

  books.forEach((book, index) => {
    // Skip books that are already rendered
    if (document.getElementById(`book-${index}`)) return;

    const volumeInfo = book.volumeInfo;
    const thumbnail =
      volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/128x192?text=No+Cover";
    const title = volumeInfo.title || "Unknown Title";
    const authors = volumeInfo.authors
      ? volumeInfo.authors.join(", ")
      : "Unknown Author";
    const publisher = volumeInfo.publisher || "Unknown Publisher";
    const publishedDate = volumeInfo.publishedDate || "Unknown Date";
    const infoLink = volumeInfo.infoLink || "#";

    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.id = `book-${index}`;
    bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div class="book-info">
                <div class="book-title">${title}</div>
                <div class="book-author">By: ${authors}</div>
                <div class="book-publisher">Publisher: ${publisher}</div>
                <div class="book-date">Published: ${publishedDate}</div>
            </div>
        `;

    // Add click event to open book details in a new tab
    bookCard.addEventListener("click", () => {
      window.open(infoLink, "_blank");
    });

    booksContainer.appendChild(bookCard);
  });
}

// Handle search
function handleSearch() {
  const query = searchInput.value.trim();
  if (query === "") return;

  currentQuery = query;
  currentStartIndex = 0;
  fetchBooks(currentQuery, currentStartIndex);
}

// Switch between grid and list view
function switchView(view) {
  currentView = view;

  if (view === "grid") {
    booksContainer.className = "grid-view";
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  } else {
    booksContainer.className = "list-view";
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  }
}

// Handle sorting
function handleSort() {
  currentSort = sortSelect.value;
  sortBooks();

  // Re-render all books
  booksContainer.innerHTML = "";
  renderBooks();
}

// Sort books based on selected option
function sortBooks() {
  switch (currentSort) {
    case "title":
      books.sort((a, b) => {
        const titleA = a.volumeInfo.title || "";
        const titleB = b.volumeInfo.title || "";
        return titleA.localeCompare(titleB);
      });
      break;
    case "title-desc":
      books.sort((a, b) => {
        const titleA = a.volumeInfo.title || "";
        const titleB = b.volumeInfo.title || "";
        return titleB.localeCompare(titleA);
      });
      break;
    case "newest":
      books.sort((a, b) => {
        const dateA = a.volumeInfo.publishedDate || "0000";
        const dateB = b.volumeInfo.publishedDate || "0000";
        return dateB.localeCompare(dateA);
      });
      break;
    case "oldest":
      books.sort((a, b) => {
        const dateA = a.volumeInfo.publishedDate || "9999";
        const dateB = b.volumeInfo.publishedDate || "9999";
        return dateA.localeCompare(dateB);
      });
      break;
    // For relevance, we keep the original order from the API
  }
}
// Handle infinite scroll
function handleScroll() {
  if (isLoading) return;

  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    currentStartIndex += ITEMS_PER_PAGE;
    fetchBooks(currentQuery, currentStartIndex);
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
