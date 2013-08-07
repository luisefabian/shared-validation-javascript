#Validation Library
This library has been built with the idea of being able to have a common, automated and standarized way to validate data in front-end applications and also in the back-end side.
There are lots of ways to improve the validation that is there right now, so pull request and suggestions are welcome!
##How it works
Validation.js has a bunch of functions to validate a concrete piece of information in a standard way, but it also has a ``validate`` function which can take an object which contains the data to validate and an array with validations and iterate through the data to validate it in different ways.
Each element of the validation array is an **object** that will define how the data will be validated. It can combine the different options but if one of them fails it will skip to the next validation.

You can use several libraries to share code like "browserify", or you can refactor it to be node-independent.

###Validator Object

Executing a concrete validation function will return either ``true``or ``false``. When the function ``validate``is executed it will also return ``true``or ``false`` but it will also set some properties in the validator object.
-valid: Boolean which contains the result of invoking ``validate``
-errors: Array of error messages.
-errorItems: Array of keys that didn't pass validation.

###Data Object

Simple object which contains the data that will be evaluated

``  { name: "Luis",  email: "hello@luisefabian.com", words: [ "Developer" , "Node.js"] } ... ``

###Validation Array

Each element of the array must be an **object** which is composed by:

- key: __REQUIRED__ This matches the validation rules with the data that must be evaluated.
- msg: __REQUIRED__ Contains the error message that will be used to identify this error.
- required: ``true | false``. Checks if ``dp`` is on the data object.
- regEx : Compares the dp using a `` data[dp].match(regEx) ``
- vFn: Invokes one of the predefined functions that _Validation.js_ has. By default each function will receive the dp value as the first argument.
- cFn: Custom **Function** to be invoked and customize the validation as needed. It can have just one Function object or an array with a Funcion in the 0 index and the parameters to invoke that function in the rest of the array. As in vFn, each param can be a key from the data object or a literal value. It also can reuse functions from the Validation.js file because it will be executed within that context.

####Vfn

It can be an array or just a string. It will call one of the predefined functions of the validation class. If is just a string the function will be invoked with one param. If its an array it will have the function name in the first position and the parameters to invoke in the rest of the array. Each param can be a data key name or a literal value.

####Data object
``{email:"test@luisefabian.com" open:"02:00", close:"01:00"}``

The validation object could be
``{ key:"open", vFn:["greaterThan", "close"],  msg:"You must close later than when you open."}``

or

``{ key:"open", vFn:["greaterThan", "00:00"],  msg:"You can't open at midnight."}``

Vfn also can be just a String 

``{ key:"email", vFn:"email",  msg:"Your email is not valid."}``


##Priority
If a validation rule combines more than one functionalities, each one will be evaluated in order, unless one of them fails. In this case it will immediately add the error message associated to the validator object.
Validation rules will be executed following this order.

1. vFn (only evaluated if there is a value in the data object)
2. regEx (only evaluated if there is a value in the data object)
3. cFn (is always evaluated)


##Usage examples

 ``[{ key: "name", required:true, msg: "Name cannot be empty" }]``
 This rule evaluates if the name is not "", undefined or any false value in JS.
 
 ``[{ key: "name", vFn:["notEqualTo", "forbidden"], msg: "You chose a wrong name" }]``
 This rule will evaluate if the name is distinct to "forbidden".
 
 ``[{ key: "name", vFn:["notEqualTo", "forbidden"], regex: /^\w{3,}$/, msg: "Name cannot be empty and must have at least 3 characters" }]``

This rule will FIRST evaluate if the value is distinct to forbidden. If it pass the first validation it will execute the regex comparison.
If it doesn't it will return the error without evaluating more statements.

###Different error messages
We can evaluate a key and return a different error depending on what failed.

 ``[{ key: "name", vFn:["notEqualTo", "forbidden"], msg: "Your name is forbidden" }]``

 ``[{ key: "name",  regex: /^\w{3,}$/, msg: "Your name must have at least 3 characters" }]``

Here we will get a different error (or both) depending what failed). On the other hand "errorItems" will only contain ["name"];

##Using predefined functions
We can call functions available in the Validation object.
####Data Object
``{ open : "02:00", close: "01:00"}``
####Validation Rules
``[{ key:"open", vFn: "timeHhMm", msg: "Open time is not valid"}]``
This rule will invoke a function from validation prorotype called timeHhMm passing as first and only parameter the value "02:00"
``[{ key:"open", vFn: ["lessThan", "close"],  msg: "Open time must occur prior to closing! "}]``
This rule will invoke lessThan function passing as params ´´"02:00", "01:00"´´
``var validateTimes = function (){
    return function check_times( open, close ){
      return this.greaterThan(close,open);
    };
  }();``
This variable has a function wrapped that will be reuse some of the main Validation object functins, but it could do whatever it needs.
``[{ key:"open", vFn: "timeHhMm", cFn: [validateTimes, "close"] , msg: "Open time is not valid"}]``
This rule will first execute the timeHhMm function and then will execute the custom code that we attached to the variable "validateTimes"
