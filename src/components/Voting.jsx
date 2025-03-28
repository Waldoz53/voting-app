import { useEffect, useState } from "react";

const Voting = () => {
  const [categories, setCategories] = useState([])
  const [nominees, setNominees] = useState([])
  const [votedCategories, setVotedCategories] = useState(new Set())
  const API_URL = "http://localhost:5001"

  useEffect(() => {
    // fetches all categories
    fetch(`${API_URL}/categories`)
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
      fetch(`${API_URL}/nominees/${category.id}`)
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
  const vote = async (category, nomineeId) => {
    if (votedCategories.has(category)) {
      alert("You've already voted for this category!")
      return
    }

    await fetch(`${API_URL}/vote`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nomineeId })
    })
      .then(res => res.json())
      .then(() => {
        setVotedCategories(prevSet => new Set(prevSet).add(category))
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
      <div class="categories-container">
        {categories.map(category =>(
          <div class="category" key={category.id}>
            <h3>{category.name}</h3>
            <ul>
              {nominees[category.id]?.map(nominee => (
                <li key={nominee.id}>
                  <span>{nominee.name} - {nominee.votes}</span>
                  {!votedCategories.has(category.id) ? (
                    <button
                      onClick={() => vote(category.id, nominee.id)}
                      disabled={votedCategories.has(category.id)}>
                      Vote!
                    </button>
                  ) : ''}
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