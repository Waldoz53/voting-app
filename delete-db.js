import sqlite3 from "sqlite3";

sqlite3.verbose()
const db = new sqlite3.Database('./voting.db', (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Delete a specific category (by name or ID)
const deleteCategoryById = (categoryId) => {
  db.run('DELETE FROM categories WHERE id = ?', [categoryId], function (err) {
    if (err) return console.error(err.message);
    console.log(`Deleted category with ID: ${categoryId}`);
  });
};

// Delete a specific nominee (by name or ID)
const deleteNomineeById = (nomineeId) => {
  db.run('DELETE FROM nominees WHERE id = ?', [nomineeId], function (err) {
    if (err) return console.error(err.message);
    console.log(`Deleted nominee with ID: ${nomineeId}`);
  });
};

// Delete all categories & nominees (DANGER: This wipes all data!)
const deleteAllData = () => {
  db.run('DELETE FROM nominees');
  db.run('DELETE FROM categories', function (err) {
    if (err) return console.error(err.message);
    console.log('All categories and nominees deleted.');
  });
};

// Choose what to delete
// deleteCategoryById(1);  // Change ID as needed
// deleteNomineeById(3); // Change ID as needed
// deleteAllData();       // Uncomment to wipe everything

db.close();