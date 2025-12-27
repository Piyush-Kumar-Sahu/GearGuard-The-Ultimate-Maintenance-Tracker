document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("dragend", e => {
    fetch("/update-status", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        id: card.dataset.id,
        status: card.parentElement.dataset.status
      })
    })
  })
})

