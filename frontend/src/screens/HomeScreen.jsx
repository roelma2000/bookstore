import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import axios from 'axios';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/books');
      setBooks(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Books</h1>
      <Row>
        {books.map((book) => (
          <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;