import React, { useContext, useState } from "react";
import { UserContext } from "../lib/UserContext";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, DocumentData, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { User } from "firebase/auth";
import styles from "./Bookshelf.module.css";

// React.memo here is ensuring the bookshelf component doesn't rerender when
// the addBookBtn is clicked on the Library page component
export default React.memo(function Bookshelf() {
  const { user } = useContext(UserContext);
  const [values, loading, error] = useCollectionData(
    collection(firestore, "users", (user as User).uid, "books")
  );
  const [selectedBook, setSelectedBook] = useState<DocumentData | undefined>();

  console.log("Bookshelf Component Render", values);
  return (
    <main className={styles.mainContainer}>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>oops, Looks like there is an error chief...</div> : null}
      <div className={styles.displayContainer}>
        <ul>
          {values
            ? values.sort((a,b) => {
              const nameA = a.title.toLowerCase();
              const nameB = b.title.toLowerCase();
              if (nameA < nameB) {
                return -1;
              } else if (nameA > nameB) {
                return 1;
              } else {
                return 0;
              }
            }).map((val) => (
                <li
                  className={styles.listItem}
                  key={val.id}
                  onClick={() => setSelectedBook(val)}
                >
                  <div>
                  <span className={styles.listItemTitle}>{val.title}</span>
                  <span> by {val.author}</span>
                  </div>
                  <span>{val.read ? "Read" : "Not Read"}</span>
                </li>
              ))
            : null}
        </ul>
        <div className={styles.selectedContainer}>
          {selectedBook ? (
            <>
              <div>
                <p className={styles.selectedTitle}>{selectedBook.title}</p>
                <p className={styles.selectedAuthor}>by {selectedBook.author}</p>
              </div>
              <div>
                <p>Pages: {Intl.NumberFormat('en-US').format(selectedBook.pages)}</p>
                <label htmlFor="selected-read">Read:</label>
                <input
                  id="selected-read"
                  className={styles.selectedCheckbox}
                  type="checkbox"
                  checked={selectedBook.read}
                  onChange={ async (e) => {
                    selectedBook.read = !selectedBook.read;
                    await updateDoc(doc(firestore, "users", (user as User).uid, "books", selectedBook.id), {
                      read: selectedBook.read,
                      updatedAt: serverTimestamp()
                    });
                    console.log("Selected Book Checked input: ", selectedBook.read);
                  }}/>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (selectedBook) {
                    await deleteDoc(
                      doc(
                        firestore,
                        "users",
                        (user as User).uid,
                        "books",
                        selectedBook.id
                      )
                    );
                    setSelectedBook(undefined);
                  }
                }}
              >
                remove
              </button>
            </>
          ) : (
            <p>please select a book</p>
          )}
        </div>
      </div>
    </main>
  );
});
