import { useEffect, useState } from "react";

const Voting = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
  }, [])

  return (
    <>
    { categories.length <= 0 ? <h1>No categories available</h1> : (
      <div>
      </div>
    ) }
    </>
  )
}

export default Voting