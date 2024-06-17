import { initializeApp } from "firebase/app";
import { CollectionReference, collection, getFirestore } from "firebase/firestore";
import { Todo } from "../types/Todo.types";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore Instance
export const db = getFirestore(app);

// Our collection references
export const todosCol = collection(db, "todos") as CollectionReference<Todo>;

export default app;
