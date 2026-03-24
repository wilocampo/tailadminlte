export default function directChat() {
  return {
    contactsOpen: false,

    toggleContacts() {
      this.contactsOpen = !this.contactsOpen;
      this.$el
        .closest('.direct-chat')
        .classList.toggle('direct-chat-contacts-open', this.contactsOpen);
    },
  };
}
