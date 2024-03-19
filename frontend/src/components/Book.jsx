import { Card } from 'react-bootstrap';

const Book = ({ book }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/book/${book._id}`}>
        <Card.Img src={book.coverImageUrl} variant='top' />
      </a>

      <Card.Body>
        <a href={`/book/${book._id}`}>
          <Card.Title as='div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </a>

        <Card.Text as='h3'>${book.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Book;