import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import { useGetBooksQuery } from '../slices/booksApiSlice';


const HomeScreen = () => {
  const {data: books, isLoading, error } = useGetBooksQuery();

   return (
    <>
      { isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (<div>{ error?.data?.message || error.error}</div>) : 
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