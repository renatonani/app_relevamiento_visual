import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit {
  constructor(private dataService: DataService) {}

  async ngOnInit() {
    try {
      const imagesBeauty = await this.dataService.getImagesGrafico(true);      
      const imagesNoBeauty = await this.dataService.getImagesGrafico(false); 
      this.createPieChart(imagesBeauty);
      this.createBarChart(imagesNoBeauty);
    } catch (error) {
      console.error(error);
    }
  }

  createPieChart(images: any[]) {
    const pieChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = pieChartCanvas?.getContext('2d');
  
    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas.');
      return; // Salir de la función si no se puede obtener el contexto
    }
    
    const data = {
      labels: images.map((image) => image.usuario), // Reemplaza con el campo correcto de tus imágenes
      datasets: [
        {
          data: images.map((image) => image.votos), // Reemplaza con el campo correcto de votos de tus imágenes
          backgroundColor: [
            '#cb2b2b',
            '#921212',
            '#FFFFFF',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
          ],
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false, // Para ajustar el tamaño del gráfico según el contenedor
    };
  
    new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  }  

  createBarChart(images: any[]) {
    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = barChartCanvas?.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas.');
      return; // Salir de la función si no se puede obtener el contexto
    }

    const data = {
      labels: images.map((image) => image.usuario), // Reemplaza con el campo correcto de tus imágenes
      datasets: [
        {
          label: 'Cantidad de Votos',
          data: images.map((image) => image.votos), // Reemplaza con el campo correcto de votos de tus imágenes
          backgroundColor: '#cb2b2b', // Color de las barras
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false, // Para ajustar el tamaño del gráfico según el contenedor
      scales: {
        y: {
          beginAtZero: true,
          suggestedMin: 0, // Valor mínimo en el eje Y
          suggestedMax: 10, // Valor máximo en el eje Y
        },
      },
    };

    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });
  }
}
