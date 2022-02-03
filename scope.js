(function () {


  describe('Function Exercises', function () {

      var ACTUAL;

      // This resets the value of ACTUAL (to null) before each test is run
      beforeEach(function () {
        ACTUAL = null;
      });

      it('a function has access to its own local scope variables', function () {
        var fn = function () {
          var name = 'inner';
          ACTUAL = name;
        };
        fn();
        expect(ACTUAL === 'inner').to.be.true;
      });

      it('inputs to a function are treated as local scope variables', function () {
        var fn = function (name) {
          ACTUAL = name;
        };
        fn('inner');
        expect(ACTUAL === '???').to.be.true;
      });

      it('a function has access to the variables contained within the same scope that function was created in', function () {
        var name = 'outer';
        var fn = function () {
          ACTUAL = name;
        };
        fn();
        expect(ACTUAL === '???').to.be.true;
      });

      it('a function\'s local scope variables are not available anywhere outside that function', function () {
        var firstFn = function () {
          var localToFirstFn = 'inner';
        };
        firstFn();
        expect(function () {
          ACTUAL = localToFirstFn;
        }).to.throw();
        expect(ACTUAL === '???').to.be.true;
      });

      it('a function\'s local scope variables are not available anywhere outside that function, regardless of the context it\'s called in', function () {
        var firstFn = function () {
          var localToFirstFn = 'first';
          // Although false, it might seem reasonable to think that the secondFn (which mentions the localToFirstFn variable), should have access to the localToFirstFn variable, since it's being called here from within the scope where that variable is declared.
          secondFn();
        };
        var secondFn = function () {
          ACTUAL = localToFirstFn;
        };
        expect(function () {
          // of course, calling the secondFn should throw an error in this case, since secondFn does not have access to the localToFirstFn variable
          secondFn();
        }).to.throw();
        expect(function () {
          // in addition, calling the firstFn (which in turn calls the secondFn) should also throw, since it the calling context of secondFn has no influence over its scope access rules
          firstFn();
        }).to.throw();
        expect(ACTUAL === '???').to.be.true;
      });

      it('if an inner and an outer variable share the same name, and the name is referenced in the inner scope, the inner scope variable masks the variable from the outer scope with the same name. This renders the outer scope variables inaccassible from anywhere within the inner function block', function () {
        var sameName = 'outer';
        var fn = function () {
          var sameName = 'inner';
          ACTUAL = sameName;
        };
        fn();
        expect(ACTUAL === '???').to.be.true;
      });

      
