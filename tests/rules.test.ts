import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { readFileSync } from "node:fs";
// const { assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
// const { setup, teardown } = require('./helpers');

describe('Database rules', () => {
  // let db;
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    // db = await setup();
    testEnv = await initializeTestEnvironment({
      projectId: "top-library-d5756",
      firestore: {
        rules: readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080
      }
    })
  });

  afterAll(async () => {
    // await teardown();
    await testEnv?.clearFirestore();
    await testEnv?.cleanup();
  });
  
  test("allow when writing to an authorized collection", async () => {
    const john = testEnv.authenticatedContext("john");
    
    const docRef = doc(collection(john.firestore(), "users", "john", "books"));
    expect(await assertSucceeds(setDoc(docRef, {
      title: "some title",
      author: "some author",
      pages: 123,
      read: true,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id 
    })));
  });
  
  test("allow updating an authorized doc", async () => {
    const john = testEnv.authenticatedContext("john");

    const docRef = doc(collection(john.firestore(), "users", "john", "books"));
    await setDoc(docRef, {
      title: "some title",
      author: "some author",
      pages: 123,
      read: true,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id 
    });
    
    expect(await assertSucceeds(updateDoc(docRef, {
      author: "Sheakspear",
      read: false,
      updatedAt: serverTimestamp()
    })));
  });
  
  test("deny writing to an unauthorized collection", () => {

  });

  test("deny updating an unauthorized doc", () => {

  });
  
});