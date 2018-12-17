const { Validator } = require('jsonschema');

const v = new Validator();

// Address, to be embedded on Person
const addressSchema = {
  id: '/SimpleAddress',
  type: 'object',
  properties: {
    lines: {
      type: 'array',
      items: { type: 'string' },
    },
    zip: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' },
  },
  required: ['country'],
};

// Person
const schema = {
  id: '/SimplePerson',
  type: 'object',
  properties: {
    name: { type: 'integer' },
    address: { $ref: '/SimpleAddress' },
    votes: { type: 'integer', minimum: 1 },
  },
};

const p = {
  name: 'Barack Obama',
  address: {
    lines: ['1600 Pennsylvania Avenue Northwest'],
    zip: 'DC 20500',
    city: 'Washington',
    country: 'USA',
  },
  votes: 1.4,
};

v.addSchema(addressSchema, '/SimpleAddress');
console.log(v.validate(p, schema));
