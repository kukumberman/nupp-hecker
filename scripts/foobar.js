(function() {
  // todo fetch info inside class="generaltable generalbox quizreviewsummary"

  // class="que multichoice deferredfeedback complete"
  const elements = Array.from(document.querySelectorAll(".que.multichoice"))
  const entries = elements.map(element => {
    const points = element.querySelector(".info > .grade").textContent
    const question = element.querySelector(".content .qtext").textContent
    const variants = Array.from(element.querySelector(".answer").children)
    const selected = variants
      .filter(div => {
        const checked = div.querySelector("input").checked
        return checked
      })
      .map(div => {
        return div.textContent
      })

    const correct = element.querySelector(".content .feedback")?.textContent || null
    return {
      question,
      selected,
      points,
      correct,
    }
  })
  const cmid = new URLSearchParams(window.location.search).get("cmid")

  const data = {
    link: `https://dist.nupp.edu.ua/mod/quiz/view.php?id=${cmid}`,
    entries: entries.sort((a, b) => {
      if (a.correct == null || b.correct == null) return 0
      //https://stackoverflow.com/questions/17387435/javascript-sort-array-of-objects-by-a-boolean-property
      return (a.correct === b.correct) ? 0 : (a.correct == "Ваша відповідь правильна." ? -1 : 1)
    })
  }

  const str = JSON.stringify(data, null, 2)
  console.log(str)
  
  window.navigator.clipboard
    .writeText(str)
    .then(() => console.log("copied"))
    .catch(err => console.log("😡", err))
})()
