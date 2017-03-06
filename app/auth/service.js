import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

  signUp (credentials) {
    return this.get('ajax').post('/sign-up', {
      data: {
        credentials: {
          email: credentials.email,
          givenname: credentials.givenname,
          surname: credentials.surname,
          password: credentials.password,
          password_confirmation: credentials.passwordConfirmation,
        },
      },
    });
  },

  signIn (credentials) {
    return this.get('ajax').post('/sign-in', {
      data: {
        credentials: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    })
    .then((result) => {
      this.get('credentials').set('id', result.user.id);
      this.get('credentials').set('email', result.user.email);
      this.get('credentials').set('token', result.user.token);
      this.get('credentials').set('givenname', result.user.givenname);
      this.get('credentials').set('surname', result.user.surname);
      this.get('credentials').set('keywords_string', result.user.keywords_string);
    });
  },

  changePassword (passwords) {
    return this.get('ajax').patch(`/change-password/${this.get('credentials.id')}`, {
      data: {
        passwords: {
          old: passwords.previous,
          new: passwords.next,
        },
      },
    });
  },

  signOut () {
    return this.get('ajax').del(`/sign-out/${this.get('credentials.id')}`)
    .finally(() => this.get('credentials').reset());
  },

  submitProfileEdits (credentials) {
    return this.get('ajax').patch(`/users/${this.get('credentials.id')}`, {
      data: {
        credentials: {
          givenname: credentials.get('givenname'),
          surname: credentials.get('surname'),
          email: credentials.get('email'),
        },
      },
    });
  },

  updateKeywords (credentials, keywordString) {
    return this.get('ajax').patch(`/users/${this.get('credentials.id')}`, {
      data: {
        credentials: {
          email: credentials.get('email'),
          keywords_string: keywordString
        },
      },
    });
  },

  deleteProfile () {
    return this.get('ajax').del(`/users/${this.get('credentials.id')}`)
    .finally(() => this.get('credentials').reset());
  },

});
