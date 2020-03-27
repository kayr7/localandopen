import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

var searchPattern = new RegExp ('^https?://');

function VendorCard (props) {
  return (
    <Card className="text-center" style={{width: '20rem', margin: '1em'}}>
      <Card.Header as="h5">{props.name}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          {props.description}
        </Card.Subtitle>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  checked={props.onlineshop}
                  readOnly="True"
                  label="Onlineshop"
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  checked={props.voucher}
                  readOnly="True"
                  label="Gutscheine"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  checked={props.delivery}
                  readOnly="True"
                  label="Lieferung"
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  checked={props.mail_order}
                  readOnly="True"
                  label="Versand"
                />
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col sm={12} style={{textAlign: 'left'}}>
                <a
                  rel="extern"
                  href={
                    searchPattern.test (props.website)
                      ? props.website
                      : 'http://' + props.website
                  }
                >
                  {props.website}
                </a>
              </Col>

            </Row><Row>
              <Col sm={12} style={{textAlign: 'left'}}>
                <a href={'mailto:' + props.mail}>{props.mail}</a>
              </Col>
            </Row><Row>
              <Col sm={12} style={{textAlign: 'left'}}>
                <a href={'tel:' + props.phone}>{props.phone}</a>
              </Col>

            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col sm={12} style={{textAlign: 'left'}}>{props.address}</Col>
            </Row><Row>
              <Col sm={8} style={{textAlign: 'left'}}>{props.street}</Col>
              <Col sm={4} style={{textAlign: 'left'}}>{props.street_nr}</Col>
            </Row><Row>
              <Col sm={4} style={{textAlign: 'left'}}>{props.zip}</Col>
              <Col sm={8} style={{textAlign: 'left'}}>{props.city}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default VendorCard;
