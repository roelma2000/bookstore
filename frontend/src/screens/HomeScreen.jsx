import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import books from '../books';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Books</h1>
      <Row>
        {books.map((book) => (
          <Col key={book._id} sm={12} md={6} lg={4} xl={3}>
            <Book book={book} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;