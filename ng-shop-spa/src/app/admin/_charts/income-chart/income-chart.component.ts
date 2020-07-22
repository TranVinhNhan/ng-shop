import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CartService } from 'src/app/_services/cart.service';
import { Order } from 'src/app/_models/order';
import 'lodash';
import * as moment from 'moment';

declare var _: any;

@Component({
  selector: 'app-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css']
})
export class IncomeChartComponent implements OnInit {

  orders: Order[] = [];
  income = 0;
  // Bar
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'triệu đồng'
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Series A' }
  ];
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadAllOrders();
  }

  loadAllOrders() {
    this.cartService.getAllOrder().subscribe((response: Order[]) => {
      this.orders = response;
    }, error => console.log(error),
      () => {
        this.loadChart();
      });
  }

  loadChart() {
    const data = this.orders;
    // momentjs + lodash = group days by week
    const groupedData = _.groupBy(data, (dataItem) => moment(dataItem.placedTime).week());
    this.barChartLabels =
      [
        'Tuần ' + (+moment().format('W') - 3),
        'Tuần ' + (+moment().format('W') - 2),
        'Tuần ' + (+moment().format('W') - 1),
        'Tuần ' + moment().format('W')
      ];

    // const weekData = groupedData[28].map(item => item.orderDetails);
    const recentWeeks = [(+moment().format('W') - 3), (+moment().format('W') - 2), (+moment().format('W') - 1), +moment().format('W')]
    const result = [];
    recentWeeks.forEach(weekNumber => {
      const weekRawData = groupedData[weekNumber];
      if (weekRawData) {
        // Dữ liệu đầy đủ của từng order trong tuần được map lại và chỉ lấy orderDetails
        const weekData = groupedData[weekNumber].map(item => item.orderDetails);
        const totalPriceArray = []; // Array chứa tổng tiền của từng đơn hàng
        let sum = 0;
        weekData.forEach(item => {
          item.forEach(detail => {
            totalPriceArray.push((detail.quantity * detail.pricePerUnit)); // Tính tổng tiền của từng đơn hàng 1 tuần
          });
        });

        totalPriceArray.forEach(item => {
          sum += item;
        });
        result.push(sum / 1000000); // array chứa kết quả hiển thị lên chart
      } else {
        result.push(0);
      }
    });

    this.barChartData = [
      { data: result, label: 'Doanh số' }
    ];

    result.forEach(item => {
      this.income += item;
    });
  }
}
