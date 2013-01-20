(function() {
  "use strict";
  var validator = require("../validation/Validation.js"),
      validatorTest;

validatorTest = function validator_test( test, validatorFunction, args, expected ) {
  var result = validator[validatorFunction].apply(validator, args);
  test.equal(result, expected, validatorFunction + " return unexpected data ('" + result + "') for params " + args.toString() );
  test.done();
};

exports.testsIsNumeric = {
  "-1"                : function( test ) { validatorTest( test, 'isNumeric', [-1], true );},
  "-1 string"         : function( test ){ validatorTest( test, 'isNumeric', ["-1"], true ); },
  "-1.5"              : function( test ){ validatorTest( test, 'isNumeric', [-1.5], true ); },
  "-1.5 string"       : function( test ){ validatorTest( test, 'isNumeric', ["-1.5"], true ); },
  "0"                 : function( test ){ validatorTest( test, 'isNumeric', [0], true ); },
  ".42"               : function( test ){ validatorTest( test, 'isNumeric', [".42"] , true ); },
  "0.42"              : function( test ){ validatorTest( test, 'isNumeric', [0.42] , true ); },
  "99,999 (false)"    : function( test ){ validatorTest( test, 'isNumeric', ["99,999"] , false ); },
  "'0x89f' (false)"   : function( test ){ validatorTest( test, 'isNumeric', ["00x89f"] , false ); },
  "'#abcdef' (false)" : function( test ){ validatorTest( test, 'isNumeric', ["#abcdef"], false); }
};

exports.testsLatLng = {
  "40.7389343"    : function( test ){ validatorTest( test, 'latLng', [40.7389343], true ); },
  "-73.9896316"   : function( test ){ validatorTest( test, 'latLng', [-73.9896316], true ); },
  "40.73"         : function( test ){ validatorTest( test, 'latLng', [40.73], true ); },
  "40"            : function( test ){ validatorTest( test, 'latLng', [40], true ); },
  "abcde (false)" : function( test ){ validatorTest( test, 'latLng', ["abcde"], false ); },
  "1.1.1 (false)" : function( test ){ validatorTest( test, 'latLng', ["1.1.1"], false ); },
};

exports.testZipCode = {
  "12345"           : function( test ) { validatorTest( test, 'zipCode', [12345] , true); }, 
  "12345 (String)"  : function( test ) { validatorTest( test, 'zipCode', ["12345"] , true); }, 
  "123456 (false)"  :  function( test ) { validatorTest( test, 'zipCode', [123456] , false); },
  "12.34 (false)"   :  function( test ) { validatorTest( test, 'zipCode', [12.344] , false); },
  "12.344 (false)"  :  function( test ) { validatorTest( test, 'zipCode', [12.34] , false); },
  "12.344 String (false)" :  function( test ) { validatorTest( test, 'zipCode', ["12.344"] , false); },
  "01234 String"    : function( test ) { validatorTest( test, 'zipCode', ["01234"] , true); },
  "0123 String (false)"    : function( test ) { validatorTest( test, 'zipCode', ["0123"] , false); }
};
  
exports.testTimeHhMm = {
  "00:00": function( test ) { validatorTest( test, 'timeHhMm', ["00:00"] , true); }, 
  "00:61 (false)": function( test ) { validatorTest( test, 'timeHhMm', ["00:61"] , false); }, 
  "24:00 (false)": function( test ) { validatorTest( test, 'timeHhMm', ["24:00"] , false); }, 
  "23:59": function( test ) { validatorTest( test, 'timeHhMm', ["23:59"] , true); }, 
  "22:30": function( test ) { validatorTest( test, 'timeHhMm', ["22:30"] , true); }, 
  "19:30": function( test ) { validatorTest( test, 'timeHhMm', ["19:30"] , true); }, 
  "11:14": function( test ) { validatorTest( test, 'timeHhMm', ["11:14"] , true); }, 
  "11:141": function( test ) { validatorTest( test, 'timeHhMm', ["11:141"] , false); }, 
  "113:14": function( test ) { validatorTest( test, 'timeHhMm', ["113:14"] , false); }
};

exports.testCreditCardNumber = {
  "4111111111111111" : function( test ) { validatorTest( test, 'creditCardNumber',  ["4111111111111111"], true); },
  "41111111111111111 (false)" : function( test ) { validatorTest( test, 'creditCardNumber',  ["41111111111111111"], false); },
  "4111 1111 1111 1111 (false)" : function( test ) { validatorTest( test, 'creditCardNumber',  ["4111 1111 1111 1111"], false); },
  "4111111111 111112 (false) "  : function( test ) { validatorTest( test, 'creditCardNumber',  ["4111111111 111112"], false); },
  "41111211111111112 (false)"   : function( test ) { validatorTest( test, 'creditCardNumber',  ["41111211111111112"], false); }
};

exports.testCreditCardExp = {
  "11-2011 (false)" : function(test) { validatorTest( test, 'creditCardExp',  ["11", "2011"], false); },
  "12-2056" : function(test) { validatorTest( test, 'creditCardExp', ["12", "2056"], true); }, 
  "13-2056 (false)" : function(test) { validatorTest( test, 'creditCardExp', ["13", "2056"], false); }, 
  "2-2056  (false)" : function(test) { validatorTest( test, 'creditCardExp', ["2", "2056"], false); }, 
  "02-2056" : function(test) { validatorTest( test, 'creditCardExp', ["02", "2056"], true); }
};

exports.testCreditCardExpYear = {
  "2011 (false)" : function(test) { validatorTest( test, 'creditCardExpYear',  ["2011"], false); },
  "2056" : function(test) { validatorTest( test, 'creditCardExpYear', ["2056"], true); }, 
  "200 (false)" : function(test) { validatorTest( test, 'creditCardExpYear', ["200"], false); }
};

exports.testGreaterThan = {
  "1 vs 2 (false)" : function(test) { validatorTest( test, 'greaterThan',  [1, 2], false); },
  "1 vs 2 String (false)" : function(test) { validatorTest( test, 'greaterThan',  ["1", "2"], false); },
  "2 vs 1  " : function(test) { validatorTest( test, 'greaterThan',  [2, 1], true); },
  "2 vs 1 String " : function(test) { validatorTest( test, 'greaterThan',  ["2", "1"], true); },
  "2 vs 2  (false)" : function(test) { validatorTest( test, 'greaterThan',  [2, 2], false); },
  "2 vs 2 String (false)" : function(test) { validatorTest( test, 'greaterThan',  ["2", "2"], false); }
};

exports.testGreaterThanOrEqual = {
  "1 vs 2 (false)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  [1, 2], false); },
  "1 vs 2 String (false)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["1", "2"], false); },
  "2 vs 1  " : function(test) { validatorTest( test, 'greaterThanOrEqual',  [2, 1], true); },
  "2 vs 1 String " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["2", "1"], true); },
  "2 vs 2  " : function(test) { validatorTest( test, 'greaterThanOrEqual',  [2, 2], true); },
  "2 vs 2 String " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["2", "2"], true); }
};

exports.testLessThanOrEqual = {
  "1 vs 2 " : function(test) { validatorTest( test, 'lessThanOrEqual',  [1, 2], true); },
  "1 vs 2 String " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["1", "2"], true); },
  "2 vs 1  (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  [2, 1], false); },
  "2 vs 1 String (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["2", "1"], false); },
  "2 vs 2  " : function(test) { validatorTest( test, 'lessThanOrEqual',  [2, 2], true); },
  "2 vs 2 String " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["2", "2"], true); }
};

exports.testLessThan = {
  "1 vs 2" : function(test) { validatorTest( test, 'lessThan',  [1, 2], true); },
  "1 vs 2 String " : function(test) { validatorTest( test, 'lessThan',  ["1", "2"], true); },
  "2 vs 1  (false)" : function(test) { validatorTest( test, 'lessThan',  [2, 1], false); },
  "2 vs 1 String (false)" : function(test) { validatorTest( test, 'lessThan',  ["2", "1"], false); },
  "2 vs 2  (false)" : function(test) { validatorTest( test, 'lessThan',  [2, 2], false); },
  "2 vs 2 String (false)" : function(test) { validatorTest( test, 'lessThan',  ["2", "2"], false); }
};

exports.equalTo = {
  "1 vs 2 (false)" : function(test) { validatorTest( test, 'equalTo',  [1, 2], false); },
  "1 vs 2 String (false)" : function(test) { validatorTest( test, 'equalTo',  ["1", "2"], false); },
  "2 vs 1  (false)" : function(test) { validatorTest( test, 'equalTo',  [2, 1], false); },
  "2 vs 1 String (false)" : function(test) { validatorTest( test, 'equalTo',  ["2", "1"], false); },
  "2 vs 2 " : function(test) { validatorTest( test, 'equalTo',  [2, 2], true); },
  "2 String vs 2 String " : function(test) { validatorTest( test, 'equalTo',  ["2", "2"], true); },
  "2 String vs 2 NUMBER (false)" : function(test) { validatorTest( test, 'equalTo',  ["2", 2], false); },
};


exports.cleanup = {
  cleanup : function( test ) { test.done() }
};


}());