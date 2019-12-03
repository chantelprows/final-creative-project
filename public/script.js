var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: "",
    author: "",
    selected: {}
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items")
        this.items = response.data
        return true
      }
      catch (error) {
        console.log(error)
      }
    },
    async add() {
      try {
        let r = await axios.post('/api/items', {
          author: this.author,
          text: this.text
        });
        this.getItems()
        this.author = ""
        this.text = ""
      }
      catch (error) {
        console.log(error)
      }
    },
    async submit() {
      try {
        let response = await axios.put("/api/submit", {
          items: this.checkedItems
        })
        this.checkedItems = []
        return true
      }
      catch (error) {
        console.log(error)
      }
    },
    async submit() {
      try {
        let response = await axios.put("/api/submit", {
          author: this.selected.author,
          text: this.selected.text
        })
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
