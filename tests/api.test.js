var assert = require('assert');
const request = require('supertest');
const expect = require('chai').expect;

describe('nodejs api test', function () {
    it('获取图书列表接口', function (done) {
        request('http://localhost:3001')
            .get('/api/getBooksList')
            .expect(200)
            .end((err, res) => {
                expect(res.body.length).equal(11);
                // console.log('res', res.body);
                done();
            })
    })
});