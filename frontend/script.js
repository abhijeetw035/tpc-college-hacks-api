const BASE_URL = "https://college-hacks-iaq4.onrender.com"; 

// Submit a new hack (POST)
document.getElementById("hackForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;

  try {
    const res = await fetch(`${BASE_URL}/api/hacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });

    const data = await res.json();
    alert("Hack submitted!");
    document.getElementById("hackForm").reset();
  } catch (err) {
    alert("Error submitting hack.");
    console.error(err);
  }
});

// fetch
document.getElementById("fetchBtn").addEventListener("click", async () => {
  const category = document.getElementById("filterCategory").value;
  const url = category
    ? `${BASE_URL}/api/hacks?category=${category}`
    : `${BASE_URL}/api/hacks`;

  try {
    const res = await fetch(url);
    const hacks = await res.json();
    console.log(hacks);

    const container = document.getElementById("hacksContainer");
    container.innerHTML = "";
    hacks.forEach((hack) => {
      const div = document.createElement("div");
      div.className = "hack";
      div.innerHTML = `
        <h3>${hack.title}</h3>
        <p>${hack.description}</p>
        <small>Category: ${hack.category}</small>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    alert("Error fetching hacks.");
    console.error(err);
  }
});
