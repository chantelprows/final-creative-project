var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    url: null,
    // addItem: null,
    items: [],
    price: ""
  },
  methods: {
    async add() {
      try {
        let r = await axios.post('/api/items', {
          title: this.title,
          price: this.price,
          url: this.url
        });
        this.getItems()
        this.title = ""
        this.price = ""
        this.url = ""
      }
      catch (error) {
        console.log(error)
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items")
        this.items = response.data.sort((a, b) => (a.title > b.title) ? 1 : -1)
        return true
      }
      catch (error) {
        console.log(error)
      }
    },
    async deleteItem(item) {
      try {
        let response = await axios.delete("/api/items/" + item.title)
        this.getItems()
        return true
      }
      catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.getItems()
  }
});
