
const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils');

const phones = require('../../../src/application_layer/phones/delete');
const dataAccessLayer = require('../../../src/data_access_layer/phones');

describe('application_layer/phones', function() {
  before(async function () {
    testUtils.clearData();
  });

  describe('delete phone', function() {
    it('fails if input id invalid', async function() {
      const invalidRequest = {
        'params': {
          'phoneId': 44,
        },
      };
      expect(
        phones.parseInputParameters(invalidRequest)
      ).to.throw;
    });

    it('returns the deleted phone id if valid id provided', async function() {
      const expected = {
        'id':              '1',
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };
      await testUtils.postTestData(expected);

      const validRequest = {
        'params': {
          'id': '1',
        },
      };

      const parsed = await phones.parseInputParameters(validRequest);
      const actual = await dataAccessLayer.deletePhoneById(parsed);

      expect(actual).to.deep.equal({ id: expected.id });
    });
  });
});
