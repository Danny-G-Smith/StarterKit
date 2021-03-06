module.exports = {
   'env': {
      'browser': true,
      "node" : true,
      'es6': true
   },
   'extends': 'eslint:recommended',
   'rules': {
      'indent': [
         'error',
         3
      ],
      'linebreak-style': [
         'error',
         'unix'
      ],
      'quotes': [
         'error',
         'single'
      ],
      'semi': [
         'error',
         'always'
      ]
   }
};
