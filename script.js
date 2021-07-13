const DATA_SOURCE = [
  {
    id: "jlpt",
    url: "data_jlpt.json",
    keys: ["N1", "N2", "N3", "N4", "N5"],
  },
  {
    id: "joyo",
    url: "data_joyo.json",
    keys: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 9"],
  },
  {
    id: "frequency",
    url: "data_freq.json",
    keys: ["F1", "F2", "F3", "F4", "F5"],
  },
  {
    id: "reading",
    url: "data_reading.json",
    keys: ["Aozora Books", "NHK Easy", "Online News", "Twitter", "Wikipedia"],
  },
];

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  options: {
    scales: {
      x: { title: { text: "Level", display: true } },
      y: {
        title: { text: "Percentage completion", display: true },
        ticks: { callback: (value) => value + "%" },
      },
    },
  },
});

Promise.all(DATA_SOURCE.map((d) => fetch(d.url).then((res) => res.json()))).then((response) => {
  change_chart("jlpt");

  const $type = document.querySelector("#type");
  $type.addEventListener("change", (e) => {
    console.log(`e.target.value`, e.target.value);
    change_chart(e.target.value);
  });

  function change_chart(id) {
    const dataIndex = DATA_SOURCE.findIndex((x) => x.id === id);
    const d = response[dataIndex];

    myChart.data.labels = d.map((x) => x.level);
    myChart.data.datasets = DATA_SOURCE[dataIndex].keys.map((level) => {
      var color = Colors.random();
      return {
        label: level,
        data: d,
        parsing: { xAxisKey: "level", yAxisKey: level },
        borderColor: color,
        backgroundColor: Colors.addAlpha(color, 0.2),
        fill: true,
      };
    });
    myChart.update();
  }
});
