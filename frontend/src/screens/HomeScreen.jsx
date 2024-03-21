import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetBooksQuery } from '../slices/booksApiSlice';


const HomeScreen = () => {
  const {data: books, isLoading, error } = useGetBooksQuery();

   return (
    <>
      { isLoading ? (
        <Loader />
      ) : error ? (<Message variant='danger'>{ error?.data?.message || error.error}</Message>) : 
      (<>
        <h1>Latest Books</h1>
        <Row>
          {books.map((book) => (
            <Col key={book.id} sm={12} md={6} lg={4} xl={3}>
              <Book book={book} />
            </Col>
          ))}
        </Row>
      </>) }

      
    </>
  );
};

export default HomeScreen;