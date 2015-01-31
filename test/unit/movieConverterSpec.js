describe("movieConverter", function() {

  var movie = {
    title: "mib",
    price: 9900
  };

  var movieConverterSUT;

  beforeEach(function() {
    module("myapp");
  });

  beforeEach(inject(function(movieConverter) {
    movieConverterSUT = movieConverter
  }));

  describe("processMovie", function() {
    it("should correcly process a movie", function() {
      expect(movieConverterSUT.processMovie(movie)).toEqual({
        title: "MIB",
        price: 99.00
      });
    });
  });


});
