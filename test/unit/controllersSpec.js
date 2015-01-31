describe("myctrl", function() {
  var movie = {
    title: "MIB",
    price: 99.00
  };
  var scope;
  var deferred;
  var movieServiceMock;

  var movieServiceAnswers = function() {
    // Resolve the promise, i.e. define an return value.
    deferred.resolve(movie);
    // Propagate promise resolution to 'then' functions using $apply().
    scope.$apply();
  };

  // Load the module "myapp".
  beforeEach(function() {
    module("myapp");
  });

  // Mock the movieService.
  beforeEach(inject(function($q, movieService) {
    movieServiceMock = movieService;
    // $q is a service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
    // The purpose of the deferred object is to expose the associated promise instance.
    deferred = $q.defer();

    // Use jasmines spyOn to mock the call to getMovie on the movieService
    spyOn(movieServiceMock, "getMovie").and.returnValue(deferred.promise);
  }));

  // Instantiate the controller to be tested.
  beforeEach(inject(function($rootScope, $controller) {
    // Create a new scope
    scope = $rootScope.$new();

    //$controller is a service that is responsible for instantiating controllers.
    $controller("myctrl", {
      $scope: scope
    });
  }));

  it("should write the movieData to the scope after the movieService has answered", function() {
    expect(movieServiceMock.getMovie).toHaveBeenCalled();
    expect(scope.movieData).toBeUndefined();
    movieServiceAnswers();
    expect(scope.movieData).toEqual(movie);
  });

});
