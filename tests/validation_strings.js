(function() {
  "use strict";
  var validator = require("../validation/Validation.js"),
      validatorTest;

validatorTest = function validator_test( test, validatorFunction, args, expected ) {
  var result = validator[validatorFunction].apply(validator, args);
  test.equal(result, expected, validatorFunction + " return unexpected data ('" + result + "') for params " + args.toString() );
  test.done();
};

exports.validateTimeHhMm = {
  "00:00"          : function( test ) { validatorTest( test, 'timeHhMm', [ "00:00" ], true ); },
  "01:00"          : function( test ) { validatorTest( test, 'timeHhMm', [ "01:00" ], true ); },
  "23:00"          : function( test ) { validatorTest( test, 'timeHhMm', [ "23:00" ], true ); },
  "12:23"          : function( test ) { validatorTest( test, 'timeHhMm', [ "12:23" ], true ); },
  "010:00 (false)" : function( test ) { validatorTest( test, 'timeHhMm', [ "010:00" ], false ); },
  "01:001 (false"  : function( test ) { validatorTest( test, 'timeHhMm', [ "01:001" ], false ); },
  "-00:00 (false)" : function( test ) { validatorTest( test, 'timeHhMm', [ "-00:00" ], false ); },
  "25:00 (false)"  : function( test ) { validatorTest( test, 'timeHhMm', [ "25:00" ], false ); },
  "25 (false)"     : function( test ) { validatorTest( test, 'timeHhMm', [ "25" ], false );},
  "19:60 (false)"  : function( test ) { validatorTest( test, 'timeHhMm', [ "19:60" ], false ); }
};

exports.validateCountryCode = {
  "US"            : function( test ) { validatorTest( test, 'countryCode', [ "US" ], true ); },
  "ES"            : function( test ) { validatorTest( test, 'countryCode', [ "ES" ], true ); },
  "USA (false)"   : function( test ) { validatorTest( test, 'countryCode', [ "USA" ], false ); },
  "ESP (false)"   : function( test ) { validatorTest( test, 'countryCode', [ "ESP" ], false ); }
};

exports.validateStateCode = {
  "CA"            : function( test ) { validatorTest( test, 'stateCode', [ "CA" ], true ); },
  "NY"            : function( test ) { validatorTest( test, 'stateCode', [ "NY" ], true ); },
  "CAL (false)"   : function( test ) { validatorTest( test, 'stateCode', [ "CAL" ], false ); },
  "NYC (false)"   : function( test ) { validatorTest( test, 'stateCode', [ "NYC" ], false ); }
};

exports.validateEmail = {
  "email@luisefabian.com.com"                : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com.com" ], true ); },
  "firstname.lastname@luisefabian.com.com"   : function( test ) { validatorTest( test, 'email', [ "firstname.lastname@luisefabian.com.com" ], true ); },
  "email@subdomain.luisefabian.com.com"      : function( test ) { validatorTest( test, 'email', [ "email@subdomain.luisefabian.com.com" ], true ); },
  "firstname+lastname@luisefabian.com.com"   : function( test ) { validatorTest( test, 'email', [ "firstname+lastname@luisefabian.com.com" ], true ); },
  "1234567890@luisefabian.com.com"           : function( test ) { validatorTest( test, 'email', [ "1234567890@luisefabian.com.com" ], true ); },
  "email@luisefabian.com-one.com"            : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com-one.com" ], true ); },
  "_______@luisefabian.com.com"              : function( test ) { validatorTest( test, 'email', [ "_______@luisefabian.com.com" ], true ); },
  "email@luisefabian.com.name"               : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com.name" ], true ); },
  "email@luisefabian.com.museum"             : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com.museum" ], true ); },
  "email@luisefabian.com.co.jp"              : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com.co.jp" ], true ); },
  "firstname-lastname@luisefabian.com.com"   : function( test ) { validatorTest( test, 'email', [ "firstname-lastname@luisefabian.com.com" ], true ); },
  "email@123.123.123.123"           : function( test ) { validatorTest( test, 'email', [ "email@123.123.123.123" ], true ); },
  "“email”@luisefabian.com.com"              : function( test ) { validatorTest( test, 'email', [ "“email”@luisefabian.com.com" ], false ); },
  "email@[123.123.123.123]"         : function( test ) { validatorTest( test, 'email', [ "email@[123.123.123.123]" ], false ); },
  "plainaddress (false)"            : function( test ) { validatorTest( test, 'email', [ "plainaddress" ], false ); },
  "#@%^%#$@#$@#.com (false)"        : function( test ) { validatorTest( test, 'email', [ "#@%^%#$@#$@#.com" ], false ); },
  "@luisefabian.com.com (false)"             : function( test ) { validatorTest( test, 'email', [ "@luisefabian.com.com" ], false ); },
  "Joe Smith <email@luisefabian.com.com> (false)" : function( test ) { validatorTest( test, 'email', [ "Joe Smith <email@luisefabian.com.com>" ], false ); },
  "email.luisefabian.com.com (false)"         : function( test ) { validatorTest( test, 'email', [ "email.luisefabian.com.com" ], false ); },
  "email@luisefabian.com@luisefabian.com.com (false)"  : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com@luisefabian.com.com" ], false ); },
  ".email@luisefabian.com.com (false)"        : function( test ) { validatorTest( test, 'email', [ ".email@luisefabian.com.com" ], false ); },
  "email.@luisefabian.com.com (false)"        : function( test ) { validatorTest( test, 'email', [ "email.@luisefabian.com.com" ], false ); },
  "email..email@luisefabian.com.com (false)"  : function( test ) { validatorTest( test, 'email', [ "email..email@luisefabian.com.com" ], false ); },
  "あいうえお@luisefabian.com.com (false)"     : function( test ) { validatorTest( test, 'email', [ "あいうえお@luisefabian.com.com" ], false ); },
  "email@luisefabian.com.com (Joe Smith) (false)" : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com.com (Joe Smith)" ], false ); },
  "email@luisefabian.com (false)"             : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com" ], false ); },
  "email@-luisefabian.com.com (false)"        : function( test ) { validatorTest( test, 'email', [ "email@-luisefabian.com.com" ], false ); },
  "email@luisefabian.com..com (false)"        : function( test ) { validatorTest( test, 'email', [ "email@luisefabian.com..com" ], false ); },
  "Abc..123@luisefabian.com.com (false)"      : function( test ) { validatorTest( test, 'email', [ "Abc..123@luisefabian.com.com" ], false ); }
};

exports.validateStandardPassword = {
  "123"        : function( test ) { validatorTest( test, 'standardPassword', [ "123" ], true ); },
  "sad123"        : function( test ) { validatorTest( test, 'standardPassword', [ "sad123" ], true ); },
  "asdfadsfas.,123"        : function( test ) { validatorTest( test, 'standardPassword', [ "asdfadsfas.,123" ], true ); },
  "as (false)"        : function( test ) { validatorTest( test, 'standardPassword', [ "as" ], false ); },
  "12 (false)"        : function( test ) { validatorTest( test, 'standardPassword', [ "12" ], false ); },
  "asdfadsfas.,¿?123 (false)"        : function( test ) { validatorTest( test, 'standardPassword', [ "asdfadsfas.,¿?123" ], false ); },
};

exports.validateStrongPassword = {
  "12.Iil"          : function( test ) { validatorTest( test, 'strongPassword', [ "12.Iil" ], true ); },
  "TeSt.i!*-11n12 "       : function( test ) { validatorTest( test, 'strongPassword', [ "TeSt.i!*-11n12" ], true ); },
  "Ordr.in12 "       : function( test ) { validatorTest( test, 'strongPassword', [ "Ordr.in12" ], true ); },
  "ordr.in12 (false no uppercase)"       : function( test ) { validatorTest( test, 'strongPassword', [ "ordr.in12" ], false ); },
  "oluisefabian.com12 (false, no special chars)"       : function( test ) { validatorTest( test, 'strongPassword', [ "ordr.in12" ], false ); },
  "123  (false)"            : function( test ) { validatorTest( test, 'strongPassword', [ "123" ], false ); },
  "sad123  (false)"         : function( test ) { validatorTest( test, 'strongPassword', [ "sad123" ], false ); },
  "asdfadsfas.,123 (false no uppercase)" : function( test ) { validatorTest( test, 'strongPassword', [ "asdfadsfas.,123" ], false ); },
  "as (false)"              : function( test ) { validatorTest( test, 'strongPassword', [ "as" ], false ); },
  "12 (false)"              : function( test ) { validatorTest( test, 'strongPassword', [ "12" ], false ); },
  "Asdfadsfas.,¿?123 (false not valid special chars)" : function( test ) { validatorTest( test, 'strongPassword', [ "asdfadsfas.,¿?123" ], false ); },
};



exports.testGreaterThan = {
  "b > a (false)" : function(test) { validatorTest( test, 'greaterThan',  ["b", "a"], true); },
  "bbb > aaa" : function(test) { validatorTest( test, 'greaterThan',  ["bbb", "aaa"], true); },
  "a > 1 (ascii) " : function(test) { validatorTest( test, 'greaterThan',  ["a", "1"], true); },
  "a > A (ascii) " : function(test) { validatorTest( test, 'greaterThan',  ["a", "A"], true); },
  "abcde > 91231 (ascii) " : function(test) { validatorTest( test, 'greaterThan',  ["abcde", "91231"], true); },
  "a > a " : function(test) { validatorTest( test, 'greaterThan',  ["a", "a"], false); },
  "A > a (false, ascii)" : function(test) { validatorTest( test, 'greaterThan',  ["A", "a"], false); },
  "a > b (false)" : function(test) { validatorTest( test, 'greaterThan',  ["a", "b"], false); },
  "aaa > bbb String (false)" : function(test) { validatorTest( test, 'greaterThan',  ["aaa", "bbb"], false); },
  "1 > a (false, ascii) " : function(test) { validatorTest( test, 'greaterThan',  ["1", "a"], false); },
  "91231 > abcde (false, ascii) " : function(test) { validatorTest( test, 'greaterThan',  ["91231", "abcde"], false); },
  "91231 > abcde (false, NUMBER VS String) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  [91231, "abcde"], false); }

};


exports.testGreaterThanOrEqual = {
  "b >= a (false)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["b", "a"], true); },
  "bbb >= aaa" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["bbb", "aaa"], true); },
  "a >= 1 (ascii String VS String) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["a", "1"], true); },
  "a >= A (ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["a", "A"], true); },
  "abcde >= 91231 (ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["abcde", "91231"], true); },
  "a >= a (ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["a", "a"], true); },
  "91231 >= 91231 (ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["91231", "91231"], true); },
  "abcde >= abcde (ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["abcde", "abcde"], true); },
  "A >= a (false, ascii)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["A", "a"], false); },
  "a >= b (false)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["a", "b"], false); },
  "aaa >= bbb String (false)" : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["aaa", "bbb"], false); },
  "1 >= a (false, ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["1", "a"], false); },
  "a >= 1 (false, ascii String VS Number) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["a", 1], false); },
  "91231 >= abcde (false, ascii) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  ["91231", "abcde"], false); },
  "91231 >= abcde (false, NUMBER VS String) " : function(test) { validatorTest( test, 'greaterThanOrEqual',  [91231, "abcde"], false); }
};

exports.testLessThan = {
  "A < a (false, ascii)" : function(test) { validatorTest( test, 'lessThan',  ["A", "a"], true ); },
  "a < b (false)" : function(test) { validatorTest( test, 'lessThan',  ["a", "b"], true ); },
  "aaa < bbb String (false)" : function(test) { validatorTest( test, 'lessThan',  ["aaa", "bbb"], true ); },
  "1 < a (false, ascii) " : function(test) { validatorTest( test, 'lessThan',  ["1", "a"], true ); },
  "91231 < abcde (false, ascii) " : function(test) { validatorTest( test, 'lessThan',  ["91231", "abcde"], true ); },
  "a < a (false)" : function(test) { validatorTest( test, 'lessThan',  ["a", "a"], false ); },
  "b < a (false)" : function(test) { validatorTest( test, 'lessThan',  ["b", "a"], false ); },
  "bbb < aaa" : function(test) { validatorTest( test, 'lessThan',  ["bbb", "aaa"], false ); },
  "a < 1 (ascii) " : function(test) { validatorTest( test, 'lessThan',  ["a", "1"], false ); },
  "a < A (ascii) " : function(test) { validatorTest( test, 'lessThan',  ["a", "A"], false ); },
  "abcde < 91231 (ascii) " : function(test) { validatorTest( test, 'lessThan',  ["abcde", "91231"], false ); },
  "91231 < abcde (false, NUMBER VS String) " : function(test) { validatorTest( test, 'lessThan',  [91231, "abcde"], false); }
};

exports.testLessThanOrEqual = {
  "A < a (false, ascii)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["A", "a"], true ); },
  "a < b (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["a", "b"], true ); },
  "aaa < bbb String (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["aaa", "bbb"], true ); },
  "1 < a (false, ascii) " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["1", "a"], true ); },
  "91231 < abcde (false, ascii) " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["91231", "abcde"], true ); },
  "a < a (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["a", "a"], true ); },
  "b < a (false)" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["b", "a"], false ); },
  "bbb < aaa" : function(test) { validatorTest( test, 'lessThanOrEqual',  ["bbb", "aaa"], false ); },
  "a < 1 (ascii) " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["a", "1"], false ); },
  "a < A (ascii) " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["a", "A"], false ); },
  "abcde < 91231 (ascii) " : function(test) { validatorTest( test, 'lessThanOrEqual',  ["abcde", "91231"], false ); },
  "91231 < abcde (false, NUMBER VS String) " : function(test) { validatorTest( test, 'lessThanOrEqual',  [91231, "abcde"], false); }
};

exports.equalTo = {
  "1 vs 2 (false)" : function(test) { validatorTest( test, 'equalTo',  [1, 2], false); },
  "1 vs 2 String (false)" : function(test) { validatorTest( test, 'equalTo',  ["1", "2"], false); },
  "2 vs 1  (false)" : function(test) { validatorTest( test, 'equalTo',  [2, 1], false); },
  "2 vs 1 String (false)" : function(test) { validatorTest( test, 'equalTo',  ["2", "1"], false); },
  "2 vs 2 " : function(test) { validatorTest( test, 'equalTo',  [2, 2], true); },
  "2 Number vs 2 String " : function(test) { validatorTest( test, 'equalTo',  [2, "2"], false); },
  "2 String vs 2 String " : function(test) { validatorTest( test, 'equalTo',  ["2", "2"], true); },
  "2 String vs 2 NUMBER (false)" : function(test) { validatorTest( test, 'equalTo',  ["2", 2], false); },
};

}());