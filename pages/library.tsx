import React, { useState } from 'react'
import AuthCheck from '../components/AuthCheck'
import Bookshelf from '../components/Bookshelf';
import { FiPlus } from "react-icons/fi";
import styles from "../styles/library.module.css";
import { useForm } from 'react-hook-form';

interface AddBookFormInput {
  title: string;
  author: string;
  pages: number;
  read: boolean;
}

export default function LibraryPage() {
  const [showAddBook, setShowAddBook] = useState(true);
  const {register, handleSubmit, formState: { errors }} = useForm<AddBookFormInput>()
  
  return (
    <AuthCheck>
      <>
        <Bookshelf />
        {showAddBook ? (
          <div className={styles.addBookFormContainer}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
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
