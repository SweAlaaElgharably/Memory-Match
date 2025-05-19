const scores = JSON.parse(localStorage.getItem("gameScores") || "[]");

export function saveScore(score, time, level) {
    const entry = {score: score, time: time.slice(6), level: level};
    scores.push(entry);
    localStorage.setItem("gameScores", JSON.stringify(scores));
}

export function showLeaderBoard() {
    $(".game").html(`
        <menu class="main-menu">
            <table>
                <tr>
                    <th>N</th>
                    <th>Score</th>
                    <th>Time</th>
                    <th>Level</th>
                </tr>
           </table>
           <button class="main-menu-btn back">Back</button>
        </menu>
    `);
    scores.sort((a, b) => {
        if (b.score !== a.score) return a.score - b.score;    
        let sec1 = parseInt(a.time.slice(0,2)) * 60 + parseInt(a.time.slice(3,5))
        let sec2 = parseInt(b.time.slice(0,2)) * 60 + parseInt(b.time.slice(3,5))
        return sec1 - sec2;     
    });
    scores.forEach((score, index) => {
        var order = index;
        if (order == 0) order = "🥇";
        else if (order == 1) order = "🥈";
        else if (order == 2) order = "🥉";
        else order = index + 1;
        $(".game table").append(`<tr>
                                    <td>${order}</td>
                                    <td>${score.score}</td>
                                    <td>${score.time}</td>
                                    <td>${score.level}</td>
                                </tr>`);
    });
}