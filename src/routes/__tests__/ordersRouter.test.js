const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const { factory } = require('factory-girl');
const request = require('supertest');
const express = require('express');

const mockOrder = {
  orderSum: 24555,
  _id: '5bc6ed919c97a6376737ff04',
  userId: '5bc6ed8b9c97a6376737ff03',
  cart: [
    {
      _id: '5bc6ed919c97a6376737ff06',
      phoneId: '5bc5d8ebfd93f22b83ecba61',
      phoneCount: 11,
    },
    {
      _id: '5bc6ed919c97a6376737ff05',
      phoneId: '5bc5d938fd93f22b83ecba62',
      phoneCount: 23,
    },
  ],
  createdAt: '2018-10-17T08:06:41.075Z',
  updatedAt: '2018-10-17T08:06:41.075Z',
};

const ordersRouter = require('../ordersRouter');
const { Order } = require('../../models/order');

const app = express();
app.use('/orders', ordersRouter);

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

describe('Orders router ', () => {
  it('returns orders object array on GET /orders', (done) => {
    const expectedResult = [mockOrder];
    sinon.mock(Order).expects('find').chain('exec').yields(null, expectedResult);

    request(app)
      .get('/orders')
      .expect((res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.include.keys('orderSum', 'userId', 'cart');
      })
      .expect(200, done);
  });

  it('returns order object on GET /orders/:id', (done) => {
    sinon.mock(Order).expects('findById').yields(null, mockOrder);

    request(app)
      .get(`/orders/${mockOrder.id}`)
      .expect((res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('orderSum', 'userId', 'cart');
      })
      .expect(200, done);
  });

  it('returns new order object on POST /orders', () => {
    let order = {
      orderSum: 24555,
      _id: '5bc6ed919c97a6376737ff04',
      userId: '5bc6ed8b9c97a6376737ff03',
      cart: [],
    };

    factory.define('order', order, Order);
    factory.build('order').then((orderDoc) => {
      order = orderDoc;

      const orderMock = sinon.mock(order);

      orderMock
        .expects('save')
        .resolves(order);

      request(app)
        .post('/orders')
        .expect((res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('orderSum', 'userId', 'cart');
        });
    });
  });
});
