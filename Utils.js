const isNumber = (value) => typeof value === 'number' && !isNaN(value);

const filter = (cond) => (values) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    if (cond(value, key, values)) {
      acc[key] = value;
    }

    return acc;
  }, values.constructor());

const keysOnly = (keys) => {
  const cond = (_, key) => keys.includes(key);

  return filter(cond);
};

module.exports = {
  isNumber,
  filter,
  keysOnly,
};
