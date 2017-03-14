import Ember from 'ember';

export default Ember.Route.extend({

  filterByCity: false,
  filterByCategory: false,
  showFilters: false,
  selectedCities: [],
  selectedCategories: [],

  model () {

    return Ember.RSVP.hash({
      showFilters: this.get('showFilters'),
      filterByCity: this.get('filterByCity'),
      filterByCategory: this.get('filterByCategory'),
      selectedCities: this.get('selectedCities'),
      selectedCategories: this.get('selectedCategories'),
      categories: this.get('store').findAll('category'),
      cities: this.get('store').findAll('city'),
      recBool: this.get('store').findAll('attraction-suggestion', { reload: true } )
      .then((result) => {
        let allAttractions = result.toArray();
        let recBool = allAttractions.length > 0 ? true : false;
        return recBool;
      }),
      attractions: this.get('store').findAll('attraction-suggestion', { reload: true } )
      .then((result) => {
        let allAttractions = result.toArray();
        let sampleAttractions = allAttractions.sort(() => {
          return 0.5 - Math.random();
        });
        let attractions = [];
        sampleAttractions.forEach((suggestion) => {
          attractions.push(suggestion.get('attraction'));
        });
        return attractions;
      })
      .then((attractions) => {
        if(this.get('filterByCity')) {
          let selectedCities = this.get('selectedCities');
          return attractions.filter((attraction) => {
            return selectedCities.toArray().includes(String(attraction.get('city.id')));
          });
        } else {
          return attractions;
        }
      })
      .then((attractions) => {
        if(this.get('filterByCategory')) {
          let selectedCategories = this.get('selectedCategories');
          return attractions.filter((attraction) => {
            let attractionCategories = attraction.get('attraction_categories');
            let categories = attractionCategories.mapBy('category').toArray();
            let result = false;
            categories.forEach((category) => {
              if (selectedCategories.toArray().includes(String(category.get('id')))) {
                result = true;
              }
            });
            return result;
          });
        } else {
          return attractions;
        }
      }),
    });
  },

  actions: {
    createTrip(attraction){
      this.transitionTo('plan-trip', attraction);
    },
    toggleCityFilter(){
      if(this.get('filterByCity')) {
        this.set('selectedCities', []);
      }
      this.set('filterByCity', !this.get('filterByCity'));
      this.refresh();
    },
    toggleCategoryFilter(){
      if(this.get('filterByCategory')) {
        this.set('selectedCategories', []);
      }
      this.set('filterByCategory', !this.get('filterByCategory'));
      this.refresh();
    },
    toggleShowFilters(){
      this.set('showFilters', !this.get('showFilters'));
      this.refresh();
    },
  },
});
