import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useGetBookDetailsQuery } from '../slices/booksApiSlice';

const BookDetailsScreen = () => {
    const { id: bookId } = useParams();
    const {data: book, isLoading, error } = useGetBookDetailsQuery(bookId);

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
        {/* template => { isLoading ? () : error ? () : () } */ }
      { isLoading ? (
        <h2>Loading....</h2>
      ) : error ? (
        <div>{ error?.data?.message || error.error }</div>
      ) : (
        <Row>
        <Col md={5}>
          <Image src={book.coverImageUrl} alt={book.coverImageUrl} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{book.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${book.price}</ListGroup.Item>
            <ListGroup.Item> {book.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${book.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {book.stockQuantity > 0 ? 'In Stock' : 'Out Of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={book.stockQuantity === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      ) }

      
    </>
  )
}

export default BookDetailsScreen
