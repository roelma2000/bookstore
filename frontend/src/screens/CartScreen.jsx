import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    //this will call the addToCart action in cartSlice and pass the book and quantity
    const addToCartHandler = async (book, quantity) => {
        //...book: spread the book object and add/update the quantity to it
        dispatch(addToCart({...book, quantity}));
    };
    
  return (
    <Row>
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>
            ) : (
                <ListGroup variant='flush'>
                    { cartItems.map(item => (
                        <ListGroup.Item key={item.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.coverImageUrl} alt={item.title} fluid rounded />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/book/${item.id}`}>{item.title}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={2}>
                                <Form.Control
                                    as='select'
                                    value={item.quantity}
                                    //call addToCartHandler function with the book and the quantity selected
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))} 
                                    >
                                    {[...Array(item.stockQuantity).keys()].map((x) => ( // [0, 1, 2, 3, 4]
                                    //array starts from 0, so we add 1 to x to start from 1
                                        <option key={x + 1} value={x + 1}>          
                                        {x + 1}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={() => {}}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
                        ${cartItems
                            .reduce((acc, item) => acc + item.quantity * item.price, 0)
                            .toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Button type="button" className="btn-block" disabled={cartItems.length === 0} >
                        Proceed To Checkout
                    </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
};

export default CartScreen