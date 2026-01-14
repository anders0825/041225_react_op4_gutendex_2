/* JSX
SearchBar.jsx
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooksData } from "../../hooks/useBooksData";

import searchIcon from "../../assets/icons/Search_icon.png";

export default function SearchBar() {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { bySearch } = useBooksData();

  async function onSubmit() {
    if (!text.trim()) return;
    setText("");

    navigate(`/041225_react_op4_gutendex_2/books`);
    await bySearch(text);
  }

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(text);
          }
        }}
        placeholder="Search for books..."
      />
      <img src={searchIcon} alt="Search Icon" onClick={() => onSubmit(text)} />
    </>
  );
}
