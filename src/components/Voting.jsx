import { useEffect, useState } from "react";

const Voting = () => {
  const [categories, setCategories] = useState([])
  const [nominees, setNominees] = useState([])

  useEffect(() => {
    // fetches all categories
    fetch('http://localhost:5001/categories')
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  // logs for categories/nominees, also fetches nominees once categories state is changed
  useEffect(() => {
    // console.log("Updated categories:", categories)
    // Fetch nominees for each category
    categories.forEach(category => {
      fetch(`http://localhost:5001/nominees/${category.id}`)
        .then(response => response.json())
        .then(data => {
          setNominees(prevState => ({
            ...prevState,
            [category.id]: data
          }))
        });
    });
  }, [categories])
  // useEffect(() => {
  //   console.log("Updated nominees:", nominees)
  // }, [nominees])

  // votes for a nominee
  const vote = async (nomineeId) => {
    await fetch('http://localhost:5001/vote', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nomineeId })
    })

    setNominees(prevState => 
      Object.fromEntries(
        Object.entries(prevState).map(([categoryId, nominees]) => [
          categoryId,
          nominees.map(n => (n.id === nomineeId ? { ...n, votes: n.votes + 1 } : n))
        ])
      )
    )
  }

  return (
    <>
    { categories.length <= 0 ? <h1>No categories available</h1> : (
      <div>
        {categories.map(category =>(
          <div key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {nominees[category.id]?.map(nominee => (
                <li key={nominee.id}>
                  {nominee.name} - {nominee.votes}
                  <button onClick={() => vote(nominee.id)}>Vote!</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) }
    </>
  )
}

export default Voting