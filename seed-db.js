import sqlite3 from "sqlite3"

sqlite3.verbose()
const db = new sqlite3.Database('./voting.db', err => {
  if (err) console.error("database connection error:", err.message)
  else console.log("Connected to SQLite Database!")
})

const categories = ["Best Picture", "Best Director", "Best Actor (Leading)", "Best Actress (Leading)", "Best Actor (Supporting)", "Best Actress (Supporting)", "Best Animated Film", "Best Cinematography", "Best Visual Effects"]

categories.forEach(name => {
  db.run(`INSERT INTO categories (name) VALUES (?)`, [name], function(err) {
    if (err) return console.error(err.message)
    console.log(`Category added: ${name} (ID: ${this.lastID})`)

    let nominees = []

    switch(name) {
      case "Best Picture":
        nominees = ["Anora", "The Brutalist", "Dune Part Two"]
        break;
      case "Best Director":
        nominees = ["Sean Baker", "Brady Corbet"]
        break;
      case "Best Actor (Leading)":
        nominees = ["Adrien Brody", "Timothee Chalamet"]
        break;
      case "Best Actress (Leading)":
        nominees = ["Mikey Madison", "Demi Moore"]
        break;
      case "Best Actor (Supporting)":
        nominees = ["Kieran Culkin", "Jeremy Strong"]
        break;
      case "Best Actress (Supporting)":
        nominees = ["Zoe Saldana", "Felicity Jones"]
        break;
      case "Best Animated Film":
        nominees = ["Flow", "Wallace and Gromit: Vengeance Most Fowl"]
        break;
      case "Best Cinematography":
        nominees = ["The Brutalist", "Nosferatu"]
        break;
      case "Best Visual Effects":
        nominees = ["Dune Part Two", "Alien: Romulus"]
        break;
    }

    nominees.forEach(nominee => {
      db.run(`INSERT INTO nominees (category_id, name) VALUES (?, ?)`,
        [this.lastID, nominee],
        function(err) {
          if (err) return console.error(err.message)
          console.log(`Nominee added: ${nominee}`)
        }
      )
    })
  })
})

db.close()