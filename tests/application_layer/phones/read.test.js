const chai = require('chai');
const { expect } = chai;
const testUtils = require('../../utils');

const applicationLayer = require('../../../src/application_layer');

describe('application_layer/phones/read', function() {
  before(async function () {
    testUtils.clearData();
  });

  describe('read phone', function() {
    it('fails if input id invalid', async function() {
      const invalidRequest = {
        'params': {
          'id': true,
        },
      };

      expect(
        applicationLayer.phones.read.parseInputParameters(invalidRequest)
      ).to.throw;
    });

    it('returns a phone if valid path provided', async function() {
      const testPhoneId = '1';
      const expected = {
        'id':              testPhoneId,
        'make':            'LG',
        'model':           'G6',
        'storage':         32,
        'monthly_premium': 4.49,
        'excess':          75,
      };
      await testUtils.postTestData(expected);

      const validRequest = {
        'params': {
          'id': testPhoneId,
        },
      };

      const actual = await applicationLayer.phones.read.parseInputParameters(validRequest);

      expect(actual).to.deep.equal({ id: testPhoneId });
    });
  });
});
