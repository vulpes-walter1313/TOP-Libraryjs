import { assertFails, assertSucceeds, initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { readFileSync } from "node:fs";

describe('Database rules', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
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
  
  test("deny write of an incomplete book document", async () => {
    const john = testEnv.authenticatedContext("john");
    
    const docRef = doc(collection(john.firestore(), "users", "john", "books"));
    expect(await assertFails(setDoc(docRef, {
      title: "My Favorite book",
      author: "some author",
      id: docRef.id
    })))
  })
  
  test("allow updating an authorized doc", async () => {
    const john = testEnv.authenticatedContext("john");
    // Setup document before creating an update
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
    // actual test
    expect(await assertSucceeds(updateDoc(docRef, {
      author: "Sheakspear",
      read: false,
      updatedAt: serverTimestamp()
    })));
  });
  
  test("deny when updating id in authorized document", async ()=> {
    const john = testEnv.authenticatedContext("john");
    
    // Setup document before creating an update
    const docRef = doc(collection(john.firestore(), "users", "john", "books"));
    await setDoc(docRef, {
      title: "some cool title",
      author: "some cool author",
      pages: 123,
      read: true,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id 
    });
    
    // actual test
    expect(await assertFails(updateDoc(docRef, {
      author: "Sheakspear",
      read: false,
      id: "someotherid",
      updatedAt: serverTimestamp()
    })));

  })
  
  test("deny writing to an unauthorized collection", async () => {
    const jade = testEnv.unauthenticatedContext()
    const docRef = doc(collection(jade.firestore(), "users", "john", "books"));
    expect(await assertFails(setDoc(docRef, {
      title: "some title",
      author: "some author",
      pages: 123,
      read: true,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id 
    })));
  });

  test("deny updating an unauthorized doc", async () => {
    const jade = testEnv.authenticatedContext("jade");
    const john = testEnv.authenticatedContext("john");
    
    const docRef = doc(collection(john.firestore(), "users", "john", "books"));
    await setDoc(docRef, {
      title: "Coolio and the beast",
      author: "Coolio",
      pages: 345,
      read: false,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: docRef.id
    })
    const unauthDocRef = doc(collection(jade.firestore(), "users", "john", "books"), docRef.id);
    expect(await assertFails(updateDoc(unauthDocRef, {
      title: "mistake and the gang",
      updatedAt: serverTimestamp()
    })));
  });
  
});