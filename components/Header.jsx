import React, { useState } from "react";

export default function Header({ highscore }) {
	const [showHighscore, setShowHighscore] = useState(false);
	function changeTitle() {
		if (!highscore)
            return;
		setShowHighscore(!showHighscore);
	}

	return (
		<header
			onClick={changeTitle}
			className="w-screen
                            fixed inset-x-0 top-0
                            items-center justify-center
                            text-2xl text-center
                            font-semibold
                            bg-emerald-400
                            "
		>
            <div className="p-3 m-auto">
                <div className={`${showHighscore? "rotateUp" : ""}`}>
                    HighScore
                </div>
                {highscore && (
                <div className={`${showHighscore? "" : "rotateUp"}`}>
                    {highscore}
                </div>
            )}
            </div>
		</header>
	);
}