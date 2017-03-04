import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return this.get('store').findAll('city')
    .then((result) => {
      let resultArray = result.toArray();
      let filteredArray = [];
      resultArray.forEach((city) => {
        let newCity = city;
        newCity.attractions = city.get('attractions').toArray().filter((attraction) => {
          if(attraction.medium_image_url) { return true; }
        }).sort(() => {
          return 0.5 - Math.random();
        }).slice(0,2);
        filteredArray.push(newCity);
      });
      return filteredArray;
    });
  },
});
