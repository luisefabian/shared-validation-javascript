(function(){
  "use strict";

  var _ = require("underscore"),
      states = { "AK": 1, "AL": 1, "AR": 1, "AZ": 1, "CA": 1, "CO": 1, "CT": 1, "DC": 1, "DE": 1, "FL": 1, "GA": 1, "HI": 1, "IA": 1, "ID": 1, "IL": 1, "IN": 1, "KS": 1, "KY": 1, "LA": 1, "MA": 1, "MD": 1, "ME": 1, "MI": 1, "MN": 1, "MO": 1, "MS": 1, "MT": 1, "NC": 1, "ND": 1, "NE": 1, "NH": 1, "NJ": 1, "NM": 1, "NV": 1, "NY": 1, "OH": 1, "OK": 1, "OR": 1, "PA": 1, "PR": 1, "RI": 1, "SC": 1, "SD": 1, "TN": 1, "TX": 1, "UT": 1, "VT": 1, "VA": 1, "VI": 1, "WA": 1, "WI": 1, "WV": 1, "WY":1 },
      countries = { "AF": 1, "AX": 1, "AL": 1, "DZ": 1, "AS": 1, "AD": 1, "AO": 1, "AI": 1, "AQ": 1, "AG": 1, "AR": 1, "AM": 1, "AW": 1, "AU": 1, "AT": 1, "AZ": 1, "BS": 1, "BH": 1, "BD": 1, "BB": 1, "BY": 1, "BE": 1, "BZ": 1, "BJ": 1, "BM": 1, "BT": 1, "BO": 1, "BA": 1, "BW": 1, "BV": 1, "BR": 1, "IO": 1, "BN": 1, "BG": 1, "BF": 1, "BI": 1, "KH": 1, "CM": 1, "CA": 1, "CV": 1, "KY": 1, "CF": 1, "TD": 1, "CL": 1, "CN": 1, "CX": 1, "CC": 1, "CO": 1, "KM": 1, "CG": 1, "CD": 1, "CK": 1, "CR": 1, "CI": 1, "HR": 1, "CU": 1, "CY": 1, "CZ": 1, "DK": 1, "DJ": 1, "DM": 1, "DO": 1, "EC": 1, "EG": 1, "SV": 1, "GQ": 1, "ER": 1, "EE": 1, "ET": 1, "FK": 1, "FO": 1, "FJ": 1, "FI": 1, "FR": 1, "GF": 1, "PF": 1, "TF": 1, "GA": 1, "GM": 1, "GE": 1, "DE": 1, "GH": 1, "GI": 1, "GR": 1, "GL": 1, "GD": 1, "GP": 1, "GU": 1, "GT": 1, "GG": 1, "GN": 1, "GW": 1, "GY": 1, "HT": 1, "HM": 1, "VA": 1, "HN": 1, "HK": 1, "HU": 1, "IS": 1, "IN": 1, "ID": 1, "IR": 1, "IQ": 1, "IE": 1, "IM": 1, "IL": 1, "IT": 1, "JM": 1, "JP": 1, "JE": 1, "JO": 1, "KZ": 1, "KE": 1, "KI": 1, "KP": 1, "KR": 1, "KW": 1, "KG": 1, "LA": 1, "LV": 1, "LB": 1, "LS": 1, "LR": 1, "LY": 1, "LI": 1, "LT": 1, "LU": 1, "MO": 1, "MK": 1, "MG": 1, "MW": 1, "MY": 1, "MV": 1, "ML": 1, "MT": 1, "MH": 1, "MQ": 1, "MR": 1, "MU": 1, "YT": 1, "MX": 1, "FM": 1, "MD": 1, "MC": 1, "MN": 1, "ME": 1, "MS": 1, "MA": 1, "MZ": 1, "MM": 1, "NA": 1, "NR": 1, "NP": 1, "NL": 1, "AN": 1, "NC": 1, "NZ": 1, "NI": 1, "NE": 1, "NG": 1, "NU": 1, "NF": 1, "MP": 1, "NO": 1, "OM": 1, "PK": 1, "PW": 1, "PS": 1, "PA": 1, "PG": 1, "PY": 1, "PE": 1, "PH": 1, "PN": 1, "PL": 1, "PT": 1, "PR": 1, "QA": 1, "RE": 1, "RO": 1, "RU": 1, "RW": 1, "BL": 1, "SH": 1, "KN": 1, "LC": 1, "MF": 1, "PM": 1, "VC": 1, "WS": 1, "SM": 1, "ST": 1, "SA": 1, "SN": 1, "RS": 1, "SC": 1, "SL": 1, "SG": 1, "SK": 1, "SI": 1, "SB": 1, "SO": 1, "ZA": 1, "GS": 1, "ES": 1, "LK": 1, "SD": 1, "SR": 1, "SJ": 1, "SZ": 1, "SE": 1, "CH": 1, "SY": 1, "TW": 1, "TJ": 1, "TZ": 1, "TH": 1, "TL": 1, "TG": 1, "TK": 1, "TO": 1, "TT": 1, "TN": 1, "TR": 1, "TM": 1, "TC": 1, "TV": 1, "UG": 1, "UA": 1, "AE": 1, "GB": 1, "US": 1, "UM": 1, "UY": 1, "UZ": 1, "VU": 1, "VE": 1, "VN": 1, "VG": 1, "VI": 1, "WF": 1, "EH": 1, "YE": 1, "ZM": 1, "ZW":1 },
      validate, validateItem, countryCode, creditCardNumber, creditCardExp, creditCardExpYear, email, equalTo,
      greaterThan, greaterThanOrEqual, isNumeric, latLng, lessThan, lessThanOrEqual, notEqualTo, standardPassword,
      stateCode, strongPassword, timeHhMm, zipCode;

  validate = function validate( validation, data ) {
    var self       = this, 
        valid      = true,
        errors     = [],
        errorItems = [];

    _.each( validation, function( itemValidation ) {
      var itemToValidate = itemValidation.key;
      if( !self.validateItem( itemToValidate, itemValidation, data ) ) {
        valid = false;
        errors.push( itemValidation.msg );
        errorItems.push( itemToValidate );
      }
    });
    errorItems = _.uniq( errorItems, false);
    //raise an exception
    if( !valid ) {
      var exceptionObject = {
        errors: errors,
        errorItems: errorItems
      }
      throw exceptionObject;
    }
    return valid;
  };

  validateItem = function validate_item( item, validation, data ) {
    var self    = this, 
        params  = [], 
        cParams = [], 
        vFnParams, 
        cFnParams;

    if( validation.required && !data[item] ) { return false; }
    if( data[item] ) {
      if( validation.hasOwnProperty('vFn') ){
        params[0] = data[item];
        if ( typeof validation.vFn === 'string' && self[validation.vFn] instanceof Function ) {
          if( !self[validation.vFn].apply( self, params) ) {
            return false;
          }
        } else if( validation.vFn instanceof Array &&  self[validation.vFn[0]] instanceof Function ) {
            if ( validation.vFn.length > 1 ) {
              vFnParams = validation.vFn.slice( 1 );
              _.each( vFnParams, function( param ) {
                if( data.hasOwnProperty( param ) ) {
                  params.push( data[param] );
                }
                else{
                  params.push( param );
                }
              });
            }
            if( !self[validation.vFn[0]].apply( self, params) ) {
              return false;
            }
        }
      } 
      if( validation.hasOwnProperty('regEx') && (typeof data[item] === 'string' ) ) {
        if( !( data[item].match( validation.regEx ) ) ){
          return false;
        }
      }
    }
    if( validation.hasOwnProperty('cFn') ){
      cParams[0] = data[item];
      if( validation.cFn instanceof Function ){
        if( !validation.cFn.apply( self, cParams) ) {
          return false;
        }
      } else if( validation.cFn instanceof Array && validation.cFn[0] instanceof Function ){
          if ( validation.cFn instanceof Array && validation.cFn.length > 1 ) {
            cFnParams = validation.cFn.slice( 1 );
            _.each( cFnParams, function( param ) {
              if( data.hasOwnProperty( param ) ) {
                cParams.push( data[param] );
              }
              else{
                cParams.push( param );
              }
            });
          }
          if( !validation.cFn[0].apply( self, cParams) ) {
            return false;
          }
      }
    }
    return true;
  };

  //Validation functions (must return only true or false).

  countryCode = function validate_countryCode( countryCode ){ 
    return (countries.hasOwnProperty( countryCode ) );
  }

  creditCardNumber = function validate_creditcardnumber( number ){
    var digit, n, sum, _i, _len, _ref;
    sum = 0;
    _ref = number.split('').reverse();
    for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
      digit = _ref[n];
      digit = +digit;
      if (n % 2) {
        digit *= 2;
        if (digit < 10) {
          sum += digit;
        } else {
          sum += digit - 9;
        }
      } else {
        sum += digit;
      }
    }
    return (sum % 10 === 0) ;
  };

  creditCardExp = function validate_ccexp( month, year ){
    var pattern = /^\d{2}$/,
        now;
    if( month.match( pattern ) && month <= 12 && this.creditCardExpYear( year ) ){
      now = new Date();
      if( year == now.getFullYear() && month >= now.getMonth()){
        return true;
      } else if( year != now.getFullYear() ){
        return true;
      }
    }
    return false;
  };

  creditCardExpYear = function validate_ccexp_year( year ){
    var pattern = /^\d{4}$/,
        now = new Date();
    return ( ( year.match(pattern) !== null ) && now.getFullYear() <= year );
  };

  email = function validate_email( email ){
    var pattern = /^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return ( email.match( pattern ) !== null );
  };

  equalTo = function validate_equal_to( value1, value2 ){
    return ( value1 === value2 );
  };

  greaterThan = function validate_greater_than( value1, value2 ){
    return (value1 > value2);
  }

   greaterThanOrEqual = function validate_greater_than_equal( value1, value2 ){
    return (value1 >= value2);
  }

  isNumeric = function validate_isnumeric(input) {
    if(typeof input === "number"){
      return true;
    }
    var pattern = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
    var regex = RegExp(pattern);
    return regex.test(input) && input.length>0;
  }

  latLng = function validate_latlng( latlng ){
    return this.isNumeric(latlng);
  };

  lessThan = function validate_less_than( value1, value2 ){
    return (value1 < value2);
  }

   lessThanOrEqual = function validate_less_than_equal( value1, value2 ){
    return (value1 <= value2);
  }

  notEqualTo = function validate_not_equal_to( value1, value2 ){
    return ( value1 !== value2 );
  };

  standardPassword = function validate_standard_password( pw ){
    //At least 3 characters, accepting some special characters.
    var pattern = /^([\w-\.,?!.*]+){3,}$/;
    return ( pw.match(pattern) !== null );
  }

  stateCode = function validate_stateCode( stateCode ){ 
    return ( states.hasOwnProperty( stateCode ) );
  }

  strongPassword = function validate_strong_password( pw ){
    //Uppercase, lowercase, digit and punctuation. At least 6 characters.
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,}$/;
    return ( pw.match(pattern) !== null );
  }
  
  timeHhMm = function validate_Time_HhMm(input){
    var pattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    var regex = RegExp(pattern);
    return regex.test(input);
  }

  zipCode = function validate_zipcode( zipCode ){
    var pattern = /^\d{5}$/;
    if(typeof zipCode === "number"){
      return (zipCode < 99999 && zipCode % 1 === 0);
    }
    return ( zipCode.match( pattern ) !== null );
  };

  module.exports = {
    "validate"          : validate,
    "validateItem"      : validateItem,
    "countryCode"       : countryCode,
    "creditCardNumber"  : creditCardNumber,
    "creditCardExp"     : creditCardExp,
    "creditCardExpYear" : creditCardExpYear,
    "email"             : email,
    "equalTo"           : equalTo,
    "greaterThan"       : greaterThan,
    "greaterThanOrEqual": greaterThanOrEqual,
    "isNumeric"         : isNumeric,
    "latLng"            : latLng ,
    "lessThan"          : lessThan ,
    "lessThanOrEqual"   : lessThanOrEqual,
    "notEqualTo"        : notEqualTo,
    "standardPassword"  : standardPassword,
    "stateCode"         : stateCode,
    "strongPassword"    : strongPassword,
    "timeHhMm"          : timeHhMm,
    "zipCode"           : zipCode
  };

}());