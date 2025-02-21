// home.component.ts
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  performanceChart: any;

  ngOnInit() {
    this.initializeChart();
  }

  initializeChart() {
    const ctx = document.getElementById('performanceChart') as HTMLCanvasElement;
    
    this.performanceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Term 1', 'Term 2', 'Term 3'],
        datasets: [
          {
            label: 'Form 1',
            data: [7.2, 7.5, 7.8],
            borderColor: '#9c27b0',
            tension: 0.4
          },
          {
            label: 'Form 2',
            data: [6.8, 7.0, 7.2],
            borderColor: '#4caf50',
            tension: 0.4
          },
          {
            label: 'Form 3',
            data: [6.5, 6.7, 6.9],
            borderColor: '#2196f3',
            tension: 0.4
          },
          {
            label: 'Form 4',
            data: [7.5, 7.6, 7.8],
            borderColor: '#ff9800',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            min: 6,
            max: 8,
            grid: {
              color: '#3d3d3d'
            },
            ticks: {
              color: '#fff'
            }
          },
          x: {
            grid: {
              color: '#3d3d3d'
            },
            ticks: {
              color: '#fff'
            }
          }
        }
      }
    });
  }
}
