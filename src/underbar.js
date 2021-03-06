(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  	return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	if (n === undefined){ return array[array.length-1];}
  	return n > array.length ? array : array.slice(array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
  	if (Array.isArray(collection)){
  		for(var i = 0; i < collection.length; i++){
  			iterator(collection[i], i, collection);
  		}
  	} else{
  		var keys = Object.keys(collection);
  		for(var i = 0; i < keys.length; i++){
  			iterator(collection[keys[i]], keys[i], collection);
  		}
  	}
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  	var result = [];

  	_.each(collection, function(item){
  		if (test(item)){
  			result.push(item);
  		}
  	});

  	return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {

  	return _.filter(collection, function(item){
  		return !test(item);
  	});
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var counter = {}, result = [];

  	_.each(array, function(item){
  		counter[item] === undefined ? counter[item] = 1: counter[item]++;
  	});

  	if(typeof array[0] === 'number'){
  		_.each(Object.keys(counter), function(str){
  			result.push(Number(str));
  		});
  	} else {
  		result = Object.keys(counter);
  	}

  	return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];

    _.each(collection, function(item, index){
    	result.push(iterator(item, index, collection));
    });

    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
  	var skip = 0;
  	if (arguments.length < 3){
  		accumulator = collection[0];
  		skip = 1;
  	}
  	var memo = accumulator;
    if (typeof collection !== "array"){
      collection = Object.values(collection);
    }

  	for (var i = skip; i < collection.length; i++){
  		memo = iterator(memo, collection[i], i, collection);
  	}

  	return memo;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, test) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(allFound, item) {
      return typeof test === "function" ? !!(test(item) && allFound) : (item === true && allFound);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, test) {
    // TIP: There's a very clever way to re-use every() here.
    return !(_.every(collection, function(item){
    	return typeof test === "function" ? !!(!test(item)) : !(item === true);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	var len = arguments.length;

  	if (len <= 1) {return obj;}

  	for (var idx = 1; idx < len; idx++){
  		var input = arguments[idx];
 		var keys = Object.keys(input);

  		for (var i = 0; i < keys.length; i++){
  			obj[keys[i]] = input[keys[i]];
  		}
  	} 

  	return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	var len = arguments.length;

  	if (len <= 1) {return obj;}

  	for (var idx = 1; idx < len; idx++){
  		var input = arguments[idx];
 		var keys = Object.keys(input);

  		for (var i = 0; i < keys.length; i++){
  			if(obj[keys[i]] === undefined) {obj[keys[i]] = input[keys[i]]};
  		}
  	} 

  	return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  	var memo = function(){
  	  var argList = memo.argList;
  	  var key = Array.prototype.slice.call(arguments).join(', '); 
  	  //Could sort arguments array to double efficiency, if function answer is independent 
  	  //of variable placement as in memoAdd... but generally not a good assumption.
  	  if(argList[key] === undefined) {
  		argList[key] = func.apply(this, arguments);
  	  }
  	  return argList[key];
  	}
  	memo.argList = {};
  	return memo;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  	var LOFarguments = Array.prototype.slice.call(arguments, 2)
  	return setTimeout(function(){
  		return func.apply(this, LOFarguments);
  	}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  	var shuffled = [], len = array.length;
  	var checkRand = {};
  	for (var i = 0; i < len; i++){
  		var randomIdx = Math.floor(len * Math.random());
  		while (checkRand[randomIdx] !== undefined){
  			randomIdx = Math.floor(len * Math.random());
  		}
  		shuffled[i] = array[randomIdx];
  		checkRand[randomIdx] = i;
  	}
  	return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var result = [];
    _.each(collection, function(element){
      if(typeof functionOrKey === 'function'){
        result.push(functionOrKey.apply(element, collection));
      } else {
        result.push(String.prototype[functionOrKey].apply(element, collection));
      }
    });
 
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'function'){
      return collection.sort(function(a,b){return iterator(a) - iterator(b);})
    } else {
      return collection.sort(function(a,b){return a[iterator] - b[iterator];})
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments), result = [], lenArr = [];
    
    if (args.length>1){
      for(var k = 0; k < args.length; k++){
        lenArr.push(args[k].length);
      }
    }
    var len = Math.max.apply(null,lenArr) || 0;

    for (var i = 0; i < args.length; i++){
      result[i] = _.pluck(args, i);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var result = [];
    var flattenCurrentArray = function(array) {
    //because we can't just call flatten with current tests, make a non-underscore function
      _.each(array, function(element) {
        if (typeof(element) !== 'object') {
          result.push(element);
        } else {
          flattenCurrentArray(element);
        }
      });
    };

    flattenCurrentArray(nestedArray);
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var result = [], counter = {};
    var args = Array.prototype.slice.call(arguments);

    _.each(args, function(array){
      _.each(array, function(ele){
        //bug if ele appears greater than once in one array
        counter[ele] = (counter[ele] || 0) +1;
      });
    });

    _.each(counter, function(ele, key){
      if (ele >= args.length){
        result.push(key);
      }
    });

    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1), result = [];
    

    _.each(array, function(element){
      var unique = true;
      for (var i = 0; i < args.length; i++) {
        for (var j = 0; j < args[i].length; j++) {
          element === args[i][j] ? unique = false : null;
        }
      }

      if(unique){
        result.push(element);
      }
    });

    return result;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var args;
    var timeout = null, lastCall = 0;
    var nextScheduledCall = function() {
      lastCall = 0, timeout = null;
      return func.apply(this, args);
    };
    return function() {
      args = arguments;
      var now = new Date().getTime();
      if (!lastCall) {
        lastCall = now;//set to when throttle was last called;
      }
      var remaining = wait - (now - lastCall);
      
      if (remaining > wait || remaining <= 0) {//if wait time is over
        lastCall = now; //reset comparative overators so next wait time is right
        return func.apply(this, args); //& call callback and return its result
      } else if (!timeout) {//if another setTimeout isn't already in line 
        timeout = setTimeout(nextScheduledCall, remaining); //schedule a call for 0ms after the wait period is over
      }
    };//else discard variables with scope
  };
 } ());

