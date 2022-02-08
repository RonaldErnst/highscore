import React, { useContext, useState, useEffect } from "react";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword
} from "firebase/auth";
import { fireauth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function registerUser(username, email, password) {
		return createUserWithEmailAndPassword(fireauth, email, password).then(
			(userCredential) => {
				updateProfile(userCredential.user, {
					displayName: username,
				});

				return userCredential;
			}
		);
	}

	function loginUser(email, password) {
		return signInWithEmailAndPassword(fireauth, email, password);
	}

	function logoutUser() {
		return signOut(fireauth);
	}

	function resetUserPassword(email) {
		return sendPasswordResetEmail(fireauth, email);
	}

	function updateUserEmail(email) {
		return updateEmail(fireauth.currentUser, email);
	}

	function updateUserPassword(password) {
		return updatePassword(fireauth.currentUser, password);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(fireauth, (user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		registerUser,
		loginUser,
		logoutUser,
		resetUserPassword,
		updateUserEmail,
		updateUserPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}