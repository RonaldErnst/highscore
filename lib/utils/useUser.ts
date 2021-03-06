import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { SessionUser } from "@lib/auth";

export function useUser({ redirectTo = "", redirectIfFound = false } = {}) {
	const {
		data: user,
		mutate: mutateUser,
		isValidating,
	} = useSWR<SessionUser>("/api/user");

	useEffect(() => {
		// if no redirect needed, just return (example: already on /dashboard)
		// if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
		if (isValidating) return;

		if (
			// If redirectTo is set, redirect if the user was not found.
			(redirectTo && !redirectIfFound && user === undefined) ||
			// If redirectIfFound is also set, redirect if the user was found
			(redirectIfFound && user !== undefined)
		) {
			Router.push(redirectTo);
		}
	}, [user, redirectIfFound, redirectTo, isValidating]);

	return { user, mutateUser };
}
