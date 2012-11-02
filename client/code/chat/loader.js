var objectName = function(path) {
  return Ember.String.classify(path.split(/[\/\.]/)[2]);
};

var importModules = function(app, directory, modules) {
  modules = modules || [];

  modules.forEach(function(path) {
    var module    = objectName(path),
        exported  = require(path),
        obj       = exported[module];

      Ember.assert("Module "+ module +" could not be found", obj);

      app[module] = obj;
  });
};

var getComponents = function(paths) {
  var filtered = {},
      modulePaths = _.keys(require.modules);

  var components = _.groupBy(modulePaths, function(path) {
    return path.split('/')[1];
  });

  _.each(paths, function(component) {
    filtered[component] = components[component];
  });

  return filtered;
};

exports.load = function(app, paths) {
  var components  = getComponents(paths);

  _.each(components, function(components, path) {
    importModules(app, path, components);
  });
}
