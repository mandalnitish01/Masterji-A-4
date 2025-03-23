# Book Library Website Project
- I've implemented a Book Library website that fetches and displays book data dynamically from the Google Books API. The project is complete and ready to use. Here's a detailed overview of the implementation:

## Project Structure
The project consists of three main files:
- index.html - The HTML structure of the website
- styles.css - The styling for the website
- script.js - The JavaScript functionality

## Features Implemented
1. Book Display
Books are fetched from the Google Books API and displayed in a responsive grid or list layout
Each book card shows:
- Book thumbnail image (with a placeholder for books without images)
- Title
- Author(s)
- Publisher
- Published date
2. View Toggle
-   Users can switch between grid and list views using the buttons in the header
- The active view is highlighted with a different color
- Grid view shows books in a card layout
- List view shows books in a horizontal layout with image on the left
3. Search Functionality
- Users can search for books by title or author using the search bar
- Search is triggered by clicking the search button or pressing Enter
- Initial search loads "javascript programming" books by default
4. Sorting Options
- Books can be sorted by:
-   Relevance (default API order)
- Title (A-Z)
- Title (Z-A)
- Newest First (by published date)
- Oldest First (by published date)
5. Pagination with Infinite Scroll
- More books are loaded automatically when the user scrolls to the bottom of the page
- A loading indicator appears during data fetching
-   Each API call fetches 10 books at a time
6. Book Details Link
- Clicking on any book card opens the book's detailed information page in a new tab
- The link is provided by the Google Books API
7. Responsive Design
- The website is fully responsive and works well on both desktop and mobile devices
- Layout adjusts based on screen size
- List view changes to a vertical layout on smaller screens

## Technical Implementation

### API Integration
- Uses the Google Books API to fetch book data
- Handles API responses and errors appropriately
- Implements proper URL encoding for search queries

### JavaScript Functionality
- Uses modern JavaScript features (async/await, template literals, etc.)
- Implements event listeners for user interactions
- Handles sorting and filtering of book data
- Manages the application state (current view, sort order, etc.)

### CSS Styling
- Uses a clean, modern design with a pleasant color scheme
- Implements responsive design using CSS Grid and Flexbox
- Includes hover effects and transitions for a better user experience

## How to Use
- Open the index.html file in a web browser
- The page will initially load with a default search for "javascript programming"
- Use the search bar to find books by title or author
- Toggle between grid and list views using the buttons in the header
- Sort books using the dropdown menu
- Scroll down to load more books
- Click on any book to view more details in a new tab
