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
      keywords: this.get('store').findRecord('user', this.get('credentials.id'))
      .then((user) => {
        return user.get('keywords_string').split(' ').toArray().filter((word) => {
          return this.get('keywordSearch').toLowerCase() === word.substr(0,this.get('keywordSearch').length).toLowerCase();
        });
      })
      .then((keywordArray) => {
        return keywordArray.toArray().sort((a, b) => {
          return a > b;
        });
      })
      .then((keywordArray) => {
        return keywordArray.filter((word) => {
          return word.length > 0 && word !== ' ';
        });
      })
      .then((keywordArray) => {
        let keywordHashArray = [];
        keywordArray.forEach((word) => {
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
        return keywordHashArray;
      }),
      keywordsBool: this.get('store').findRecord('user', this.get('credentials.id'))
      .then((user) => {
        return user.get('keywords_string').split(' ').toArray().filter((word) => {
          return this.get('keywordSearch').toLowerCase() === word.substr(0,this.get('keywordSearch').length).toLowerCase();
        });
      })
      .then((keywordArray) => {
        return keywordArray.toArray().sort((a, b) => {
          return a > b;
        });
      })
      .then((keywordArray) => {
        return keywordArray.filter((word) => {
          return word.length > 0 && word !== ' ';
        });
      })
      .then((sortedKeywordArray) => {
        if (sortedKeywordArray.length === 0 ||
           (sortedKeywordArray.length === 1 && sortedKeywordArray[0] === '') ) {
          return false;
        } else {
          return true;
        }
      }),
    });
  },

  actions: {
    viewProfile () {
      this.transitionTo('profile');
    },
    addKeyword (keyword) {
      this.get('store').findRecord('user', this.get('credentials.id'))
      .then((currentUser) => {
        let keywordsArray = currentUser.get('keywords_string').split(' ');
        if (keywordsArray.includes(keyword)) {
          this.get('flashMessages').warning('You already have that keyword!');
        } else {
          let keywordsString = currentUser.get('keywords_string') + ' ' + keyword;
          this.get('auth').updateKeywords(this.get('credentials'), keywordsString.trim())
          .then(() => {
            this.get('flashMessages').success('You successfully added: ' + keyword);
            this.get('store').unloadAll();
            this.refresh();
          });
        }
      });
    },
    removeKeyword (keyword) {
      this.get('store').findRecord('user', this.get('credentials.id'))
      .then((currentUser) => {
        let keywordsString = currentUser.get('keywords_string');
        keywordsString = keywordsString.replace(keyword, '');
        keywordsString = keywordsString.replace('  ', ' ');
        this.get('auth').updateKeywords(this.get('credentials'), keywordsString.trim())
        .then(() => {
          this.get('flashMessages').success('You successfully removed: ' + keyword.word);
          this.get('store').unloadAll();
          this.refresh();
        });
      });
    },
    removeSelectedKeywords () {
      let selectedKeywordHashes = this.get('selectedKeywords');
      let selectedKeywords = [];
      selectedKeywordHashes.forEach((wordHash) => {
        selectedKeywords.push(wordHash.word);
      });
      this.get('store').findRecord('user', this.get('credentials.id'))
      .then((currentUser) => {
        let keywordsString = currentUser.get('keywords_string');
        selectedKeywords.forEach((keyword) => {
          keywordsString = keywordsString.replace(keyword, '');
          keywordsString = keywordsString.replace('  ', ' ');
          this.get('auth').updateKeywords(this.get('credentials'), keywordsString.trim())
          .then(() => {
            this.get('flashMessages').success('You successfully removed selected keywords!');
            this.get('store').unloadAll();
            this.refresh();
          });
        });
      });
    },
    removeAllKeywords () {
      this.get('auth').updateKeywords(this.get('credentials'), '')
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
