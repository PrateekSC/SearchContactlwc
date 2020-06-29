import { LightningElement, wire, track } from 'lwc';

import getContactList from '@salesforce/apex/ContactController.getContactList';
import findContacts from '@salesforce/apex/ContactController.findContacts';
const DELAY = 300;


export default class HelloWorld extends LightningElement {
  @track contactsListByLoad;
  @track error;

  greeting = 'Hello World!';

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  greetingChangeHandler(event) {
    this.greeting = event.target.value;
  }

  handleLoadContactClick() {
    getContactList()
        .then(result => {
            this.contactsListByLoad = result;
        })
        .catch(error => {
            this.error = error;
        });
  }
  
  searchKey = '';
  @wire(findContacts, { searchKey: '$searchKey' })
  autoSearchedContacts;

  handleAutoloadInputChange(event) {
      // Debouncing this method: Do not update the reactive property as long as this function is
      // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
      window.clearTimeout(this.delayTimeout);
      const searchKey = event.target.value;
      this.delayTimeout = setTimeout(() => {
          this.searchKey = searchKey;
      }, DELAY);
  }


}