import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  credentials: Ember.computed.alias('auth.credentials'),
  isAuthenticated: Ember.computed.alias('auth.isAuthenticated'),
  flashMessages: Ember.inject.service(),
  keywordSearch: '',
  selectedKeywords: [],

  model () {
    return Ember.RSVP.hash({
      categories: this.get('store').findAll('category')
      .then((categories) => {
        try {
          this.get('store').findRecord('user', this.get('credentials.id'))
          .then((user) => {
            let userWordsObject = JSON.parse(user.get('keywords_string'));
            return categories.forEach((category) => {
              let userWordString = userWordsObject[category.id];
              if (!userWordString) {
                category.set('categoryBool', false);
                category.set('keywordHashArray', []);
              } else {
                category.set('categoryBool', true);
                let userWordArray = userWordString.split(' ').toArray().filter((word) => {
                  return this.get('keywordSearch').toLowerCase() === word.substr(0,this.get('keywordSearch').length).toLowerCase();
                });
                userWordArray = userWordArray.toArray().sort((a, b) => { return a > b; });
                userWordArray = userWordArray.filter((word) => { return word.length > 0 && word !== ' '; });
                let keywordHashArray = [];
                userWordArray.forEach((word) => {
                  let keywordHash = {
                    word: word,
                    selected: false
                  };
                  let selectedKeywordHashes = this.get('selectedKeywords');
                  let selectedKeywords = [];
                  selectedKeywordHashes.forEach((wordHash) => {
                    selectedKeywords.push(wordHash.word);
                  });
                  if ( selectedKeywords.includes(word) ) {
                    keywordHash.selected = true;
                  }
                  keywordHashArray.push(keywordHash);
                });
                category.set('keywordHashArray', keywordHashArray);
              }
            });
          });
          return categories;
        } catch (error) {
          console.error(error);
        }
      }),
      keywordsBool: this.get('store').findRecord('user', this.get('credentials.id'))
      .then((user) => {
        try {
          let userWordsObject = JSON.parse(user.get('keywords_string'));
          if (Object.values(userWordsObject)[0]) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.error(error);
        }
      }),
    });
  },

  actions: {
    viewProfile () {
      this.transitionTo('profile');
    },
    updateStrings (currentUser, keyword, category, keywordsObject) {
      if (keywordsObject[category]) {
        let keywordsString = keywordsObject[category] + ' ' + keyword;
        let updatedKeywordObject = keywordsObject;
        updatedKeywordObject[category] = keywordsString.trim();
        let updatedKeywordString = JSON.stringify(updatedKeywordObject);
        this.get('auth').updateKeywords(this.get('credentials'), updatedKeywordString)
        .then(() => {
          this.get('flashMessages').success('You successfully added: ' + keyword);
          this.refresh();
        });
      } else {
        keywordsObject[category] = keyword.trim();
        let updatedKeywordObject = keywordsObject;
        let updatedKeywordString = JSON.stringify(updatedKeywordObject);
        this.get('auth').updateKeywords(this.get('credentials'), updatedKeywordString)
        .then(() => {
          this.get('flashMessages').success('You successfully added: ' + keyword);
          this.get('store').unloadAll();
          this.refresh();
        });
      }
    },
    addKeyword (keyword, category) {
      try {
        let keywords = keyword.split(' ');
        this.get('store').findRecord('user', this.get('credentials.id'))
        .then((currentUser) => {
          let keywordsObject = JSON.parse(currentUser.get('keywords_string'));
          keywords.forEach((word) => {
            if (keywordsObject[category]) {
              if (keywordsObject[category].includes(word)) {
                this.get('flashMessages').warning('You already have that keyword!');
              } else {
                this.send('updateStrings', currentUser, word, category, keywordsObject);
              }
            } else {
              this.send('updateStrings', currentUser, word, category, keywordsObject);
            }
          });
        });
      } catch (error) {
        this.get('flashMessages').danger('Failed to save: ' + keyword + ', because of error: ' + error);
      }
    },
    removeKeyword (keyword) {
      try {
        this.get('store').findRecord('user', this.get('credentials.id'))
        .then((currentUser) => {
          let keywordsString = currentUser.get('keywords_string');
          keywordsString = keywordsString.replace(keyword, '');
          keywordsString = keywordsString.replace('  ', ' ');
          this.get('auth').updateKeywords(this.get('credentials'), keywordsString.trim())
          .then(() => {
            this.get('flashMessages').success('You successfully removed: ' + keyword);
            this.get('store').unloadAll();
            this.refresh();
          });
        });
      } catch (error) {
        this.get('flashMessages').danger('Failed to remove keyword: ' + keyword + ', because of error: ' + error);
      }
    },
    removeSelectedKeywords () {
      try {
        let selectedKeywordHashes = this.get('selectedKeywords');
        selectedKeywordHashes.forEach((wordHash) => {
          this.send('removeKeyword', wordHash.word);
          this.set('selectedKeywords', []);
          this.get('store').unloadAll();
          this.refresh();
        });
      } catch (error) {
        this.get('flashMessages').danger('Failed to remove selected keywords because of error: ' + error);
      }
    },
    removeAllKeywords () {
      this.get('auth').updateKeywords(this.get('credentials'), '{}')
      .then(() => {
        this.get('flashMessages').success('You successfully removed all of your keywords!');
        this.get('store').unloadAll();
        this.refresh();
      });
    },
    updateKeywordSearch (keywordSearch) {
      this.set('keywordSearch', keywordSearch);
      this.refresh();
    },
    selectKeyword (keyword) {
      let selectedKeywords = this.get('selectedKeywords');
      selectedKeywords.push(keyword);
      this.set('selectedKeywords',selectedKeywords);
      this.refresh();
    },
    unSelectKeyword (keyword) {
      let selectedKeywords = this.get('selectedKeywords');
      selectedKeywords.splice(selectedKeywords.indexOf(keyword),1);
      this.set('selectedKeywords',selectedKeywords);
      this.refresh();
    },
  },
});
