const { expect } = require('chai');
const dataAccessLayer = require('../../src/data_access_layer');
const testUtils = require('../utils');

describe('application_layer/phones', function() {
  before(async function () {
    testUtils.clearData();
  });

  describe('getPhoneById', function() {
    it('returns a inserted phone with given id', async function() {
      const expected = {
        'id':              1,
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };
      await testUtils.postTestData(expected);

      const actual = await dataAccessLayer.getPhoneById(1);
      expect(actual).to.deep.equal({
        ...expected,
        'yearly_premium': '49.39',

      });
    });
  });

  describe('deletePhoneById', function() {
    it('deletes an inserted phone with given id', async function() {
      const expected = {
        'id':              10,
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };
      await testUtils.postTestData(expected);

      await dataAccessLayer.deletePhoneById(10);

      const actual = await dataAccessLayer.getPhoneById(10);

      expect(actual).to.be.undefined;
    });
  });

  describe('updatePhone', function() {
    it('updates an inserted phone with a valid schema given id', async function() {
      const originalPhone = {
        'id':              11,
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };
      await testUtils.postTestData(originalPhone);

      const updatedPhone = {
        ...originalPhone,
        // Lets update the storage and increase the monthly premium
        'storage':         32,
        'monthly_premium': 9.49,
        'yearly_premium':  '104.39',
      };

      await dataAccessLayer.updatePhone(updatedPhone);

      const actual = await dataAccessLayer.getPhoneById(11);

      expect(actual).to.deep.equal(updatedPhone);
    });
  });
});
