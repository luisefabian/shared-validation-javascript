(function() {
  "use strict";
  var validator = require("../validation/Validation.js"),
      _         = require("underscore"),
      testDataSuite, validateTest, validateClose, validateCloseReuse, validateNotForbidden, validationObj,
      testDataSuite2, testDataSuite3,
      validationConstraints1,
      validationConstraints2,
      validationConstraints3,
      validationConstraints4,
      validationConstraints5,
      validationConstraints6,
      validationConstraints7,
      validationConstraints8,
      validationConstraints9;

  validateClose = function (){
    return function check_close( close, open ){
      return (close > open);
    };
  }();

  validateCloseReuse = function (){
    return function check_close( close, open ){
      return this.greaterThan(close,open);
    };
  }();

  validateNotForbidden = function (){
    return function not_forbidden( value ){
      return value !== 'forbidden';
    };
  }();

  testDataSuite = {
    email: "test@luisefabian.com.com",
    open : "02:00",
    close: "01:00",
    name: "NámewithSp€cialChars{}",
    lastname: "",
  }

  testDataSuite2 = {
    email: "test@luisefabian.com.com",
    open : "02:00",
    close: "01:00",
    name: "NámewithSp€cialChars{}",
    lastname: "whatever",
  }

  testDataSuite3 = {
    email: "test@luisefabian.com.com",
    open : "02:00",
    close: "01:00",
    name: "NámewithSp€cialChars{}",
    lastname: "forbidden",
  }

  /* This function will validate using predefined functions in validator. 
    It will check close twice being able to return a different error msg depending on what is not 
    If we would have wanted to have a common error msg we could check close with just one line mixing validateFn, validateFnParams and notEqual.
    { key: "close" , required:true,  notEqual: "01:00", validateFn: "greaterThan", validateFnParams: ["open"], msg: "Close time is not vlaid" },
    */

  validationConstraints1 = [
    { key: "email" ,   required:true,   vFn: "email",    msg: "Email Address is not valid" },
    { key: "open"  ,   required:true,   vFn: "timeHhMm", msg: "Time format is not valid" },
    { key: "open"  ,   required:true,   vFn: ["notEqualTo", "00:00"], msg: "You can open at midnight" },
    { key: "close" ,   required:true,   vFn: ["greaterThan", "open"], msg: "Close time is earlier than opening time (error2)" },
    { key: "close" ,   required:true,   vFn: ["notEqualTo", "01:00"], msg: "You can't close at 1AM" },
    { key: "name"  ,   required:true,   vFn: ["notEqualTo", ""] },
    { key: "lastname", required:true,   vFn: ["notEqualTo", "forbidden"], msg:"Last name not valid" }
  ];

 /* This set of validations do the same that the first one but instead of using a predefined validation function it uses a customized one (that actually does the same) */
  validationConstraints2 = [
    { key: "email" ,  required:true,  vFn: "email", msg: "Email Address is not valid" },
    { key: "open"  ,  required:true,  vFn: "timeHhMm", msg: "Time format is not valid" },
    { key: "open"  ,  required:true,  vFn: ["notEqualTo", "00:00"], msg: "You can open at midnight" },
    { key: "close" ,  required:true,  vFn: ["greaterThan", "open"], msg: "Close time is earlier than opening time (error2)" },
    { key: "close" ,  required:true,  vFn: ["notEqualTo", "01:00"], msg: "You can't close at 1AM" },
    { key: "lastname", vFn:["notEqualTo","forbidden"], msg:"Last name not valid" }
  ];

  /* This one makes sure that last name is required and also that it is not "forbidden" */
  validationConstraints3 = [
    { key: "email" , required:true, vFn: "email", msg: "Email Address is not valid" },
    { key: "open"  , required:true, vFn: "timeHhMm", msg: "Time format is not valid" },
    { key: "open"  , required:true, vFn: ["notEqualTo", "00:00"], msg: "You can open at midnight" },
    { key: "close" , required:true, cFn: [validateClose,"open"], msg: "Close time is earlier than opening time (error1)" },
    { key: "close" , required:true, vFn: ["notEqualTo", "01:00"], msg: "You can't close at 1AM" },
    { key: "lastname" , required: true, vFn: ["notEqualTo", "forbidden"] , msg:"Last name not valid" }
  ];


  /* This set of validations do the same that validationConstraints4 but the customFn will use other validation.js function  */
  validationConstraints4 = [
    { key: "email" , required:true, vFn: "email", msg: "Email Address is not valid" },
    { key: "open"  , required:true, vFn: "timeHhMm", msg: "Time format is not valid" },
    { key: "open"  , required:true, vFn: ["notEqualTo", "00:00"], msg: "You can open at midnight" },
    { key: "close" , required:true, cFn: [validateCloseReuse,"open"], msg: "Close time is earlier than opening time (error1)" },
    { key: "close" , required:true, vFn: ["notEqualTo", "01:00"], msg: "You can't close at 1AM" },
    { key: "lastname" , vFn: ["notEqualTo", "forbidden"] , msg:"Last name not valid" }
  ];
  /* This one uses the custom function without parameters (it only passes the function and not an array) */
   validationConstraints5 = [
    { key: "email" , required:true, vFn: "email", msg: "Email Address is not valid" },
    { key: "open"  , required:true, vFn: "timeHhMm", msg: "Time format is not valid" },
    { key: "open"  , required:true, vFn: ["notEqualTo", "00:00"], msg: "You can open at midnight" },
    { key: "close" , required:true, cFn: [validateCloseReuse,"open"], msg: "Close time is earlier than opening time (error1)" },
    { key: "close" , required:true, vFn: ["notEqualTo", "01:00"], msg: "You can't close at 1AM" },
    { key: "lastname" , cFn: validateNotForbidden , msg:"Last name not valid" }
  ];


  validateTest = function validate_test( test, validation, data, expected, errors, errorFields ) {
    var result;
    try{
      result =  validator.validate( data, validation );
      test.equal( result, expected );
    }
    catch (error){
      test.equal( error.errors.length, errors, "Number of errors (" + error.errors.length + ") is different than expected (" + errors  + ")"  );
      _.each( error.errorItems, function( field ) {
        test.notEqual( _.indexOf( error.errorItems, field ), -1 , "This field (" + field + ") validated correctly. ");
      });
    }
    test.done();
  };

  exports.automatedTests = {
    "validationContraints1" : function(test){ validateTest(test, testDataSuite, validationConstraints1, false, 3, ["close"]); },
    "validationContraints2" : function(test){ validateTest(test, testDataSuite, validationConstraints2, false, 2, ["close"]); },
    "validationContraints3" : function(test){ validateTest(test, testDataSuite2, validationConstraints3, false, 2, ["close"]); },
    "validationContraints4" : function(test){ validateTest(test, testDataSuite3, validationConstraints3, false, 3, ["close", "lastname"]); },
    "validationContraints5" : function(test){ validateTest(test, testDataSuite3, validationConstraints5, false, 3, ["close", "lastname"]); },
  }

}());