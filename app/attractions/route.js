import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend({

  credentials: storageFor('auth'),
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
      attractions: this.get('store').findAll('attraction')
    .then((result) => {
      return result.toArray().sort(() => {
        return 0.5 - Math.random();
      }).slice(0,250);
    })
    .then((result) => {
      return result.filter((attraction) => {
        let cats = attraction.get('attraction_categories');
        let imgUrl = attraction.get('medium_image_url');
        let desc = attraction.get('description');
        return cats.content.length > 0 && imgUrl.length > 0 && desc.length > 0;
      });
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
    likeAttraction(attraction){
      let user_attraction = {
        user_id: this.get('credentials.id'),
        attraction_id: Number(attraction.id),
        like: true
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
    },
    dislikeAttraction(attraction) {
      let user_attraction = {
        user_id: this.get('credentials.id'),
        attraction_id: Number(attraction.id),
        like: false
      };
      let attraction_rating = this.get('store').createRecord('user_attraction', user_attraction);
      attraction_rating.save();
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
