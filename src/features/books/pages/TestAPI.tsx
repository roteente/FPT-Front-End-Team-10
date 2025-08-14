import React from 'react';
import { useGetBooksQuery, useGetBookByIdQuery } from '../api/bookApi';

const TestAPI: React.FC = () => {
  const { data: books, isLoading: booksLoading, error: booksError } = useGetBooksQuery();
  const { data: book6, isLoading: book6Loading, error: book6Error } = useGetBookByIdQuery('6');

  console.log('Test API Component - Books:', { books, booksLoading, booksError });
  console.log('Test API Component - Book 6:', { book6, book6Loading, book6Error });

  // Test different API endpoints
  const testEndpoints = async () => {
    try {
      // Test với fetch trực tiếp
      console.log('Testing /books endpoint...');
      const booksResponse = await fetch('http://localhost:3000/books');
      console.log('Books response status:', booksResponse.status);
      if (booksResponse.ok) {
        const booksData = await booksResponse.json();
        console.log('Books data:', booksData);
      }

      console.log('Testing /Books endpoint...');
      const BooksResponse = await fetch('http://localhost:3000/Books');
      console.log('Books (capital B) response status:', BooksResponse.status);
      if (BooksResponse.ok) {
        const BooksData = await BooksResponse.json();
        console.log('Books (capital B) data:', BooksData);
      }

      console.log('Testing /books/6 endpoint...');
      const book6Response = await fetch('http://localhost:3000/books/6');
      console.log('Book 6 response status:', book6Response.status);
      if (book6Response.ok) {
        const book6Data = await book6Response.json();
        console.log('Book 6 data:', book6Data);
      }

      console.log('Testing /Books/6 endpoint...');
      const Book6Response = await fetch('http://localhost:3000/Books/6');
      console.log('Book 6 (capital B) response status:', Book6Response.status);
      if (Book6Response.ok) {
        const Book6Data = await Book6Response.json();
        console.log('Book 6 (capital B) data:', Book6Data);
      }
    } catch (err) {
      console.error('Test fetch error:', err);
    }
  };

  React.useEffect(() => {
    testEndpoints();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-4">
        <button 
          onClick={testEndpoints}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test API Endpoints
        </button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">All Books (RTK Query)</h2>
        {booksLoading && <p>Loading books...</p>}
        {booksError && (
          <div>
            <p className="text-red-500">Error loading books:</p>
            <pre className="text-sm bg-red-50 p-2 rounded">{JSON.stringify(booksError, null, 2)}</pre>
          </div>
        )}
        {books && (
          <div>
            <p className="text-green-500">✅ Books loaded successfully! Count: {books.length}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">View first book</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(books[0], null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Book ID = 6 (RTK Query)</h2>
        {book6Loading && <p>Loading book 6...</p>}
        {book6Error && (
          <div>
            <p className="text-red-500">Error loading book 6:</p>
            <pre className="text-sm bg-red-50 p-2 rounded">{JSON.stringify(book6Error, null, 2)}</pre>
          </div>
        )}
        {book6 && (
          <div>
            <p className="text-green-500">✅ Book 6 loaded successfully!</p>
            <p className="text-sm text-gray-600">Title: {book6.name}</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-blue-500">View book 6 data</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                {JSON.stringify(book6, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestAPI;
