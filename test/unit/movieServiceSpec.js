describe("movieService", function() {
  // The system under test.
  var movieService;

  // Mock of the httpBackend.
  var $httpBackend;

  // Mocked return value of the httpBackend.
  var movie = {
    title: "mib",
    price: 9900
  };

  // Mock of the movieConverter.
  var movieConverter;

  // Mocked return value of the movieConverter.
  var convertedMovie = {
    title: "MIB",
    price: 99.00
  };

  // Load the module "myapp".
  beforeEach(function() {
    module("myapp");
  });

  // Mock the httpBackend.
  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET("/movie").respond(movie);
  }));

  // Mock the movieConverter
  beforeEach(inject(function(_movieConverter_) {
    movieConverter = _movieConverter_;
    spyOn(movieConverter, "convertMovie").and.returnValue(convertedMovie);
  }));

  // inject the movieService to be tested.
  beforeEach(inject(function(_movieService_) {
    movieService = _movieService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("getMovie()", function() {
    it("should call the movieConverter with the http response", function() {
      var resultMovie;
      var promise = movieService.getMovie();
      promise.then(function(_movie_) {
        resultMovie = _movie_;
      });
      expect(resultMovie).toBeUndefined();
      expect(movieConverter.convertMovie).not.toHaveBeenCalledWith(movie);

      $httpBackend.flush();
      expect(movieConverter.convertMovie).toHaveBeenCalledWith(movie);

      expect(resultMovie).toEqual(convertedMovie);
    });
  });

});
