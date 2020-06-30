import { LightningElement, wire} from 'lwc';

import findContacts from '@salesforce/apex/ContactController.findContacts';
const DELAY = 300;


export default class HelloWorld extends LightningElement {

  connectedCallback() {
  }

  disconnectedCallback() {
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