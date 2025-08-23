import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery } from '../api/bookApi';
import DetailBodyThreeCols from '../sections/detail/DetailBodyThreeCols';


const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Function to fetch book details
  const fetchBookDetails = async (bookId) => {
    try {
      setLoading(true);
      console.log('Fetching book details for ID:', bookId);
      
      // Fetch specific book details
      const response = await fetch(`http://localhost:3000/books/${bookId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Book data:', data);
      setBookData(data);
      
      // Fetch all books for related products and hot deals
      const allBooksResponse = await fetch(`http://localhost:3000/books`);
      if (!allBooksResponse.ok) {
        throw new Error(`HTTP error! status: ${allBooksResponse.status}`);
      }
      const allBooks = await allBooksResponse.json();
      console.log('All books:', allBooks);
      
      // Filter related books (exclude current book)
      const related = allBooks.filter(book => 
        book.id !== parseInt(bookId)
      ).slice(0, 8);
      setRelatedBooks(related);
      
      // Get hot deals (first 8 books excluding current)
      const hotDealsBooks = allBooks.filter(book => 
        book.id !== parseInt(bookId)
      ).slice(0, 8);
      setHotDeals(hotDealsBooks);
      
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle book click
  const handleBookClick = (bookId) => {
    window.scrollTo(0, 0);
    navigate(`/books/${bookId}`);
  };

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  // Fetch data when component mounts or ID changes
  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>Đang tải...</div>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <div>Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  return (
  <DetailBodyThreeCols book={bookData} />
  );
};

export default Detail;
