import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetBookDetailsQuery } from '../slices/booksApiSlice';
import { addToCart } from '../slices/cartSlice';

const BookDetailsScreen = () => {
    const { id: bookId } = useParams();
   const dispatch = useDispatch(); //dispatch is a function that dispatches an action from the store - cartSlice
   const navigate = useNavigate();
    const [qty, setQty] = useState(1); // [1, function(){}, 2]
    const {data: book, isLoading, error } = useGetBookDetailsQuery(bookId);
  
    const addToCartHandler = () => {
      dispatch(addToCart({...book, quantity: qty})); //dispatch the addToCart action with the book and quantity
      navigate('/cart');
    };
  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      
        {/* template => { isLoading ? () : error ? () : () } */ }
      { isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{ error?.data?.message || error.error}</Message>
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

            {book.stockQuantity > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(book.stockQuantity).keys()].map((x) => ( // [0, 1, 2, 3, 4]
                      //array starts from 0, so we add 1 to x to start from 1
                        <option key={x + 1} value={x + 1}>          
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={book.stockQuantity === 0}
                  onClick={() => addToCartHandler()}
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

export default BookDetailsScreen;
