import React, { useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import { useCollectionData} from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, DocumentData } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { User } from 'firebase/auth';
import styles from "./Bookshelf.module.css";

export default function Bookshelf() {
  const {user} = useContext(UserContext);
  const [values, loading, error] = useCollectionData(collection(firestore, 'users', (user as User).uid, 'books'));
  const [selectedBook, setSelectedBook] = useState<DocumentData | undefined>();

  console.log(values);
  return (
    <main className={styles.mainContainer}>
      {loading ? <div>Loading...</div> : null}
      {error ? <div>oops, Looks like there is an error chief...</div> : null}
      <div className={styles.displayContainer}>
        <ul>
          {values ? values.map(val => <li className={styles.listItem} key={val.id} onClick={() => setSelectedBook(val)}>Title: {val.title}. Author: {val.author}</li>) : null}
        </ul>
        <div className={styles.selectedContainer}>
          {selectedBook ? (
          <>
            <p className={styles.selectedTitle}>{selectedBook?.title}</p>
            <p>by {selectedBook?.author}</p>
            <p>Pages: {selectedBook?.pages}</p>
            <p>Read: {selectedBook?.read.toString()}</p>
            <button type='button' onClick={ async () => {
              if (selectedBook) {
                await deleteDoc(doc(firestore, "users", (user as User).uid, "books", selectedBook.id))
                setSelectedBook(undefined);
              }
            }}>remove</button>
          </>
          ) : <p>please select a book</p>}
        </div>
      </div>
    </main>
  )
}
