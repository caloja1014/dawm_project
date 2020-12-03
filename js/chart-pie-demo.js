// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example


let cargarJSON = () =>{
  fetch("data/ventaCat.json")
  .then(response => response.json())
  .then(json =>{
    let ctx = document.getElementById("myPieChart");
    let porcentajes = []
    categorias= ["Navidad", "Camisetas", "Regalos","Jarros","Sueters","Otros"];
    for(cat of categorias){
      let valor = json["categorias"][cat];
      porcentajes.push(parseInt(valor))
    }
    console.log(ctx.innerHTML)
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categorias,
        datasets: [{
          data: porcentajes,
          backgroundColor: ['#9D1515','#D40A18','#F1441C','#FE761E','#3A778A','#192D36'],
          hoverBackgroundColor: ['#890d0d','#bf0713','#e53a14','#e86819','#2b6272','#132730'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 0,
      },
    });
  })
}




document.addEventListener('DOMContentLoaded', ()=> {
  cargarJSON();
});