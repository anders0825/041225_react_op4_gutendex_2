/* JSX
BookDetailsPage.jsx
*/


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBooksData } from "../hooks/useBooksData";
import { useAppState } from "../context/AppStateContext";

import Loading from "../Components/Loading.jsx";
import FavoriteBtn from "../Components/FavoriteBtn.jsx";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { books } = useAppState();
  const { byId } = useBooksData();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const cached = books.find((b) => b.id === Number(id));

    if (cached) {
      console.log(cached);
      setDetails(cached);
    } else {
      byId(id).then(setDetails);
    }
  }, [books, id]);

  if (!details) return <Loading />;

  return (
    <section id="BookDetails-cont">
      <section id="cover-cont">
        <FavoriteBtn book={details} />
        {details.coverImage && (
          <img src={details.coverImage} alt={details.title} />
        )}
        <section className="details-digital">
          <p>
            <strong>Downloads:</strong> {details.downloadCount}
          </p>

          <a
            className="details-link"
            target="_blank"
            rel="noopener noreferrer"
            href={details.digitalLink}
          >
            Read Online
          </a>
        </section>
      </section>

      <section id="text-cont">
        <section id="title-cont">
          <h2 className="details-title">{details.title}</h2>
          <p className="details-autor"> - {details.author}</p>
        </section>
        <section id="info-cont">
          <section className="details-category">
            <strong>Categories:</strong>
            <ul className="category-list">
              {details.categories.map((cat) => (
                <li key={cat}>{cat}</li>
              ))}
            </ul>
          </section>
          <section className="details-languages">
            <strong>Languages:</strong>
            <ul className="languages-list">
              {details.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </section>
  );
}
