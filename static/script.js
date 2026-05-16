async function sendLike() {

    const uid = document.getElementById("uid").value;
    const region = document.getElementById("region").value;

    if (!uid) {
        showNotification("❌ Please Enter UID", true);
        return;
    }

    showNotification("⏳ Sending Likes...");

    try {

        const response = await fetch("/send_like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                uid,
                region
            })
        });

        const data = await response.json();

        let statusText = "Unknown";

        if (data.status == 1) {
            statusText = "✅ Success";
        }
        else if (data.status == 2) {
            statusText = "⚠ Already Sent / Limit";
        }
        else {
            statusText = "❌ Failed";
        }

        document.getElementById("result").innerHTML = `

<div class="result-item">
    <span>👤 Nickname:</span>
    <b>${data.PlayerNickname || "N/A"}</b>
</div>

<div class="result-item">
    <span>🆔 UID:</span>
    <b>${data.UID || "N/A"}</b>
</div>

<div class="result-item">
    <span>❤️ Likes Given:</span>
    <b>${data.LikesGivenByAPI || 0}</b>
</div>

<div class="result-item">
    <span>📈 Likes Before:</span>
    <b>${data.LikesbeforeCommand || 0}</b>
</div>

<div class="result-item">
    <span>📉 Likes After:</span>
    <b>${data.LikesafterCommand || 0}</b>
</div>

<div class="result-item">
    <span>🎯 Remaining:</span>
    <b>${data.remains || "N/A"}</b>
</div>

<div class="result-item">
    <span>📡 Status:</span>
    <b>${statusText}</b>
</div>

<hr>

<pre>${JSON.stringify(data, null, 4)}</pre>

`;

        showNotification("✅ Request Completed");

    } catch (error) {

        document.getElementById("result").innerHTML = `
        <div class="result-item">
            <span>❌ Error:</span>
            <b>${error}</b>
        </div>
        `;

        showNotification("❌ Server Error", true);
    }
}

function showNotification(message, error = false) {

    const box = document.getElementById("notification");

    box.style.display = "block";

    box.style.background =
        error ? "#ef4444" : "#22c55e";

    box.innerText = message;

    setTimeout(() => {
        box.style.display = "none";
    }, 4000);
}