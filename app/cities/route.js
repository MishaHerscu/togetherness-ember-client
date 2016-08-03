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
        }).slice(0,3);
        filteredArray.push(newCity);
      });
      return filteredArray;
    });
  },
});

// example data
//
// return [
//   {
//     name: 'Boston',
//     attractions: [
//       {
//         title: 'test event 1',
//         description: 'example desctiption 1',
//         city_name: 'Boston',
//         event_time: '11:00',
//         event_date: '8/5/16',
//         venue_name: 'the best',
//         venue_address: 'my house',
//       },
//       {
//         title: 'test event 1',
//         description: 'example desctiption 1',
//         city_name: 'Boston',
//         event_time: '11:00',
//         event_date: '8/5/16',
//         venue_name: 'the best',
//         venue_address: 'my house',
//       },
//       {
//         title: 'test event 1',
//         description: 'example desctiption 1',
//         city_name: 'Boston',
//         event_time: '11:00',
//         event_date: '8/5/16',
//         venue_name: 'the best',
//         venue_address: 'my house',
//       }
//     ]
//   },
//   {
//     name: 'Chicago',
//     attractions: [
//       {
//         title: 'test event 2',
//         description: 'example desctiption 2',
//         city_name: 'Chicago',
//         event_time: '11:00',
//         event_date: '8/5/16',
//         venue_name: 'the best',
//         venue_address: 'my house',
//       }
//     ]
//   }];
