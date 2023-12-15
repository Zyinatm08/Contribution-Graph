fetch("https://dpg.gg/test/calendar.json")
  .then((response) => response.json())
  .then((data) => {
    processDataAndBuildChart(data);
  })
  .catch((error) => console.error("Ошибка:", error));

function processDataAndBuildChart(data) {
  const currentDate = new Date();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 50 * 7);

  const chartContainer = document.getElementById("chart-container");

  const table = document.createElement("table");

  let currentDatePointer = new Date(startDate);
  for (let i = 0; i < 7; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 51; j++) {
      const cell = document.createElement("td");
      const dateString = currentDatePointer.toISOString().split("T")[0];

      if (data[dateString]) {
        const contributions = data[dateString];
        let colorClass = "";

        if (contributions === 0) {
          colorClass = "no-contributions";
        } else if (contributions >= 1 && contributions <= 9) {
          colorClass = "low-contributions";
        } else if (contributions >= 10 && contributions <= 19) {
          colorClass = "medium-contributions";
        } else if (contributions >= 20 && contributions <= 29) {
          colorClass = "high-contributions";
        } else {
          colorClass = "max-contributions";
        }

        cell.addEventListener("mouseover", function () {
          showTooltip(cell.title);
        });
        cell.addEventListener("mouseout", function () {
          hideTooltip();
        });

        cell.classList.add(colorClass);
        cell.title = `Data: ${dateString}\nContribution: ${contributions}`;
      } else {
        cell.classList.add("no-contributions");
      }

      row.appendChild(cell);
      currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    }

    table.appendChild(row);
  }

  chartContainer.appendChild(table);
}
