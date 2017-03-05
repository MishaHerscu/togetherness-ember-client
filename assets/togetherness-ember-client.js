"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('togetherness-ember-client/ajax/service', ['exports', 'ember', 'ember-ajax/services/ajax', 'togetherness-ember-client/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _togethernessEmberClientConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _togethernessEmberClientConfigEnvironment['default'].apiHost,
    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('togetherness-ember-client/app', ['exports', 'ember', 'togetherness-ember-client/resolver', 'ember-load-initializers', 'togetherness-ember-client/config/environment'], function (exports, _ember, _togethernessEmberClientResolver, _emberLoadInitializers, _togethernessEmberClientConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _togethernessEmberClientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _togethernessEmberClientConfigEnvironment['default'].podModulePrefix,
    Resolver: _togethernessEmberClientResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _togethernessEmberClientConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('togetherness-ember-client/application/adapter', ['exports', 'ember', 'active-model-adapter', 'togetherness-ember-client/config/environment'], function (exports, _ember, _activeModelAdapter, _togethernessEmberClientConfigEnvironment) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _togethernessEmberClientConfigEnvironment['default'].apiHost,
    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('togetherness-ember-client/application/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
        this.store.unloadAll();
      },

      error: function error(reason) {
        var unauthorized = reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('togetherness-ember-client/application/serializer', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define("togetherness-ember-client/application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "my-application", [], ["signOut", "signOut"], ["loc", [null, [1, 0], [2, 21]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/attendance/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    trip: (0, _emberDataRelationships.belongsTo)('trip'),
    user: (0, _emberDataRelationships.belongsTo)('user')
  });
});
define('togetherness-ember-client/attendances/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('trip');
    }
  });
});
define("togetherness-ember-client/attendances/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 2
            },
            "end": {
              "line": 8,
              "column": 2
            }
          },
          "moduleName": "togetherness-ember-client/attendances/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "attendance.name", ["loc", [null, [7, 8], [7, 27]]]]],
        locals: ["attendance"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/attendances/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Upcoming Trips");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [6]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [6, 10], [6, 15]]]]], [], 0, null, ["loc", [null, [6, 2], [8, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/attraction-suggestion/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    attraction: (0, _emberDataRelationships.belongsTo)('attraction'),
    user: (0, _emberDataRelationships.belongsTo)('user')
  });
});
define('togetherness-ember-client/attraction-suggestions/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

    model: function model() {

      var errorReturn = function errorReturn(error) {
        return _ember['default'].RSVP.hash({
          attractions: [],
          recBool: false,
          error: error
        });
      };

      return this.get('store').findAll('attraction-suggestion').then(function (result) {
        var allAttractions = result.toArray();
        var recBool = allAttractions.length > 0 ? true : false;
        var maxAttractionIndex = Math.min(20, allAttractions.length);
        try {
          var sampleAttractions = allAttractions.sort(function () {
            return 0.5 - Math.random();
          }).slice(0, maxAttractionIndex);
          try {
            var _ret = (function () {
              var attractions = [];
              sampleAttractions.forEach(function (suggestion) {
                attractions.push(suggestion.get('attraction'));
              });
              return {
                v: _ember['default'].RSVP.hash({
                  attractions: attractions,
                  recBool: recBool
                })
              };
            })();

            if (typeof _ret === 'object') return _ret.v;
          } catch (error) {
            return errorReturn(error);
          }
        } catch (error) {
          return errorReturn(error);
        }
      });
    },

    actions: {
      createTrip: function createTrip(attraction) {
        this.transitionTo('plan-trip', attraction);
      }
    }
  });
});
define("togetherness-ember-client/attraction-suggestions/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.5.1",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 8,
                    "column": 6
                  },
                  "end": {
                    "line": 12,
                    "column": 6
                  }
                },
                "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("        ");
                dom.appendChild(el0, el1);
                var el1 = dom.createComment("");
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var morphs = new Array(1);
                morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
                return morphs;
              },
              statements: [["inline", "attraction-suggestion", [], ["attraction", ["subexpr", "@mut", [["get", "attraction", ["loc", [null, [10, 21], [10, 31]]]]], [], []], "createTrip", "createTrip"], ["loc", [null, [9, 8], [11, 35]]]]],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 4
                },
                "end": {
                  "line": 13,
                  "column": 4
                }
              },
              "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["block", "if", [["get", "attraction.medium_image_url", ["loc", [null, [8, 12], [8, 39]]]]], [], 0, null, ["loc", [null, [8, 6], [12, 13]]]]],
            locals: [],
            templates: [child0]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 14,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "attraction.description", ["loc", [null, [7, 10], [7, 32]]]]], [], 0, null, ["loc", [null, [7, 4], [13, 11]]]]],
          locals: ["attraction"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 15,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "model.attractions", ["loc", [null, [6, 10], [6, 27]]]]], [], 0, null, ["loc", [null, [6, 2], [14, 11]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 17,
                "column": 39
              },
              "end": {
                "line": 17,
                "column": 79
              }
            },
            "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("selecting more");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 15,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createTextNode("\n    Sorry! No recommendations yet. Try ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" interesting adventures so we can learn more about your preferences.\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["attractions"], [], 0, null, ["loc", [null, [17, 39], [17, 91]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/attraction-suggestions/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Recommended Events");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "model.recBool", ["loc", [null, [5, 6], [5, 19]]]]], [], 0, 1, ["loc", [null, [5, 0], [19, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('togetherness-ember-client/attraction-tag/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    attraction: (0, _emberDataRelationships.belongsTo)('attraction'),
    tag: (0, _emberDataRelationships.belongsTo)('tag')
  });
});
define('togetherness-ember-client/attraction/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  exports['default'] = _emberData['default'].Model.extend({
    eventful_id: _emberData['default'].attr('string'),
    // city_id: DS.attr('string'),
    city_name: _emberData['default'].attr('string'),
    country_name: _emberData['default'].attr('string'),
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    owner: _emberData['default'].attr('string'),
    db_start_time: _emberData['default'].attr('string'),
    db_stop_time: _emberData['default'].attr('string'),
    event_date: _emberData['default'].attr('string'),
    event_time: _emberData['default'].attr('string'),
    event_time_zone: _emberData['default'].attr('string'),
    all_day: _emberData['default'].attr('string'),
    venue_id: _emberData['default'].attr('string'),
    venue_name: _emberData['default'].attr('string'),
    venue_address: _emberData['default'].attr('string'),
    postal_code: _emberData['default'].attr('string'),
    venue_url: _emberData['default'].attr('string'),
    geocode_type: _emberData['default'].attr('string'),
    latitude: _emberData['default'].attr('string'),
    longitude: _emberData['default'].attr('string'),
    image_information: _emberData['default'].attr('string'),
    medium_image_url: _emberData['default'].attr('string'),

    city: (0, _emberDataRelationships.belongsTo)('city'),

    attraction_tags: (0, _emberDataRelationships.hasMany)('attraction_tag', {
      inverse: 'attraction'
    }),
    attraction_suggestions: (0, _emberDataRelationships.hasMany)('attraction_suggestion', {
      inverse: 'attraction'
    })
  });
});
define('togetherness-ember-client/attractions/route', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Route.extend({

    credentials: (0, _emberLocalStorage.storageFor)('auth'),

    model: function model() {
      return this.get('store').findAll('attraction').then(function (result) {
        return result.toArray().sort(function () {
          return 0.5 - Math.random();
        }).slice(0, 50);
      });
    },

    actions: {
      likeAttraction: function likeAttraction(attraction) {
        var user_attraction = {
          user_id: this.get('credentials.id'),
          attraction_id: Number(attraction.id),
          like: true
        };
        var attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
        attraction_rating.save();
      },
      dislikeAttraction: function dislikeAttraction(attraction) {
        var user_attraction = {
          user_id: this.get('credentials.id'),
          attraction_id: Number(attraction.id),
          like: false
        };
        var attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
        attraction_rating.save();
      }
    }
  });
});
define("togetherness-ember-client/attractions/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 7,
                  "column": 4
                },
                "end": {
                  "line": 12,
                  "column": 4
                }
              },
              "moduleName": "togetherness-ember-client/attractions/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("      ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "attraction-event", [], ["attraction", ["subexpr", "@mut", [["get", "attraction", ["loc", [null, [9, 19], [9, 29]]]]], [], []], "likeAttraction", "likeAttraction", "dislikeAttraction", "dislikeAttraction"], ["loc", [null, [8, 6], [11, 47]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 6,
                "column": 2
              },
              "end": {
                "line": 13,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/attractions/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "attraction.medium_image_url", ["loc", [null, [7, 10], [7, 37]]]]], [], 0, null, ["loc", [null, [7, 4], [12, 11]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/attractions/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "attraction.description", ["loc", [null, [6, 8], [6, 30]]]]], [], 0, null, ["loc", [null, [6, 2], [13, 9]]]]],
        locals: ["attraction"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/attractions/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Set Interests");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [5, 8], [5, 13]]]]], [], 0, null, ["loc", [null, [5, 0], [14, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/auth/service', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            givenname: credentials.givenname,
            surname: credentials.surname,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
        _this.get('credentials').set('givenname', result.user.givenname);
        _this.get('credentials').set('surname', result.user.surname);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    },

    submitProfileEdits: function submitProfileEdits(credentials) {
      return this.get('ajax').patch('/users/' + this.get('credentials.id'), {
        data: {
          credentials: {
            givenname: credentials.get('givenname'),
            surname: credentials.get('surname'),
            email: credentials.get('email')
          }
        }
      });
    },

    deleteProfile: function deleteProfile() {
      var _this3 = this;

      return this.get('ajax').del('/users/' + this.get('credentials.id'))['finally'](function () {
        return _this3.get('credentials').reset();
      });
    }

  });
});
define('togetherness-ember-client/auth/storage', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define('togetherness-ember-client/change-password/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      reset: function reset() {
        this.transitionTo('index');
      }
    }
  });
});
define("togetherness-ember-client/change-password/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/change-password/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-10 col-xs-offset-1 white-background-div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createTextNode("Change Password");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        return morphs;
      },
      statements: [["inline", "change-password-form", [], ["submit", "changePassword", "reset", "reset"], ["loc", [null, [4, 2], [6, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/cities/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('city').then(function (result) {
        var resultArray = result.toArray();
        var filteredArray = [];
        resultArray.forEach(function (city) {
          var newCity = city;
          newCity.attractions = city.get('attractions').toArray().filter(function (attraction) {
            if (attraction.medium_image_url) {
              return true;
            }
          }).sort(function () {
            return 0.5 - Math.random();
          }).slice(0, 2);
          filteredArray.push(newCity);
        });
        return filteredArray;
      });
    }
  });
});
define("togetherness-ember-client/cities/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 18,
                  "column": 6
                }
              },
              "moduleName": "togetherness-ember-client/cities/template.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("        ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["inline", "city-attraction", [], ["attraction", ["subexpr", "@mut", [["get", "attraction", ["loc", [null, [17, 21], [17, 31]]]]], [], []]], ["loc", [null, [16, 8], [17, 33]]]]],
            locals: ["attraction"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 2
              },
              "end": {
                "line": 21,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/cities/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "col-xs-12");
            var el2 = dom.createTextNode("\n\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("br");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n\n");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(element0, 1, 1);
            morphs[1] = dom.createMorphAt(element0, 5, 5);
            return morphs;
          },
          statements: [["inline", "city-destination", [], ["city", ["subexpr", "@mut", [["get", "city", ["loc", [null, [11, 13], [11, 17]]]]], [], []]], ["loc", [null, [10, 6], [11, 19]]]], ["block", "each", [["get", "city.attractions", ["loc", [null, [15, 14], [15, 30]]]]], [], 0, null, ["loc", [null, [15, 6], [18, 15]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 22,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/cities/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "city.name", ["loc", [null, [7, 8], [7, 17]]]]], [], 0, null, ["loc", [null, [7, 2], [21, 9]]]]],
        locals: ["city"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/cities/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Available Cities");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [6, 8], [6, 13]]]]], [], 0, null, ["loc", [null, [6, 0], [22, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/city/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),

    attractions: (0, _emberDataRelationships.hasMany)('attraction'),
    trips: (0, _emberDataRelationships.hasMany)('trip')
  });
});

// import { belongsTo } from 'ember-data/relationships';
define('togetherness-ember-client/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'togetherness-ember-client/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _togethernessEmberClientConfigEnvironment) {

  var name = _togethernessEmberClientConfigEnvironment['default'].APP.name;
  var version = _togethernessEmberClientConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('togetherness-ember-client/components/attraction-event/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNameBindings: 'hiddenAttraction:hidden',
    hiddenAttraction: false,

    attractionEvents: {},

    actions: {
      closeAttraction: function closeAttraction() {
        this.toggleProperty('hiddenAttraction');
      },
      likeAttraction: function likeAttraction() {
        this.sendAction('likeAttraction', this.get('attraction'));
        this.toggleProperty('hiddenAttraction');
      },
      dislikeAttraction: function dislikeAttraction() {
        this.sendAction('dislikeAttraction', this.get('attraction'));
        this.toggleProperty('hiddenAttraction');
      }
    }
  });
});
define("togetherness-ember-client/components/attraction-event/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 55,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/attraction-event/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-card col-xs-5");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "button");
        dom.setAttribute(el3, "class", "close tile-close-button");
        var el4 = dom.createTextNode("×\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "col-xs-8");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "class", "col-xs-4");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h6");
        var el3 = dom.createTextNode("Details");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table table-bordered");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("City");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Start Time");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Venue");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createElement("a");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Address");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Description");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "class", "event-card-more");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("Details");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "btn btn-success");
        var el3 = dom.createTextNode("\n    Yes!\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "btn btn-danger");
        var el3 = dom.createTextNode("\n    Meh\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [5]);
        var element4 = dom.childAt(element0, [5, 1]);
        var element5 = dom.childAt(element4, [7, 3, 0]);
        var element6 = dom.childAt(element0, [7]);
        var element7 = dom.childAt(element0, [9]);
        var morphs = new Array(12);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
        morphs[2] = dom.createAttrMorph(element3, 'src');
        morphs[3] = dom.createMorphAt(dom.childAt(element4, [1, 3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [3, 3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [5, 3]), 0, 0);
        morphs[6] = dom.createAttrMorph(element5, 'href');
        morphs[7] = dom.createMorphAt(element5, 0, 0);
        morphs[8] = dom.createMorphAt(dom.childAt(element4, [9, 3]), 0, 0);
        morphs[9] = dom.createMorphAt(dom.childAt(element4, [11, 3, 3]), 1, 1);
        morphs[10] = dom.createElementMorph(element6);
        morphs[11] = dom.createElementMorph(element7);
        return morphs;
      },
      statements: [["element", "action", ["closeAttraction"], [], ["loc", [null, [5, 12], [5, 40]]]], ["content", "attraction.title", ["loc", [null, [7, 25], [7, 45]]]], ["attribute", "src", ["get", "attraction.medium_image_url", ["loc", [null, [8, 32], [8, 59]]]]], ["content", "attraction.city_name", ["loc", [null, [15, 12], [15, 36]]]], ["content", "attraction.event_date", ["loc", [null, [19, 12], [19, 37]]]], ["content", "attraction.event_time", ["loc", [null, [23, 12], [23, 37]]]], ["attribute", "href", ["get", "attraction.venue_url", ["loc", [null, [27, 22], [27, 42]]]]], ["content", "attraction.venue_name", ["loc", [null, [27, 45], [27, 70]]]], ["content", "attraction.venue_address", ["loc", [null, [31, 12], [31, 40]]]], ["content", "attraction.description", ["loc", [null, [38, 12], [38, 38]]]], ["element", "action", ["likeAttraction"], [], ["loc", [null, [46, 10], [46, 37]]]], ["element", "action", ["dislikeAttraction"], [], ["loc", [null, [51, 10], [51, 40]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/attraction-suggestion/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNameBindings: 'hiddenAttraction:hidden',
    hiddenAttraction: false,

    attractionEvents: {},

    actions: {
      closeAttraction: function closeAttraction() {
        this.toggleProperty('hiddenAttraction');
      },
      createTrip: function createTrip() {
        this.sendAction('createTrip', this.get('attraction.id'));
      }
    }
  });
});
define("togetherness-ember-client/components/attraction-suggestion/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/attraction-suggestion/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-card col-xs-5");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "button");
        dom.setAttribute(el3, "class", "close tile-close-button");
        var el4 = dom.createTextNode("×\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3, "class", "col-xs-8");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "class", "col-xs-4");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h6");
        var el3 = dom.createTextNode("Details");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table table-bordered");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("City");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Start Time");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Venue");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        var el6 = dom.createElement("a");
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Address");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "25%");
        var el6 = dom.createTextNode("Description");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "75%");
        dom.setAttribute(el5, "class", "event-card-more");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("Details");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "style", "text-align: center; margin-bottom: 5px;");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-primary");
        dom.setAttribute(el3, "style", "text-align: center; align: center;");
        var el4 = dom.createTextNode("\n      Plan Adventure!\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [5]);
        var element4 = dom.childAt(element0, [5, 1]);
        var element5 = dom.childAt(element4, [7, 3, 0]);
        var element6 = dom.childAt(element0, [7, 1]);
        var morphs = new Array(11);
        morphs[0] = dom.createElementMorph(element2);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [3]), 0, 0);
        morphs[2] = dom.createAttrMorph(element3, 'src');
        morphs[3] = dom.createMorphAt(dom.childAt(element4, [1, 3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element4, [3, 3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element4, [5, 3]), 0, 0);
        morphs[6] = dom.createAttrMorph(element5, 'href');
        morphs[7] = dom.createMorphAt(element5, 0, 0);
        morphs[8] = dom.createMorphAt(dom.childAt(element4, [9, 3]), 0, 0);
        morphs[9] = dom.createMorphAt(dom.childAt(element4, [11, 3, 3]), 1, 1);
        morphs[10] = dom.createElementMorph(element6);
        return morphs;
      },
      statements: [["element", "action", ["closeAttraction"], [], ["loc", [null, [5, 12], [5, 40]]]], ["content", "attraction.title", ["loc", [null, [7, 25], [7, 45]]]], ["attribute", "src", ["get", "attraction.medium_image_url", ["loc", [null, [8, 32], [8, 59]]]]], ["content", "attraction.city_name", ["loc", [null, [15, 24], [15, 48]]]], ["content", "attraction.event_date", ["loc", [null, [19, 24], [19, 49]]]], ["content", "attraction.event_time", ["loc", [null, [23, 24], [23, 49]]]], ["attribute", "href", ["get", "attraction.venue_url", ["loc", [null, [27, 34], [27, 54]]]]], ["content", "attraction.venue_name", ["loc", [null, [27, 57], [27, 82]]]], ["content", "attraction.venue_address", ["loc", [null, [31, 24], [31, 52]]]], ["content", "attraction.description", ["loc", [null, [38, 12], [38, 38]]]], ["element", "action", ["createTrip"], [], ["loc", [null, [47, 12], [47, 35]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/change-password-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
        this.sendAction('reset');
      }
    }
  });
});
define("togetherness-ember-client/components/change-password-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 30,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/change-password-form/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-group col-xs-4");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "previous");
        var el4 = dom.createTextNode("Old Password");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "form-group col-xs-4");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "next");
        var el4 = dom.createTextNode("New Password");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "submit");
        dom.setAttribute(el2, "class", "btn btn-primary");
        var el3 = dom.createTextNode("\n    Change Password\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "btn btn-default");
        var el3 = dom.createTextNode("\n    Cancel\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element1, [3]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "password", "class", "form-control", "id", "previous", "placeholder", "Old password", "value", ["subexpr", "@mut", [["get", "passwords.previous", ["loc", [null, [8, 18], [8, 36]]]]], [], []]], ["loc", [null, [4, 4], [8, 38]]]], ["inline", "input", [], ["type", "password", "class", "form-control", "id", "next", "placeholder", "New password", "value", ["subexpr", "@mut", [["get", "passwords.next", ["loc", [null, [17, 18], [17, 32]]]]], [], []]], ["loc", [null, [13, 4], [17, 34]]]], ["element", "action", ["submit"], [], ["loc", [null, [22, 48], [22, 67]]]], ["element", "action", ["reset"], [], ["loc", [null, [26, 34], [26, 52]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/city-attraction/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNameBindings: 'hiddenAttraction:hidden',
    hiddenAttraction: false,

    attractionEvents: {},

    actions: {}
  });
});
define("togetherness-ember-client/components/city-attraction/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/city-attraction/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-card col-xs-5");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h5");
        dom.setAttribute(el3, "class", "col-xs-8");
        var el4 = dom.createElement("strong");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("img");
        dom.setAttribute(el3, "class", "col-xs-4");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("When: ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(", ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3, "class", "event-card-more");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("Details");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element0, [7]);
        var element4 = dom.childAt(element3, [1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 0]), 0, 0);
        morphs[1] = dom.createAttrMorph(element2, 'src');
        morphs[2] = dom.createMorphAt(element4, 1, 1);
        morphs[3] = dom.createMorphAt(element4, 3, 3);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [3, 3]), 1, 1);
        return morphs;
      },
      statements: [["content", "attraction.title", ["loc", [null, [3, 33], [3, 53]]]], ["attribute", "src", ["get", "attraction.medium_image_url", ["loc", [null, [4, 32], [4, 59]]]]], ["content", "attraction.event_time", ["loc", [null, [11, 13], [11, 38]]]], ["content", "attraction.event_date", ["loc", [null, [11, 40], [11, 65]]]], ["content", "attraction.description", ["loc", [null, [15, 8], [15, 34]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/city-destination/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define("togetherness-ember-client/components/city-destination/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/city-destination/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h5");
        var el2 = dom.createTextNode("Example Attractions:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 0, 0);
        return morphs;
      },
      statements: [["content", "city.name", ["loc", [null, [1, 4], [1, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/date-picker', ['exports', 'ember', 'ember-cli-datepicker/components/date-picker'], function (exports, _ember, _emberCliDatepickerComponentsDatePicker) {
  exports['default'] = _emberCliDatepickerComponentsDatePicker['default'];
});
define('togetherness-ember-client/components/disqus-comment-count', ['exports', 'ember-disqus/components/disqus-comment-count'], function (exports, _emberDisqusComponentsDisqusCommentCount) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusComponentsDisqusCommentCount['default'];
    }
  });
});
define('togetherness-ember-client/components/disqus-comments', ['exports', 'ember-disqus/components/disqus-comments'], function (exports, _emberDisqusComponentsDisqusComments) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusComponentsDisqusComments['default'];
    }
  });
});
define('togetherness-ember-client/components/edit-profile/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],
    auth: _ember['default'].inject.service(),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      submit: function submit() {
        this.sendAction('submitProfileEdits', this.get('credentials'));
      },

      cancel: function cancel() {
        this.sendAction('cancelProfileEdits');
      }
    }
  });
});
define("togetherness-ember-client/components/edit-profile/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 33,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/components/edit-profile/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-xs-8");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          var el3 = dom.createElement("hr");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3, "type", "submit");
          dom.setAttribute(el3, "class", "btn btn-primary");
          var el4 = dom.createTextNode("\n        Submit\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("button");
          dom.setAttribute(el3, "type", "cancel");
          dom.setAttribute(el3, "class", "btn btn-danger");
          var el4 = dom.createTextNode("\n        Cancel\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [7]);
          var element2 = dom.childAt(element1, [3]);
          var element3 = dom.childAt(element1, [10]);
          var element4 = dom.childAt(element3, [1]);
          var element5 = dom.childAt(element3, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          morphs[2] = dom.createMorphAt(element2, 1, 1);
          morphs[3] = dom.createMorphAt(element2, 3, 3);
          morphs[4] = dom.createMorphAt(element2, 5, 5);
          morphs[5] = dom.createElementMorph(element4);
          morphs[6] = dom.createElementMorph(element5);
          return morphs;
        },
        statements: [["content", "credentials.givenname", ["loc", [null, [3, 4], [3, 29]]]], ["content", "credentials.surname", ["loc", [null, [3, 30], [3, 53]]]], ["inline", "givenname-input", [], ["givenname", ["subexpr", "@mut", [["get", "credentials.givenname", ["loc", [null, [13, 18], [13, 39]]]]], [], []]], ["loc", [null, [12, 6], [13, 41]]]], ["inline", "surname-input", [], ["surname", ["subexpr", "@mut", [["get", "credentials.surname", ["loc", [null, [15, 16], [15, 35]]]]], [], []]], ["loc", [null, [14, 6], [15, 37]]]], ["inline", "email-input", [], ["email", ["subexpr", "@mut", [["get", "credentials.email", ["loc", [null, [17, 14], [17, 31]]]]], [], []]], ["loc", [null, [16, 6], [17, 33]]]], ["element", "action", ["submit"], [], ["loc", [null, [25, 52], [25, 71]]]], ["element", "action", ["cancel"], [], ["loc", [null, [28, 51], [28, 70]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 34,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/edit-profile/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isAuthenticated", ["loc", [null, [1, 6], [1, 21]]]]], [], 0, null, ["loc", [null, [1, 0], [33, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/components/email-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("togetherness-ember-client/components/email-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/email-input/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "email");
        var el2 = dom.createTextNode("Email");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "email", "id", "email", "placeholder", "Email", "value", ["subexpr", "@mut", [["get", "email", ["loc", [null, [5, 14], [5, 19]]]]], [], []]], ["loc", [null, [2, 0], [5, 21]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/ember-inline-edit', ['exports', 'ember-inline-edit/components/ember-inline-edit'], function (exports, _emberInlineEditComponentsEmberInlineEdit) {
  exports['default'] = _emberInlineEditComponentsEmberInlineEdit['default'];
});
define('togetherness-ember-client/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('togetherness-ember-client/components/givenname-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("togetherness-ember-client/components/givenname-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/givenname-input/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "email");
        var el2 = dom.createTextNode("First Name");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "id", "givenname", "placeholder", "First Name", "value", ["subexpr", "@mut", [["get", "givenname", ["loc", [null, [5, 14], [5, 23]]]]], [], []]], ["loc", [null, [2, 0], [5, 25]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/hamburger-menu/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define("togetherness-ember-client/components/hamburger-menu/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/hamburger-menu/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "sr-only");
        var el2 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "icon-bar");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "icon-bar");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n  ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "icon-bar");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/my-application/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    credentials: _ember['default'].computed.alias('auth.credentials'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define("togetherness-ember-client/components/my-application/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 12
              },
              "end": {
                "line": 9,
                "column": 41
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Profile");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 39
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("People");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 12
              },
              "end": {
                "line": 11,
                "column": 51
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Set Interests");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 12
              },
              "end": {
                "line": 12,
                "column": 64
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Recommendations");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 13,
                "column": 12
              },
              "end": {
                "line": 13,
                "column": 45
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("My Adventures");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 14,
                "column": 12
              },
              "end": {
                "line": 14,
                "column": 39
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Cities");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(fragment, [5]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(fragment, [7]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(fragment, [9]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(fragment, [11]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["profile"], [], 0, null, ["loc", [null, [9, 12], [9, 53]]]], ["block", "link-to", ["people"], [], 1, null, ["loc", [null, [10, 12], [10, 51]]]], ["block", "link-to", ["attractions"], [], 2, null, ["loc", [null, [11, 12], [11, 63]]]], ["block", "link-to", ["attraction-suggestions"], [], 3, null, ["loc", [null, [12, 12], [12, 76]]]], ["block", "link-to", ["trips"], [], 4, null, ["loc", [null, [13, 12], [13, 57]]]], ["block", "link-to", ["cities"], [], 5, null, ["loc", [null, [14, 12], [14, 51]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 12
              },
              "end": {
                "line": 20,
                "column": 57
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Change Password");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 8
            },
            "end": {
              "line": 22,
              "column": 8
            }
          },
          "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createElement("a");
          dom.setAttribute(el2, "href", "#");
          var el3 = dom.createTextNode("Sign Out");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [3, 0]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["block", "link-to", ["change-password"], [], 0, null, ["loc", [null, [20, 12], [20, 69]]]], ["element", "action", ["signOut"], [], ["loc", [null, [21, 24], [21, 44]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 12
              },
              "end": {
                "line": 23,
                "column": 41
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Sign Up");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 24,
                "column": 12
              },
              "end": {
                "line": 24,
                "column": 41
              }
            },
            "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Sign In");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 8
            },
            "end": {
              "line": 25,
              "column": 8
            }
          },
          "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          return morphs;
        },
        statements: [["block", "link-to", ["sign-up"], [], 0, null, ["loc", [null, [23, 12], [23, 53]]]], ["block", "link-to", ["sign-in"], [], 1, null, ["loc", [null, [24, 12], [24, 53]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 2
            },
            "end": {
              "line": 38,
              "column": 2
            }
          },
          "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "flash-message", [], ["flash", ["subexpr", "@mut", [["get", "flash", ["loc", [null, [37, 26], [37, 31]]]]], [], []]], ["loc", [null, [37, 4], [37, 33]]]]],
        locals: ["flash"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 53,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/my-application/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment(" <nav class=\"navbar navbar-fixed-top transparent\"> ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1, "class", "navbar navbar-default navbar-fixed-top");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "container-fluid");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "collapse navbar-collapse");
        dom.setAttribute(el3, "id", "navigation");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "nav navbar-nav");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4, "class", "nav navbar-nav navbar-right");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" <h1 class=\"welcome-banner\">Travel Together</h1> ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "style", "margin-top: 30px;");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-md-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-md-10 col-md-offset-1");
        dom.setAttribute(el2, "style", "padding-bottom: 36px;");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "footer website-footer navbar-fixed-bottom");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h5");
        dom.setAttribute(el2, "class", "website-footer-text");
        var el3 = dom.createTextNode("Misha Herscu | mishaherscu@gmail.com");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2, 1]);
        var element2 = dom.childAt(element1, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [10]), 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [12, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "navbar-header", ["loc", [null, [4, 4], [4, 21]]]], ["block", "if", [["get", "isAuthenticated", ["loc", [null, [8, 14], [8, 29]]]]], [], 0, null, ["loc", [null, [8, 8], [16, 15]]]], ["block", "if", [["get", "isAuthenticated", ["loc", [null, [19, 14], [19, 29]]]]], [], 1, 2, ["loc", [null, [19, 8], [25, 15]]]], ["block", "each", [["get", "flashMessages.queue", ["loc", [null, [36, 10], [36, 29]]]]], [], 3, null, ["loc", [null, [36, 2], [38, 11]]]], ["content", "outlet", ["loc", [null, [43, 4], [43, 14]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define('togetherness-ember-client/components/my-index/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),
    credentials: _ember['default'].computed.alias('auth.credentials'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated')
  });
});
define("togetherness-ember-client/components/my-index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 12,
                "column": 8
              },
              "end": {
                "line": 17,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            Your Trips\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 8
              },
              "end": {
                "line": 25,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            All Your Attendances\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 28,
                "column": 8
              },
              "end": {
                "line": 33,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            Profile\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 36,
                "column": 8
              },
              "end": {
                "line": 41,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            All Attractions\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 44,
                "column": 8
              },
              "end": {
                "line": 49,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            Attraction Suggestions\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child5 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 52,
                "column": 8
              },
              "end": {
                "line": 57,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            Available Cities\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child6 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 60,
                "column": 8
              },
              "end": {
                "line": 65,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            People\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child7 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 68,
                "column": 8
              },
              "end": {
                "line": 73,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "class", "col-xs-12");
            dom.setAttribute(el1, "style", "height:100%");
            var el2 = dom.createTextNode("\n            Change Password\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 78,
              "column": 2
            }
          },
          "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-xs-12");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("h1");
          var el4 = dom.createTextNode("Hi ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode(" ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("!");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-xs-12");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-3 small-home-button");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 1, 1]);
          var element1 = dom.childAt(fragment, [5]);
          var morphs = new Array(10);
          morphs[0] = dom.createMorphAt(element0, 1, 1);
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          morphs[2] = dom.createMorphAt(dom.childAt(element1, [1]), 1, 1);
          morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
          morphs[4] = dom.createMorphAt(dom.childAt(element1, [5]), 1, 1);
          morphs[5] = dom.createMorphAt(dom.childAt(element1, [7]), 1, 1);
          morphs[6] = dom.createMorphAt(dom.childAt(element1, [9]), 1, 1);
          morphs[7] = dom.createMorphAt(dom.childAt(element1, [11]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(element1, [13]), 1, 1);
          morphs[9] = dom.createMorphAt(dom.childAt(element1, [15]), 1, 1);
          return morphs;
        },
        statements: [["content", "credentials.givenname", ["loc", [null, [5, 15], [5, 40]]]], ["content", "credentials.surname", ["loc", [null, [5, 41], [5, 64]]]], ["block", "link-to", ["trips"], [], 0, null, ["loc", [null, [12, 8], [17, 20]]]], ["block", "link-to", ["attendances"], [], 1, null, ["loc", [null, [20, 8], [25, 20]]]], ["block", "link-to", ["profile"], [], 2, null, ["loc", [null, [28, 8], [33, 20]]]], ["block", "link-to", ["attractions"], [], 3, null, ["loc", [null, [36, 8], [41, 20]]]], ["block", "link-to", ["attraction-suggestions"], [], 4, null, ["loc", [null, [44, 8], [49, 20]]]], ["block", "link-to", ["cities"], [], 5, null, ["loc", [null, [52, 8], [57, 20]]]], ["block", "link-to", ["people"], [], 6, null, ["loc", [null, [60, 8], [65, 20]]]], ["block", "link-to", ["change-password"], [], 7, null, ["loc", [null, [68, 8], [73, 20]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4, child5, child6, child7]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 87,
                "column": 8
              },
              "end": {
                "line": 87,
                "column": 37
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Sign up");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 93,
                "column": 8
              },
              "end": {
                "line": 93,
                "column": 37
              }
            },
            "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Sign in");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 78,
              "column": 2
            },
            "end": {
              "line": 96,
              "column": 2
            }
          },
          "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("Welcome to Apricity Travel!");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h3");
          var el2 = dom.createTextNode("\n        Apricity Travel brings the internet to you. It is artifically intelligent concierge for travel and special events with personalized recommendations for you and your friends.\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        to get the adventure started\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          var el2 = dom.createTextNode("\n        Already a member?\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        to peruse adventures and plan your next trip\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [11]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [15]), 1, 1);
          return morphs;
        },
        statements: [["block", "link-to", ["sign-up"], [], 0, null, ["loc", [null, [87, 8], [87, 49]]]], ["block", "link-to", ["sign-in"], [], 1, null, ["loc", [null, [93, 8], [93, 49]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 98,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/my-index/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-10 col-xs-offset-1");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "isAuthenticated", ["loc", [null, [2, 8], [2, 23]]]]], [], 0, 1, ["loc", [null, [2, 2], [96, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('togetherness-ember-client/components/navbar-header/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    // tagName: 'div',
    // classNames: ['navbar-header'],
  });
});
define("togetherness-ember-client/components/navbar-header/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/components/navbar-header/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "class", "website-logo");
          dom.setAttribute(el1, "src", "https://i.imgsafe.org/0e596ae7ac.png");
          dom.setAttribute(el1, "alt", "Logo");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" Home ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/navbar-header/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "hamburger-menu", ["loc", [null, [1, 0], [1, 18]]]], ["block", "link-to", ["application"], ["class", "navbar-brand"], 0, null, ["loc", [null, [2, 0], [5, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/components/password-confirmation-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("togetherness-ember-client/components/password-confirmation-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/password-confirmation-input/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "password-confirmation");
        var el2 = dom.createTextNode("Password Confirmation");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "password", "id", "password-confirmation", "placeholder", "Password Confirmation", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [5, 14], [5, 22]]]]], [], []]], ["loc", [null, [2, 0], [5, 24]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/password-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("togetherness-ember-client/components/password-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/password-input/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "kind");
        var el2 = dom.createTextNode("Password");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "password", "id", "password", "placeholder", "Password", "value", ["subexpr", "@mut", [["get", "password", ["loc", [null, [5, 14], [5, 22]]]]], [], []]], ["loc", [null, [2, 0], [5, 24]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/person-profile/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNameBindings: 'hiddenPerson:hidden',
    hiddenPerson: false,

    actions: {
      closePerson: function closePerson() {
        this.toggleProperty('hiddenPerson');
      },
      hidePerson: function hidePerson() {
        this.toggleProperty('hiddenPerson');
      },
      requestFriend: function requestFriend() {
        this.sendAction('requestFriend', this.get('user.id'));
      },
      removeFriend: function removeFriend() {
        this.sendAction('removeFriend', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      cancelRequest: function cancelRequest() {
        this.sendAction('cancelRequest', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      acceptRequest: function acceptRequest() {
        this.sendAction('acceptRequest', this.get('user.id'));
      },
      declineRequest: function declineRequest() {
        this.sendAction('declineRequest', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      unRequestFriend: function unRequestFriend() {
        this.sendAction('unRequestFriend', this.get('user.id'));
      },
      viewProfile: function viewProfile() {
        this.sendAction('viewProfile');
      }
    }
  });
});
define("togetherness-ember-client/components/person-profile/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 6
            },
            "end": {
              "line": 10,
              "column": 6
            }
          },
          "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "close tile-close-button");
          dom.setAttribute(el1, "style", "padding: 0px; margin: 0px;");
          var el2 = dom.createTextNode("×\n        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element4 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["element", "action", ["closePerson"], [], ["loc", [null, [8, 16], [8, 40]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 39,
                  "column": 10
                },
                "end": {
                  "line": 52,
                  "column": 10
                }
              },
              "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "person-buttons col-xs-3");
              dom.setAttribute(el1, "style", "margin-right: 5px;");
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "style", "text-align: right;");
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("button");
              dom.setAttribute(el3, "class", "btn btn-md btn-warning");
              dom.setAttribute(el3, "style", "text-align: center;\n                               align: center;\n                               margin-top: 5px;");
              var el4 = dom.createTextNode("\n                  Requested!\n                ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n              ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element3 = dom.childAt(fragment, [1, 1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element3);
              return morphs;
            },
            statements: [["element", "action", ["unRequestFriend"], [], ["loc", [null, [44, 24], [44, 52]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 52,
                  "column": 10
                },
                "end": {
                  "line": 65,
                  "column": 10
                }
              },
              "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("            ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("div");
              dom.setAttribute(el1, "class", "person-buttons col-xs-3");
              dom.setAttribute(el1, "style", "margin-right: 5px;");
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("div");
              dom.setAttribute(el2, "style", "text-align: right;");
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              var el3 = dom.createElement("button");
              dom.setAttribute(el3, "class", "btn btn-md btn-primary");
              dom.setAttribute(el3, "style", "text-align: center;\n                               align: center;\n                               margin-top: 5px;");
              var el4 = dom.createTextNode("\n                  Request\n                ");
              dom.appendChild(el3, el4);
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n              ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n            ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1, 1, 1]);
              var morphs = new Array(1);
              morphs[0] = dom.createElementMorph(element2);
              return morphs;
            },
            statements: [["element", "action", ["requestFriend"], [], ["loc", [null, [57, 24], [57, 50]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 38,
                "column": 8
              },
              "end": {
                "line": 66,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "user.requested", ["loc", [null, [39, 16], [39, 30]]]]], [], 0, 1, ["loc", [null, [39, 10], [65, 17]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 66,
                "column": 8
              },
              "end": {
                "line": 80,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "person-buttons col-xs-3");
            dom.setAttribute(el1, "style", "margin-right: 5px;\n                      font-weight: 700;");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "style", "text-align: right;");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3, "class", "btn btn-md btn-success");
            dom.setAttribute(el3, "style", "text-align: center;\n                             align: center;\n                             margin-top: 5px;");
            var el4 = dom.createTextNode("\n                View Profile\n              ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n            ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element1 = dom.childAt(fragment, [1, 1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element1);
            return morphs;
          },
          statements: [["element", "action", ["viewProfile"], [], ["loc", [null, [72, 22], [72, 46]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 6
            },
            "end": {
              "line": 81,
              "column": 6
            }
          },
          "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "unless", [["get", "user.self", ["loc", [null, [38, 18], [38, 27]]]]], [], 0, 1, ["loc", [null, [38, 8], [80, 19]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 82,
                "column": 8
              },
              "end": {
                "line": 96,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "person-buttons col-xs-3");
            dom.setAttribute(el1, "style", "margin-right: 5px;\n                      font-weight: 700;");
            var el2 = dom.createTextNode("\n            ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "style", "text-align: right;");
            var el3 = dom.createTextNode("\n              ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("button");
            dom.setAttribute(el3, "class", "btn btn-md btn-danger");
            dom.setAttribute(el3, "style", "text-align: center;\n                             align: center;\n                             margin-top: 5px;");
            var el4 = dom.createTextNode("\n                Remove Friend\n              ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n            ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 1, 1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "action", ["removeFriend"], [], ["loc", [null, [88, 22], [88, 47]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 81,
              "column": 6
            },
            "end": {
              "line": 97,
              "column": 6
            }
          },
          "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "friend", ["loc", [null, [82, 14], [82, 20]]]]], [], 0, null, ["loc", [null, [82, 8], [96, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 102,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/person-profile/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-5 person-profile");
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        dom.setAttribute(el2, "style", "margin-bottom: 5px;");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-3");
        dom.setAttribute(el3, "style", "font-weight: 200;\n                  margin-bottom: 10px;\n                  border: 0.3px solid #AAA;\n                  padding: 10px;\n                  height: 75px;\n                  width: 75px;\n                  text-align: center");
        var el4 = dom.createTextNode("\n        Profile Picture\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-6");
        dom.setAttribute(el3, "style", "text-align: left;");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        dom.setAttribute(el4, "class", "col-xs-12");
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-xs-12");
        dom.setAttribute(el4, "style", "font-weight: 300;\n                    text-align: left;");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("a");
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element5 = dom.childAt(fragment, [0]);
        var element6 = dom.childAt(element5, [3]);
        var element7 = dom.childAt(element6, [3]);
        var element8 = dom.childAt(element7, [3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element5, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element7, [1]), 0, 0);
        morphs[2] = dom.createAttrMorph(element8, 'href');
        morphs[3] = dom.createMorphAt(element8, 1, 1);
        morphs[4] = dom.createMorphAt(element6, 5, 5);
        return morphs;
      },
      statements: [["block", "unless", [["get", "profile", ["loc", [null, [4, 16], [4, 23]]]]], [], 0, null, ["loc", [null, [4, 6], [10, 17]]]], ["content", "user.fullName", ["loc", [null, [27, 30], [27, 47]]]], ["attribute", "href", ["concat", ["mailto:", ["get", "user.email", ["loc", [null, [31, 28], [31, 38]]]]]]], ["content", "user.email", ["loc", [null, [32, 12], [32, 26]]]], ["block", "unless", [["get", "profile", ["loc", [null, [37, 16], [37, 23]]]]], [], 1, 2, ["loc", [null, [37, 6], [97, 17]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define('togetherness-ember-client/components/pikaday-input', ['exports', 'ember', 'ember-pikaday/components/pikaday-input'], function (exports, _ember, _emberPikadayComponentsPikadayInput) {
  exports['default'] = _emberPikadayComponentsPikadayInput['default'];
});
define('togetherness-ember-client/components/pikaday-inputless', ['exports', 'ember-pikaday/components/pikaday-inputless'], function (exports, _emberPikadayComponentsPikadayInputless) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPikadayComponentsPikadayInputless['default'];
    }
  });
});
define('togetherness-ember-client/components/planned-trip/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNameBindings: 'hiddenAttraction:hidden',
    hiddenAttraction: false,

    actions: {
      deleteTrip: function deleteTrip() {
        this.sendAction('deleteTrip', this.get('trip'));
        this.toggleProperty('hiddenAttraction');
      },
      updateTrip: function updateTrip() {
        this.sendAction('updateTrip', this.get('trip'));
      },
      inviteFriend: function inviteFriend() {
        this.sendAction('inviteFriend', this.get('trip'));
      },
      openTrip: function openTrip() {
        this.sendAction('openTrip', this.get('trip'));
      }
    }
  });
});
define("togetherness-ember-client/components/planned-trip/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 50,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/planned-trip/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-card col-xs-5");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        dom.setAttribute(el3, "class", "col-xs-12");
        dom.setAttribute(el3, "style", "text-align: center;");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h6");
        var el3 = dom.createTextNode("Details");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table table-bordered");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("City");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("Start Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("End Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("Notes");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        dom.setAttribute(el2, "style", "text-align: right;");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-info");
        var el4 = dom.createTextNode("\n      More\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-success disabled");
        var el4 = dom.createTextNode("\n      Invite\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-primary");
        var el4 = dom.createTextNode("\n      Edit\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-danger");
        var el4 = dom.createTextNode("\n      Delete\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [5, 1]);
        var element2 = dom.childAt(element0, [9]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [3]);
        var element5 = dom.childAt(element2, [5]);
        var element6 = dom.childAt(element2, [7]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element1, [1, 3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3, 3]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [5, 3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element1, [7, 3]), 0, 0);
        morphs[5] = dom.createElementMorph(element3);
        morphs[6] = dom.createElementMorph(element4);
        morphs[7] = dom.createElementMorph(element5);
        morphs[8] = dom.createElementMorph(element6);
        return morphs;
      },
      statements: [["content", "trip.name", ["loc", [null, [4, 6], [4, 19]]]], ["content", "trip.city.name", ["loc", [null, [12, 12], [12, 30]]]], ["content", "trip.start_date", ["loc", [null, [16, 12], [16, 31]]]], ["content", "trip.end_date", ["loc", [null, [20, 12], [20, 29]]]], ["content", "trip.notes", ["loc", [null, [24, 12], [24, 26]]]], ["element", "action", ["openTrip"], [], ["loc", [null, [33, 12], [33, 33]]]], ["element", "action", ["inviteFriend"], [], ["loc", [null, [37, 12], [37, 37]]]], ["element", "action", ["updateTrip"], [], ["loc", [null, [41, 12], [41, 35]]]], ["element", "action", ["deleteTrip"], [], ["loc", [null, [45, 12], [45, 35]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/sign-in-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },
      reset: function reset() {
        this.sendAction('reset');
      }
    }
  });
});
define("togetherness-ember-client/components/sign-in-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/sign-in-form/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-6");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "submit");
        dom.setAttribute(el2, "class", "btn btn-primary");
        var el3 = dom.createTextNode("\n    Sign In\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "btn btn-default");
        var el3 = dom.createTextNode("\n    Cancel\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [5]);
        var element2 = dom.childAt(element0, [7]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createElementMorph(element1);
        morphs[3] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "email-input", [], ["email", ["subexpr", "@mut", [["get", "credentials.email", ["loc", [null, [2, 22], [2, 39]]]]], [], []]], ["loc", [null, [2, 2], [2, 41]]]], ["inline", "password-input", [], ["password", ["subexpr", "@mut", [["get", "credentials.password", ["loc", [null, [3, 28], [3, 48]]]]], [], []]], ["loc", [null, [3, 2], [3, 50]]]], ["element", "action", ["submit"], [], ["loc", [null, [5, 48], [5, 67]]]], ["element", "action", ["reset"], [], ["loc", [null, [9, 34], [9, 52]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/sign-up-form/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },
      reset: function reset() {
        this.sendAction('reset');
      }
    }
  });
});
define("togetherness-ember-client/components/sign-up-form/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/sign-up-form/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-6");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "submit");
        dom.setAttribute(el2, "class", "btn btn-primary");
        var el3 = dom.createTextNode("\n    Sign Up\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "btn btn-default");
        var el3 = dom.createTextNode("\n    Cancel\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [11]);
        var element2 = dom.childAt(element0, [13]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        morphs[4] = dom.createMorphAt(element0, 9, 9);
        morphs[5] = dom.createElementMorph(element1);
        morphs[6] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "givenname-input", [], ["givenname", ["subexpr", "@mut", [["get", "credentials.givenname", ["loc", [null, [2, 30], [2, 51]]]]], [], []]], ["loc", [null, [2, 2], [2, 53]]]], ["inline", "surname-input", [], ["surname", ["subexpr", "@mut", [["get", "credentials.surname", ["loc", [null, [3, 26], [3, 45]]]]], [], []]], ["loc", [null, [3, 2], [3, 47]]]], ["inline", "email-input", [], ["email", ["subexpr", "@mut", [["get", "credentials.email", ["loc", [null, [4, 22], [4, 39]]]]], [], []]], ["loc", [null, [4, 2], [4, 41]]]], ["inline", "password-input", [], ["password", ["subexpr", "@mut", [["get", "credentials.password", ["loc", [null, [5, 28], [5, 48]]]]], [], []]], ["loc", [null, [5, 2], [5, 50]]]], ["inline", "password-confirmation-input", [], ["password", ["subexpr", "@mut", [["get", "credentials.passwordConfirmation", ["loc", [null, [6, 41], [6, 73]]]]], [], []]], ["loc", [null, [6, 2], [6, 75]]]], ["element", "action", ["submit"], [], ["loc", [null, [8, 48], [8, 67]]]], ["element", "action", ["reset"], [], ["loc", [null, [12, 34], [12, 52]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/surname-input/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define("togetherness-ember-client/components/surname-input/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/surname-input/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("label");
        dom.setAttribute(el1, "for", "email");
        var el2 = dom.createTextNode("Last Name");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "input", [], ["type", "text", "id", "surname", "placeholder", "Last Name", "value", ["subexpr", "@mut", [["get", "surname", ["loc", [null, [5, 14], [5, 21]]]]], [], []]], ["loc", [null, [2, 0], [5, 23]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/trip-detail/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNameBindings: 'hiddenAttraction:hidden',
    hiddenAttraction: false,

    actions: {
      deleteTrip: function deleteTrip() {
        this.sendAction('deleteTrip', this.get('trip'));
        this.toggleProperty('hiddenAttraction');
      },
      updateTrip: function updateTrip() {
        this.sendAction('updateTrip', this.get('trip'));
      },
      inviteFriend: function inviteFriend() {
        this.sendAction('inviteFriend', this.get('trip'));
      },
      back: function back() {
        this.sendAction('back');
      }
    }
  });
});
define("togetherness-ember-client/components/trip-detail/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 39,
              "column": 4
            },
            "end": {
              "line": 41,
              "column": 4
            }
          },
          "moduleName": "togetherness-ember-client/components/trip-detail/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "attendance.user.fullName", ["loc", [null, [40, 10], [40, 38]]]]],
        locals: ["attendance"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 71,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/trip-detail/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-card col-xs-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-11");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h3");
        dom.setAttribute(el4, "class", "col-xs-12");
        dom.setAttribute(el4, "style", "text-align: center;");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "close tile-close-button");
        var el5 = dom.createTextNode("×\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h6");
        var el3 = dom.createTextNode("Details");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("table");
        dom.setAttribute(el2, "class", "table table-bordered");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tbody");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("City");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("Start Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("End Date");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("tr");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        dom.setAttribute(el5, "width", "35%");
        var el6 = dom.createTextNode("Notes");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("td");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h6");
        var el3 = dom.createTextNode("People");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ol");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("hr");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        dom.setAttribute(el2, "style", "text-align: right;");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-info");
        var el4 = dom.createTextNode("\n      Back\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-success disabled");
        var el4 = dom.createTextNode("\n      Invite\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-primary");
        var el4 = dom.createTextNode("\n      Edit\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-danger");
        var el4 = dom.createTextNode("\n      Delete\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element0, [5, 1]);
        var element4 = dom.childAt(element0, [21]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element4, [3]);
        var element7 = dom.childAt(element4, [5]);
        var element8 = dom.childAt(element4, [7]);
        var morphs = new Array(12);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 1, 1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createMorphAt(dom.childAt(element3, [1, 3]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element3, [3, 3]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [5, 3]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element3, [7, 3]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [9]), 1, 1);
        morphs[7] = dom.createMorphAt(element0, 17, 17);
        morphs[8] = dom.createElementMorph(element5);
        morphs[9] = dom.createElementMorph(element6);
        morphs[10] = dom.createElementMorph(element7);
        morphs[11] = dom.createElementMorph(element8);
        return morphs;
      },
      statements: [["content", "trip.name", ["loc", [null, [5, 8], [5, 21]]]], ["element", "action", ["back"], [], ["loc", [null, [11, 14], [11, 31]]]], ["content", "trip.city.name", ["loc", [null, [20, 12], [20, 30]]]], ["content", "trip.start_date", ["loc", [null, [24, 12], [24, 31]]]], ["content", "trip.end_date", ["loc", [null, [28, 12], [28, 29]]]], ["content", "trip.notes", ["loc", [null, [32, 12], [32, 26]]]], ["block", "each", [["get", "trip.attendances", ["loc", [null, [39, 12], [39, 28]]]]], [], 0, null, ["loc", [null, [39, 4], [41, 13]]]], ["inline", "disqus-comments", [], ["identifier", ["subexpr", "@mut", [["get", "trip.id", ["loc", [null, [48, 31], [48, 38]]]]], [], []]], ["loc", [null, [48, 2], [48, 40]]]], ["element", "action", ["back"], [], ["loc", [null, [54, 12], [54, 29]]]], ["element", "action", ["inviteFriend"], [], ["loc", [null, [58, 12], [58, 37]]]], ["element", "action", ["updateTrip"], [], ["loc", [null, [62, 12], [62, 35]]]], ["element", "action", ["deleteTrip"], [], ["loc", [null, [66, 12], [66, 35]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/components/trip-editor/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('trip'));
      },

      cancel: function cancel() {
        this.sendAction('cancel');
      }

    }
  });
});
define("togetherness-ember-client/components/trip-editor/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 82,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/trip-editor/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Edit Adventure");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "white-background-div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-11");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h4");
        var el5 = dom.createTextNode("Adventure in ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-1");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4, "type", "button");
        dom.setAttribute(el4, "class", "close tile-close-button");
        var el5 = dom.createTextNode("×\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("hr");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("form");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n      Adventure Name\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n      Notes\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n      Start date:\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n      End date:\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-primary");
        dom.setAttribute(el3, "type", "submit");
        var el4 = dom.createTextNode("\n      Save\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "btn btn-md btn-danger");
        var el4 = dom.createTextNode("\n      Cancel\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [3, 1]);
        var element3 = dom.childAt(element0, [5]);
        var element4 = dom.childAt(element3, [27]);
        var morphs = new Array(8);
        morphs[0] = dom.createMorphAt(dom.childAt(element1, [1, 1]), 1, 1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createMorphAt(element3, 9, 9);
        morphs[5] = dom.createMorphAt(element3, 15, 15);
        morphs[6] = dom.createMorphAt(element3, 21, 21);
        morphs[7] = dom.createElementMorph(element4);
        return morphs;
      },
      statements: [["content", "trip.city.name", ["loc", [null, [9, 23], [9, 41]]]], ["element", "action", ["cancel"], [], ["loc", [null, [14, 14], [14, 33]]]], ["element", "action", ["submit"], ["on", "submit"], ["loc", [null, [23, 8], [23, 39]]]], ["inline", "input", [], ["placeholder", "Best Adventure Ever!!!", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "trip.name", ["loc", [null, [32, 14], [32, 23]]]]], [], []]], ["loc", [null, [28, 6], [32, 25]]]], ["inline", "textarea", [], ["rows", "3", "placeholder", "Every good adventure starts with...", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "trip.notes", ["loc", [null, [44, 14], [44, 24]]]]], [], []]], ["loc", [null, [39, 6], [44, 26]]]], ["inline", "input", [], ["type", "date", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "trip.start_date", ["loc", [null, [55, 14], [55, 29]]]]], [], []]], ["loc", [null, [51, 6], [55, 31]]]], ["inline", "input", [], ["type", "date", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "trip.end_date", ["loc", [null, [66, 14], [66, 27]]]]], [], []]], ["loc", [null, [62, 6], [66, 29]]]], ["element", "action", ["cancel"], [], ["loc", [null, [75, 12], [75, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/trip-planning/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    tripData: {
      name: null,
      notes: null,
      start_date: null,
      end_date: null
    },

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('tripData'));
      },

      cancel: function cancel() {
        this.sendAction('cancel');
      }

    }
  });
});
define("togetherness-ember-client/components/trip-planning/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 101,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/trip-planning/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Create Adventure!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "white-background-div col-xs-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-xs-12");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-xs-11");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        var el6 = dom.createTextNode("New Adventure in ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("p");
        var el6 = dom.createElement("ul");
        var el7 = dom.createElement("li");
        var el8 = dom.createTextNode("Remember to check out ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("strong");
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode(" on ");
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "col-xs-1");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close tile-close-button");
        var el6 = dom.createTextNode("×\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("hr");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-xs-12");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("form");
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-6");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("\n            Name Your Adventure!\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-10");
        dom.setAttribute(el5, "style", "margin-top:5px;");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("\n            Notes\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-5");
        dom.setAttribute(el5, "style", "margin-top:5px;");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("\n            Start date:\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-5");
        dom.setAttribute(el5, "style", "margin-top:5px;");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("label");
        var el7 = dom.createTextNode("\n            End date:\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n            ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-12");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("hr");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "col-xs-12");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "btn btn-md btn-primary");
        dom.setAttribute(el6, "type", "submit");
        var el7 = dom.createTextNode("\n            Create!\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6, "class", "btn btn-md btn-danger");
        var el7 = dom.createTextNode("\n            Cancel\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [6, 1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [3, 0, 0, 1]);
        var element4 = dom.childAt(element1, [3, 1]);
        var element5 = dom.childAt(element0, [9, 1]);
        var element6 = dom.childAt(element5, [15, 3]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element3, 0, 0);
        morphs[2] = dom.createMorphAt(element3, 2, 2);
        morphs[3] = dom.createElementMorph(element4);
        morphs[4] = dom.createElementMorph(element5);
        morphs[5] = dom.createMorphAt(dom.childAt(element5, [1]), 3, 3);
        morphs[6] = dom.createMorphAt(dom.childAt(element5, [5]), 3, 3);
        morphs[7] = dom.createMorphAt(dom.childAt(element5, [9]), 3, 3);
        morphs[8] = dom.createMorphAt(dom.childAt(element5, [11]), 3, 3);
        morphs[9] = dom.createElementMorph(element6);
        return morphs;
      },
      statements: [["content", "attraction.city_name", ["loc", [null, [10, 29], [10, 53]]]], ["content", "attraction.title", ["loc", [null, [11, 49], [11, 69]]]], ["content", "attraction.event_date", ["loc", [null, [11, 73], [11, 98]]]], ["element", "action", ["cancel"], [], ["loc", [null, [16, 16], [16, 35]]]], ["element", "action", ["submit"], ["on", "submit"], ["loc", [null, [30, 12], [30, 43]]]], ["inline", "input", [], ["placeholder", "Best Adventure Ever!!!", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "tripData.name", ["loc", [null, [40, 20], [40, 33]]]]], [], []]], ["loc", [null, [36, 12], [40, 35]]]], ["inline", "textarea", [], ["rows", "3", "placeholder", "Every good adventure starts with...", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "tripData.notes", ["loc", [null, [54, 20], [54, 34]]]]], [], []]], ["loc", [null, [49, 12], [54, 36]]]], ["inline", "input", [], ["type", "date", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "tripData.start_date", ["loc", [null, [67, 20], [67, 39]]]]], [], []]], ["loc", [null, [63, 12], [67, 41]]]], ["inline", "input", [], ["type", "date", "class", "input-group form-control", "required", "true", "value", ["subexpr", "@mut", [["get", "tripData.end_date", ["loc", [null, [78, 20], [78, 37]]]]], [], []]], ["loc", [null, [74, 12], [78, 39]]]], ["element", "action", ["cancel"], [], ["loc", [null, [92, 18], [92, 37]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/components/user-profile/component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),
    credentials: _ember['default'].computed.alias('auth.credentials'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    classNameBindings: 'hiddenPerson:hidden',
    hiddenPerson: false,

    actions: {
      hidePerson: function hidePerson() {
        this.toggleProperty('hiddenPerson');
      },
      removeFriend: function removeFriend() {
        this.sendAction('removeFriend', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      cancelRequest: function cancelRequest() {
        this.sendAction('cancelRequest', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      acceptRequest: function acceptRequest() {
        this.sendAction('acceptRequest', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      declineRequest: function declineRequest() {
        this.sendAction('declineRequest', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      unRequestFriend: function unRequestFriend() {
        this.sendAction('unRequestFriend', this.get('user.id'));
        this.toggleProperty('hiddenPerson');
      },
      edit: function edit() {
        this.sendAction('editProfile');
      },
      'delete': function _delete() {
        this.sendAction('deleteProfile');
      }
    }
  });
});
define("togetherness-ember-client/components/user-profile/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 40,
                "column": 8
              },
              "end": {
                "line": 53,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/user-profile/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "person-profile", [], ["user", ["subexpr", "@mut", [["get", "request.requestedUser", ["loc", [null, [42, 17], [42, 38]]]]], [], []], "profile", true, "awaiting", true, "pending", false, "friend", false, "hidePerson", "hidePerson", "removeFriend", "removeFriend", "cancelRequest", "cancelRequest", "acceptRequest", "acceptRequest", "declineRequest", "declineRequest", "unRequestFriend", "unRequestFriend"], ["loc", [null, [41, 10], [52, 47]]]]],
          locals: ["request"],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 62,
                "column": 8
              },
              "end": {
                "line": 75,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/user-profile/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "person-profile", [], ["user", ["subexpr", "@mut", [["get", "request.requestedUser", ["loc", [null, [64, 17], [64, 38]]]]], [], []], "profile", true, "awaiting", false, "pending", true, "friend", false, "hidePerson", "hidePerson", "removeFriend", "removeFriend", "cancelRequest", "cancelRequest", "acceptRequest", "acceptRequest", "declineRequest", "declineRequest", "unRequestFriend", "unRequestFriend"], ["loc", [null, [63, 10], [74, 47]]]]],
          locals: ["request"],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 84,
                "column": 8
              },
              "end": {
                "line": 97,
                "column": 8
              }
            },
            "moduleName": "togetherness-ember-client/components/user-profile/template.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "person-profile", [], ["user", ["subexpr", "@mut", [["get", "friend.user", ["loc", [null, [86, 17], [86, 28]]]]], [], []], "profile", true, "awaiting", false, "pending", false, "friend", true, "hidePerson", "hidePerson", "removeFriend", "removeFriend", "cancelRequest", "cancelRequest", "acceptRequest", "acceptRequest", "declineRequest", "declineRequest", "unRequestFriend", "unRequestFriend"], ["loc", [null, [85, 10], [96, 47]]]]],
          locals: ["friend"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 110,
              "column": 2
            }
          },
          "moduleName": "togetherness-ember-client/components/user-profile/template.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment(" OTHER PROFILE CONTENT  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-xs-8 col-offset-xs-2");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("table");
          dom.setAttribute(el2, "class", "table table-condensed");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tbody");
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("tr");
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("th");
          dom.setAttribute(el5, "scope", "row");
          var el6 = dom.createTextNode("User ID");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("td");
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("tr");
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("th");
          dom.setAttribute(el5, "scope", "row");
          var el6 = dom.createTextNode("First Name");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("td");
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("tr");
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("th");
          dom.setAttribute(el5, "scope", "row");
          var el6 = dom.createTextNode("Last Name");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("td");
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("tr");
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("th");
          dom.setAttribute(el5, "scope", "row");
          var el6 = dom.createTextNode("Email Address");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createElement("td");
          var el6 = dom.createComment("");
          dom.appendChild(el5, el6);
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("Friend Requests");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createTextNode("Awaiting Your Approval");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          dom.setAttribute(el2, "syle", "margin: 15px;");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createTextNode("Your Pending Requests");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          dom.setAttribute(el2, "syle", "margin: 15px;");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("Friends");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "col-xs-12");
          dom.setAttribute(el2, "syle", "margin-top: 15px; margin-bottom: 15px;");
          var el3 = dom.createTextNode("\n");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "type", "submit");
          dom.setAttribute(el2, "class", "btn btn-primary");
          var el3 = dom.createTextNode("\n        Edit Profile\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "type", "submit");
          dom.setAttribute(el2, "class", "btn btn-danger");
          var el3 = dom.createTextNode("\n        Delete Account\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(fragment, [9]);
          var element2 = dom.childAt(element1, [1, 1]);
          var element3 = dom.childAt(element1, [25]);
          var element4 = dom.childAt(element1, [27]);
          var morphs = new Array(11);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [1, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [3, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [5, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element2, [7, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element1, [9]), 1, 1);
          morphs[7] = dom.createMorphAt(dom.childAt(element1, [15]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(element1, [21]), 1, 1);
          morphs[9] = dom.createElementMorph(element3);
          morphs[10] = dom.createElementMorph(element4);
          return morphs;
        },
        statements: [["content", "user.givenname", ["loc", [null, [5, 8], [5, 26]]]], ["content", "user.surname", ["loc", [null, [5, 27], [5, 43]]]], ["content", "user.id", ["loc", [null, [16, 16], [16, 27]]]], ["content", "user.givenname", ["loc", [null, [20, 16], [20, 34]]]], ["content", "user.surname", ["loc", [null, [24, 16], [24, 32]]]], ["content", "user.email", ["loc", [null, [28, 16], [28, 30]]]], ["block", "each", [["get", "awaitingApproval", ["loc", [null, [40, 16], [40, 32]]]]], [], 0, null, ["loc", [null, [40, 8], [53, 17]]]], ["block", "each", [["get", "pendingRequests", ["loc", [null, [62, 16], [62, 31]]]]], [], 1, null, ["loc", [null, [62, 8], [75, 17]]]], ["block", "each", [["get", "friends", ["loc", [null, [84, 16], [84, 23]]]]], [], 2, null, ["loc", [null, [84, 8], [97, 17]]]], ["element", "action", ["edit"], [], ["loc", [null, [102, 52], [102, 69]]]], ["element", "action", ["delete"], [], ["loc", [null, [106, 51], [106, 70]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 112,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/components/user-profile/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "white-background-div col-xs-12");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Profile Information");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        return morphs;
      },
      statements: [["block", "if", [["get", "isAuthenticated", ["loc", [null, [4, 8], [4, 23]]]]], [], 0, null, ["loc", [null, [4, 2], [110, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('togetherness-ember-client/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('togetherness-ember-client/events-api/service', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    exampleAttractions: (0, _emberLocalStorage.storageFor)('events-api'),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    index: function index() {
      var _this = this;

      return this.get('ajax').get('/attractions').then(function (result) {
        _this.get('exampleAttractions').set('example-attractions', result);
      });
    },

    show: function show(attraction_id) {
      var _this2 = this;

      return this.get('ajax').get('/attractions/' + attraction_id).then(function (result) {
        _this2.get('exampleAttractions').set('specific-attraction', result);
      });
    }
  });
});
define('togetherness-ember-client/events-api/storage', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define('togetherness-ember-client/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('togetherness-ember-client/friend-request/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    user: (0, _emberDataRelationships.belongsTo)('user'),
    requestedUser: (0, _emberDataRelationships.belongsTo)('user')
  });
});
define('togetherness-ember-client/friendship/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    user: (0, _emberDataRelationships.belongsTo)('user'),
    requestedUser: (0, _emberDataRelationships.belongsTo)('user')
  });
});
define('togetherness-ember-client/helpers/in-arr', ['exports', 'ember-inline-edit/helpers/in-arr'], function (exports, _emberInlineEditHelpersInArr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberInlineEditHelpersInArr['default'];
    }
  });
  Object.defineProperty(exports, 'inArr', {
    enumerable: true,
    get: function get() {
      return _emberInlineEditHelpersInArr.inArr;
    }
  });
});
define('togetherness-ember-client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('togetherness-ember-client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('togetherness-ember-client/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {}
  });
});
define("togetherness-ember-client/index/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/index/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "my-index", ["loc", [null, [1, 0], [1, 12]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("togetherness-ember-client/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('togetherness-ember-client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'togetherness-ember-client/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _togethernessEmberClientConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_togethernessEmberClientConfigEnvironment['default'].APP.name, _togethernessEmberClientConfigEnvironment['default'].APP.version)
  };
});
define('togetherness-ember-client/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('togetherness-ember-client/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('togetherness-ember-client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('togetherness-ember-client/initializers/export-application-global', ['exports', 'ember', 'togetherness-ember-client/config/environment'], function (exports, _ember, _togethernessEmberClientConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_togethernessEmberClientConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _togethernessEmberClientConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_togethernessEmberClientConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('togetherness-ember-client/initializers/flash-messages', ['exports', 'ember', 'togetherness-ember-client/config/environment'], function (exports, _ember, _togethernessEmberClientConfigEnvironment) {
  exports.initialize = initialize;
  var merge = _ember['default'].merge;
  var deprecate = _ember['default'].deprecate;

  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _togethernessEmberClientConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('togetherness-ember-client/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('togetherness-ember-client/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('togetherness-ember-client/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('togetherness-ember-client/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('togetherness-ember-client/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("togetherness-ember-client/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define("togetherness-ember-client/interests/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/interests/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "attraction.title", ["loc", [null, [5, 6], [5, 26]]]]],
        locals: ["attraction"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/interests/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Set Interests");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment(" {{attraction-event viewAttractions=\"index\"}} ");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [4, 8], [4, 13]]]]], [], 0, null, ["loc", [null, [4, 0], [6, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/people/route', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Route.extend({
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      var _this = this;

      return this.get('store').findAll('user').then(function (users) {
        users.forEach(function (user) {
          user.set('self', String(user.id) === String(_this.get('credentials.id')));
        });
        return users;
      }).then(function (users) {
        _this.get('store').findAll('friend-request').then(function (requests) {
          users.forEach(function (user) {
            user.set('requested', false);
            requests.forEach(function (request) {
              if (String(request.get('requestedUser.id')) === String(user.id)) {
                user.set('requested', true);
              }
            });
          });
        });
        return users;
      });
    },

    actions: {
      requestFriend: function requestFriend(requestedUser) {
        var _this2 = this;

        this.get('store').findRecord('user', this.get('credentials.id')).then(function (selfUser) {
          var requestObject = {
            user: selfUser,
            requestedUser: ''
          };
          _this2.get('store').findRecord('user', requestedUser).then(function (requestedUser) {
            requestObject.requestedUser = requestedUser;
            return requestObject;
          }).then(function () {
            if (requestObject.user.id !== requestObject.requestedUser.id) {
              var newFriendRequest = _this2.get('store').createRecord('friend-request', requestObject);
              newFriendRequest.save();
              _this2.refresh();
            } else {
              _this2.get('flashMessages').warning('You cannot friend yourself.');
            }
          });
        });
      },
      unRequestFriend: function unRequestFriend(requestedUserId) {
        var _this3 = this;

        this.get('store').findAll('friend-request').then(function (requests) {
          requests.forEach(function (request) {
            request.get('requestedUser').then(function (requestedUser) {
              if (requestedUser.id === requestedUserId) {
                request.destroyRecord().then(function () {
                  _this3.refresh();
                });
              }
            });
          });
        });
      },
      viewProfile: function viewProfile() {
        this.transitionTo('profile');
      }
    }
  });
});
define("togetherness-ember-client/people/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/people/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "person-profile", [], ["user", ["subexpr", "@mut", [["get", "user", ["loc", [null, [6, 9], [6, 13]]]]], [], []], "profile", false, "requestFriend", "requestFriend", "viewProfile", "viewProfile", "unRequestFriend", "unRequestFriend"], ["loc", [null, [5, 2], [10, 39]]]]],
        locals: ["user"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/people/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("People");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [4, 8], [4, 13]]]]], [], 0, null, ["loc", [null, [4, 0], [11, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/plan-trip/route', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Route.extend({
    credentials: (0, _emberLocalStorage.storageFor)('auth'),

    model: function model(params) {
      return this.get('store').findRecord('attraction', params.attraction_id);
    },

    actions: {
      submit: function submit(data) {
        var _this = this;

        var tripData = {
          name: data.name,
          notes: data.notes,
          city: '',
          user: '',
          start_date: data.start_date,
          end_date: data.end_date
        };

        var attractionId = this.get('router.router.state.params.plan-trip.attraction_id');
        this.get('store').findRecord('attraction', attractionId).then(function (attraction) {
          tripData.city = attraction.get('city');
        }).then(function () {
          var newTrip = _this.get('store').createRecord('trip', tripData);
          newTrip.save();
        }).then(function () {
          _this.transitionTo('trips');
        });
      },
      cancel: function cancel() {
        this.transitionTo('attraction-suggestions');
      }
    }
  });
});
define("togetherness-ember-client/plan-trip/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/plan-trip/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "trip-planning", [], ["attraction", ["subexpr", "@mut", [["get", "model", ["loc", [null, [2, 13], [2, 18]]]]], [], []], "cancel", "cancel", "submit", "submit"], ["loc", [null, [1, 0], [4, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/profile/delete/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    credentials: _ember['default'].computed.alias('auth.credentials'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      trulyDeleteProfile: function trulyDeleteProfile() {
        this.get('auth').deleteProfile();
        this.transitionTo('profile');
        this.transitionTo('/');
      },

      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
        this.store.unloadAll();
      },

      back: function back() {
        this.transitionTo('profile');
      }
    }
  });
});
define("togetherness-ember-client/profile/delete/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/profile/delete/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-10 col-xs-offset-1 white-background-div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Are you sure you want to delete your account?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        var el3 = dom.createTextNode("Your information may be unrecoverable.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "cancel");
        dom.setAttribute(el2, "class", "btn btn-lg btn-danger");
        var el3 = dom.createTextNode("\n      DELETE ACCOUNT\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "cancel");
        dom.setAttribute(el2, "class", "btn btn-warning");
        var el3 = dom.createTextNode("\n      Just Sign Out For Now\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "cancel");
        dom.setAttribute(el2, "class", "btn btn-info");
        var el3 = dom.createTextNode("\n      Cancel\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [11]);
        var element2 = dom.childAt(element0, [16]);
        var element3 = dom.childAt(element0, [18]);
        var morphs = new Array(3);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["element", "action", ["trulyDeleteProfile"], [], ["loc", [null, [7, 56], [7, 87]]]], ["element", "action", ["signOut"], [], ["loc", [null, [13, 50], [13, 70]]]], ["element", "action", ["back"], [], ["loc", [null, [17, 47], [17, 64]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/profile/edit/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    credentials: _ember['default'].computed.alias('auth.credentials'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    model: function model() {
      return this.get('credentials');
    },

    actions: {
      submitProfileEdits: function submitProfileEdits(credentials) {
        this.get('auth').submitProfileEdits(credentials);
        this.transitionTo('profile');
      },

      cancelProfileEdits: function cancelProfileEdits() {
        this.transitionTo('profile');
      }
    }
  });
});
define("togetherness-ember-client/profile/edit/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/profile/edit/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "col-xs-10 col-xs-offset-1 white-background-div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        return morphs;
      },
      statements: [["inline", "edit-profile", [], ["credentials", ["subexpr", "@mut", [["get", "model", ["loc", [null, [3, 16], [3, 21]]]]], [], []], "submitProfileEdits", "submitProfileEdits", "cancelProfileEdits", "cancelProfileEdits"], ["loc", [null, [2, 2], [5, 45]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/profile/route', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Route.extend({

    credentials: (0, _emberLocalStorage.storageFor)('auth'),

    model: function model() {
      var _this = this;

      return this.get('store').findRecord('user', this.get('credentials.id')).then(function (user) {
        return _ember['default'].RSVP.hash({
          user: user,
          friends: _this.get('store').findAll('friendship').then(function (friendships) {
            return friendships.filter(function (friendship) {
              return friendship.user === user || friendship.requestedUser === user;
            });
          }),
          awaitingApproval: _this.get('store').findAll('friend_request').then(function (requests) {
            return requests.filter(function (request) {
              return String(request.get('requestedUser.id')) === String(_this.get('credentials.id'));
            });
          }),
          pendingRequests: _this.get('store').findAll('friend_request').then(function (requests) {
            return requests.filter(function (request) {
              return String(request.get('user.id')) === String(_this.get('credentials.id'));
            });
          })
        });
      });
    },

    actions: {
      removeFriend: function removeFriend() {
        console.log('removeFriend triggered!');
      },
      cancelRequest: function cancelRequest() {
        console.log('cancelRequest triggered!');
      },
      acceptRequest: function acceptRequest() {
        console.log('acceptRequest triggered!');
      },
      declineRequest: function declineRequest() {
        console.log('declineRequest triggered!');
      },
      unRequestFriend: function unRequestFriend() {
        console.log('unrequest');
      },
      editProfile: function editProfile() {
        this.transitionTo('profile/edit');
      },
      deleteProfile: function deleteProfile() {
        this.transitionTo('profile/delete');
      }
    }
  });
});
define("togetherness-ember-client/profile/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/profile/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Profile");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        return morphs;
      },
      statements: [["inline", "user-profile", [], ["user", ["subexpr", "@mut", [["get", "model.user", ["loc", [null, [4, 7], [4, 17]]]]], [], []], "friends", ["subexpr", "@mut", [["get", "model.friends", ["loc", [null, [5, 10], [5, 23]]]]], [], []], "awaitingApproval", ["subexpr", "@mut", [["get", "model.awaitingApproval", ["loc", [null, [6, 19], [6, 41]]]]], [], []], "pendingRequests", ["subexpr", "@mut", [["get", "model.pendingRequests", ["loc", [null, [7, 18], [7, 39]]]]], [], []], "removeFriend", "removeFriend", "cancelRequest", "cancelRequest", "acceptRequest", "acceptRequest", "declineRequest", "declineRequest", "changePassword", "changePassword", "editProfile", "editProfile", "deleteProfile", "deleteProfile"], ["loc", [null, [3, 0], [14, 33]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('togetherness-ember-client/router', ['exports', 'ember', 'togetherness-ember-client/config/environment'], function (exports, _ember, _togethernessEmberClientConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _togethernessEmberClientConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('sign-up');
    this.route('sign-in');
    this.route('profile');
    this.route('profile/delete', { path: '/profile/delete' });
    this.route('profile/edit', { path: '/profile/edit' });
    this.route('attractions');
    this.route('attraction-suggestions');
    this.route('cities');
    this.route('trip/more', { path: '/trip/:trip_id/details' });
    this.route('trips');
    this.route('trips/edit', { path: '/trips/:trip_id/edit' });
    this.route('attendances');
    this.route('plan-trip', { path: '/plan-trip/:attraction_id' });
    this.route('people');
    this.route('change-password');
  });

  exports['default'] = Router;
});
define('togetherness-ember-client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('togetherness-ember-client/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('togetherness-ember-client/sign-in/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      reset: function reset() {
        this.transitionTo('index');
      }
    }
  });
});
define("togetherness-ember-client/sign-in/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/sign-in/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Sign In");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "sign-in-form", [], ["submit", "signIn", "reset", "reset"], ["loc", [null, [3, 0], [5, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/sign-up/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        this.get('auth').signUp(credentials).then(function () {
          return _this.get('auth').signIn(credentials);
        }).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      reset: function reset() {
        this.transitionTo('index');
      }
    }
  });
});
define("togetherness-ember-client/sign-up/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/sign-up/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Sign Up");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["inline", "sign-up-form", [], ["submit", "signUp", "reset", "reset"], ["loc", [null, [3, 0], [5, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/tag/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  exports['default'] = _emberData['default'].Model.extend({
    tag: _emberData['default'].attr('string'),
    usages: _emberData['default'].attr('string'),
    relative_usage: _emberData['default'].attr('string'),

    attraction_tags: (0, _emberDataRelationships.hasMany)('attraction-tag'),
    user_tags: (0, _emberDataRelationships.hasMany)('user-tag')
  });
});

// import { belongsTo } from 'ember-data/relationships';
define("togetherness-ember-client/templates/components/ember-inline-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 2
              },
              "end": {
                "line": 10,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("input");
            dom.setAttribute(el1, "class", "ember-inline-edit-input");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element2 = dom.childAt(fragment, [1]);
            var morphs = new Array(4);
            morphs[0] = dom.createAttrMorph(element2, 'type');
            morphs[1] = dom.createAttrMorph(element2, 'value');
            morphs[2] = dom.createAttrMorph(element2, 'oninput');
            morphs[3] = dom.createAttrMorph(element2, 'style');
            return morphs;
          },
          statements: [["attribute", "type", ["get", "field", ["loc", [null, [4, 15], [4, 20]]]]], ["attribute", "value", ["get", "value", ["loc", [null, [5, 16], [5, 21]]]]], ["attribute", "oninput", ["subexpr", "action", ["setValue"], ["value", "target.value"], ["loc", [null, [7, 16], [7, 58]]]]], ["attribute", "style", ["get", "fieldWidth", ["loc", [null, [8, 16], [8, 26]]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.5.1",
              "loc": {
                "source": null,
                "start": {
                  "line": 10,
                  "column": 2
                },
                "end": {
                  "line": 16,
                  "column": 2
                }
              },
              "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("    ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("textarea");
              dom.setAttribute(el1, "class", "ember-inline-edit-input");
              var el2 = dom.createTextNode("\n    ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n  ");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element1 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createAttrMorph(element1, 'value');
              morphs[1] = dom.createAttrMorph(element1, 'oninput');
              return morphs;
            },
            statements: [["attribute", "value", ["get", "value", ["loc", [null, [12, 14], [12, 19]]]]], ["attribute", "oninput", ["subexpr", "action", ["setValue"], ["value", "target.value"], ["loc", [null, [14, 14], [14, 56]]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 10,
                "column": 2
              },
              "end": {
                "line": 16,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["subexpr", "in-arr", [["get", "textAreaFields", ["loc", [null, [10, 20], [10, 34]]]], ["get", "field", ["loc", [null, [10, 35], [10, 40]]]]], [], ["loc", [null, [10, 12], [10, 41]]]]], [], 0, null, ["loc", [null, [10, 2], [16, 2]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 2
              },
              "end": {
                "line": 25,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "hint");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "hintLabel", ["loc", [null, [24, 23], [24, 38]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "class", "ember-inline-edit-save");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  \n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [2]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createElementMorph(element3);
          morphs[2] = dom.createMorphAt(element3, 1, 1);
          morphs[3] = dom.createMorphAt(fragment, 4, 4, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["subexpr", "in-arr", [["get", "textFields", ["loc", [null, [2, 16], [2, 26]]]], ["get", "field", ["loc", [null, [2, 27], [2, 32]]]]], [], ["loc", [null, [2, 8], [2, 33]]]]], [], 0, 1, ["loc", [null, [2, 2], [16, 9]]]], ["element", "action", ["save"], ["bubbles", false], ["loc", [null, [18, 10], [18, 41]]]], ["content", "saveLabel", ["loc", [null, [20, 4], [20, 17]]]], ["block", "if", [["get", "hintLabel", ["loc", [null, [23, 8], [23, 17]]]]], [], 2, null, ["loc", [null, [23, 2], [25, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 27,
                "column": 2
              },
              "end": {
                "line": 31,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "gray-text");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
            return morphs;
          },
          statements: [["content", "placeholder", ["loc", [null, [29, 6], [29, 21]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 31,
                "column": 2
              },
              "end": {
                "line": 33,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "value", ["loc", [null, [32, 4], [32, 13]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.5.1",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 2
              },
              "end": {
                "line": 39,
                "column": 2
              }
            },
            "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "ember-inline-edit-toggle-btn");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            dom.setNamespace("http://www.w3.org/2000/svg");
            var el2 = dom.createElement("svg");
            dom.setAttribute(el2, "xmlns", "http://www.w3.org/2000/svg");
            dom.setAttribute(el2, "width", "12");
            dom.setAttribute(el2, "height", "12");
            dom.setAttribute(el2, "viewBox", "0 0 16 16");
            var el3 = dom.createElement("g");
            dom.setAttribute(el3, "fill", "#414141");
            var el4 = dom.createElement("path");
            dom.setAttribute(el4, "d", "M8.1 3.5L.3 11.3c-.2.2-.3.4-.3.7v3c0 .6.4 1 1 1h3c.3 0 .5-.1.7-.3l7.8-7.8-4.4-4.4z");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("path");
            dom.setAttribute(el4, "data-color", "color-2");
            dom.setAttribute(el4, "d", "M15.7 3.3l-3-3c-.4-.4-1-.4-1.4 0L9.5 2.1l4.4 4.4 1.8-1.8c.4-.4.4-1 0-1.4z");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createAttrMorph(element0, 'onclick');
            return morphs;
          },
          statements: [["attribute", "onclick", ["subexpr", "action", ["startEditing"], [], ["loc", [null, [36, 18], [36, 43]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 26,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "valueIsEmpty", ["loc", [null, [27, 8], [27, 20]]]]], [], 0, 1, ["loc", [null, [27, 2], [33, 9]]]], ["block", "if", [["get", "showEditButton", ["loc", [null, [35, 8], [35, 22]]]]], [], 2, null, ["loc", [null, [35, 2], [39, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 41,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/templates/components/ember-inline-edit.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "isEditing", ["loc", [null, [1, 6], [1, 15]]]]], [], 0, 1, ["loc", [null, [1, 0], [40, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('togetherness-ember-client/trip/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    notes: _emberData['default'].attr('string'),
    start_date: _emberData['default'].attr('string'),
    end_date: _emberData['default'].attr('string'),

    city: (0, _emberDataRelationships.belongsTo)('city'),
    user: (0, _emberDataRelationships.belongsTo)('user'),

    attendances: (0, _emberDataRelationships.hasMany)('attendance')
  });
});
define('togetherness-ember-client/trip/more/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('trip', params.trip_id);
    },

    actions: {
      deleteTrip: function deleteTrip(trip) {
        trip.destroyRecord();
        this.transitionTo('trips');
      },
      updateTrip: function updateTrip(trip) {
        this.transitionTo('trips/edit', trip);
      },
      inviteFriend: function inviteFriend(trip) {
        console.log(trip);
      },
      back: function back() {
        this.transitionTo('trips');
      }
    }
  });
});
define("togetherness-ember-client/trip/more/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/trip/more/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "trip-detail", [], ["trip", ["subexpr", "@mut", [["get", "model", ["loc", [null, [2, 7], [2, 12]]]]], [], []], "back", "back", "deleteTrip", "deleteTrip", "updateTrip", "updateTrip", "inviteFriend", "inviteFriend"], ["loc", [null, [1, 0], [6, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/trips/edit/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return this.get('store').findRecord('trip', params.trip_id);
    },

    actions: {
      save: function save(trip) {
        trip.save();
        this.transitionTo('trips');
      },
      cancel: function cancel() {
        this.transitionTo('trips');
      }
    }
  });
});
define("togetherness-ember-client/trips/edit/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/trips/edit/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "trip-editor", [], ["trip", ["subexpr", "@mut", [["get", "model", ["loc", [null, [2, 7], [2, 12]]]]], [], []], "submit", "save", "cancel", "cancel"], ["loc", [null, [1, 0], [4, 19]]]]],
      locals: [],
      templates: []
    };
  })());
});
define('togetherness-ember-client/trips/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('trip');
    },

    actions: {
      deleteTrip: function deleteTrip(trip) {
        trip.destroyRecord();
      },
      updateTrip: function updateTrip(trip) {
        this.transitionTo('trips/edit', trip);
      },
      inviteFriend: function inviteFriend(trip) {
        console.log(trip);
      },
      openTrip: function openTrip(trip) {
        this.transitionTo('trip/more', trip);
      }
    }
  });
});
define("togetherness-ember-client/trips/template", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.5.1",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "togetherness-ember-client/trips/template.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "planned-trip", [], ["trip", ["subexpr", "@mut", [["get", "trip", ["loc", [null, [7, 9], [7, 13]]]]], [], []], "openTrip", "openTrip", "deleteTrip", "deleteTrip", "updateTrip", "updateTrip", "inviteFriend", "inviteFriend"], ["loc", [null, [6, 2], [11, 33]]]]],
        locals: ["trip"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.5.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "togetherness-ember-client/trips/template.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Adventures");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [5, 8], [5, 13]]]]], [], 0, null, ["loc", [null, [5, 0], [12, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('togetherness-ember-client/user-attraction/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    attraction_id: _emberData['default'].attr('number'),
    user_id: _emberData['default'].attr('number'),
    like: _emberData['default'].attr('boolean')
  });
});
define('togetherness-ember-client/user-tag/model', ['exports', 'ember-data', 'ember-data/relationships'], function (exports, _emberData, _emberDataRelationships) {
  // import { hasMany } from 'ember-data/relationships';

  exports['default'] = _emberData['default'].Model.extend({
    tag: (0, _emberDataRelationships.belongsTo)('tag'),
    user: (0, _emberDataRelationships.belongsTo)('user')
  });
});
define('togetherness-ember-client/user/model', ['exports', 'ember', 'ember-data', 'ember-data/relationships'], function (exports, _ember, _emberData, _emberDataRelationships) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string'),
    givenname: _emberData['default'].attr('string'),
    surname: _emberData['default'].attr('string'),

    attendances: (0, _emberDataRelationships.hasMany)('attendance'),
    trips: (0, _emberDataRelationships.hasMany)('trip'),
    user_tags: (0, _emberDataRelationships.hasMany)('user_tag'),
    friend_requests: (0, _emberDataRelationships.hasMany)('friend_request', {
      inverse: 'user'
    }),
    friendships: (0, _emberDataRelationships.hasMany)('friendship', {
      inverse: 'user'
    }),
    attraction_suggestions: (0, _emberDataRelationships.hasMany)('attraction_suggestion', {
      inverse: 'user'
    }),
    fullName: _ember['default'].computed('givenname', 'surname', function () {
      return this.get('givenname') + ' ' + this.get('surname');
    })
  });
});

// import { belongsTo } from 'ember-data/relationships';
define('togetherness-ember-client/utils/disqus-cache', ['exports', 'ember-disqus/utils/disqus-cache'], function (exports, _emberDisqusUtilsDisqusCache) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusUtilsDisqusCache['default'];
    }
  });
});
define('togetherness-ember-client/utils/load-disqus-api', ['exports', 'ember-disqus/utils/load-filepicker-api'], function (exports, _emberDisqusUtilsLoadFilepickerApi) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberDisqusUtilsLoadFilepickerApi['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('togetherness-ember-client/config/environment', ['ember'], function(Ember) {
  var prefix = 'togetherness-ember-client';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("togetherness-ember-client/app")["default"].create({"name":"togetherness-ember-client","version":"0.0.0+465911f7"});
}

/* jshint ignore:end */
//# sourceMappingURL=togetherness-ember-client.map