const API_URL = "https://bot.w3datanet.com/grammar-checker/check";

document.getElementById("checkBtn").addEventListener("click", async () => {
  const text = document.getElementById("testText").value;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await response.json();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `Corrected: ${data.corrected_text}`;
});
