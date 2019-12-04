var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: "",
    author: "",
    selected: {}
  },
  methods: {
    color(item) {
      if (item.upvotes > 0) {
        return "color: green"
      }
      else {
        return "color: red"
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items")
        this.items = response.data.reverse()
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
          author: this.selected.author,
          text: this.selected.text
        })
        return true
      }
      catch (error) {
        console.log(error)
      }
    },
    async upVote(item) {
      try {
        let response = await axios.put("/api/upvote", {
          author: item.author,
          text: item.text
        });
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    },
    async downVote(item) {
      try {
        let response = await axios.put("/api/downvote", {
          author: item.author,
          text: item.text
        });
        this.getItems();
        return true;
      }
      catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getItems()
  }
});
