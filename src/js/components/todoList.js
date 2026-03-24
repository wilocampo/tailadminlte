export default function todoList() {
  return {
    items: [],
    newItem: '',
    filter: 'all', // 'all', 'active', 'completed'
    nextId: 1,

    get filtered() {
      if (this.filter === 'active') {
        return this.items.filter((item) => !item.done);
      }
      if (this.filter === 'completed') {
        return this.items.filter((item) => item.done);
      }
      return this.items;
    },

    get remaining() {
      return this.items.filter((item) => !item.done).length;
    },

    addItem() {
      const text = this.newItem.trim();
      if (!text) return;
      this.items.push({
        id: this.nextId++,
        text,
        done: false,
        color: null,
        priority: 'normal',
      });
      this.newItem = '';
    },

    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },

    toggleItem(id) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.done = !item.done;
      }
    },

    clearCompleted() {
      this.items = this.items.filter((item) => !item.done);
    },
  };
}
