describe("movieConverter", function() {
    // The system under test.
  var movieConverter;

  // The input for the movieConverter.
  var movie = {
    title: "mib",
    price: 9900
  };

  // The expected output of the movieConverter.
  var convertedMovie = {
    title: "MIB",
    price: 99.00
  };

  // Load the module "myapp".
  beforeEach(function() {
    module("myapp");
  });

  // Inject the movieConverter to be tested.
  beforeEach(inject(function(_movieConverter_) {
    movieConverter = _movieConverter_;
  }));

  describe("convertMovie()", function() {
    it("should correcly convert a movie", function() {
      expect(movieConverter.convertMovie(movie)).toEqual(convertedMovie);
    });
  });

});
