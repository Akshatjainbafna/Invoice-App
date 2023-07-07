import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
  where,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5XJxHH6uKcYKgHYGf5WRAmYt244eEGdc",
  authDomain: "homoeo-amigo-assignment.firebaseapp.com",
  projectId: "homoeo-amigo-assignment",
  databaseURL: "https://homoeo-amigo-assignment-default-rtdb.firebaseio.com",
  storageBucket: "homoeo-amigo-assignment.appspot.com",
  messagingSenderId: "341033549646",
  appId: "1:341033549646:web:9a6b87aecd5bfd1a2c281f",
};


const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

const invoicesCollectionRef = collection(db, "invoices");

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  try {
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log("error creating the user", error.message);
      }
    }
  } catch (err) {
    console.log('Error getting document', err);
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};


export const getInvoices = async (userId) => {
  const invoicesCol = collection(db, "invoices");
  const q = query(invoicesCol, where("userId", "==", userId));

  const invoiceSnapshot = await getDocs(q);
  const invoiceList = invoiceSnapshot.docs.map((doc) => {
    const data = doc.data()
    const late = new Date() - new Date(data.paymentDue)
    if (late > 0 && data.status == "pending"){
      return {
        id: doc.id,
        ...data,
        status: "late"
      }
    }else{
      return {
        id: doc.id,
        ...data
      }
    }
  });
  console.log(invoiceList)
  return invoiceList;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef);
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const addInvoiceToFireStore = async (data) => {
  await addDoc(invoicesCollectionRef, data);
};

export const deleteInvoiceFromFireStore = async (id) => {
  await deleteDoc(doc(db, "invoices", id));
};

export const updateInvoiceFromFireStore = async (id, data) => {
  const invoiceRef = doc(db, "invoices", id);
  await setDoc(invoiceRef, data, { merge: true });
};
