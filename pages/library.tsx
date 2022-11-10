import React, { useContext, useEffect, useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import Bookshelf from '../components/Bookshelf';
import { FiPlus } from "react-icons/fi";
import styles from "../styles/library.module.css";
import { useForm } from 'react-hook-form';
import { setDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { UserContext } from '../lib/UserContext';
import { User } from 'firebase/auth';

interface AddBookFormInput {
  title: string;
  author: string;
  pages: number;
  read: boolean;
}

export default function LibraryPage() {
  const {user} = useContext(UserContext);
  const [showAddBook, setShowAddBook] = useState(true);
  const {register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset}
    = useForm<AddBookFormInput>({
      defaultValues: {
        title: "",
        author: "",
        pages: 0,
        read: false
      }
    })

  const submitHandle = async (data: AddBookFormInput) => {
    const docRef = await doc(collection(firestore, "users", (user as User).uid, 'books'))
    await setDoc(docRef, {
      title: data.title,
      author: data.author,
      pages: data.pages,
      read: data.read,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id
    });
    console.log("Book added with ID: ", docRef.id);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setShowAddBook(false);
    }
  }, [isSubmitSuccessful]);
  return (
    <AuthCheck>
      <>
        <Bookshelf />
        {showAddBook ? (
          <div className={styles.addBookFormContainer}>
            <form onSubmit={handleSubmit(submitHandle)}>
              <label htmlFor='title'>Book Title</label>
              <input type="text" {...register("title")}/>
              <label htmlFor='author'>Author</label>
              <input type="text" {...register("author")}/>
              <label htmlFor='pages'>Number of Pages</label>
              <input type="number" {...register("pages", {valueAsNumber: true})}/>
              <label htmlFor='read'>Read</label>
              <input type="checkbox" {...register("read")}/>
              <div>
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowAddBook(!showAddBook)}>Cancel</button>
              </div>
            </form>
          </div>
        ) : null}
        <button className={styles.addBookBtn} type="button" onClick={() => setShowAddBook(!showAddBook)}><FiPlus /></button>
      </>
    </AuthCheck>
  );
}
