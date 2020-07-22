import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend } from 'ng2-charts';
import { BrandService } from 'src/app/_services/brand.service';
import { Brand } from 'src/app/_models/brand';

@Component({
  selector: 'app-brand-chart',
  templateUrl: './brand-chart.component.html',
  styleUrls: ['./brand-chart.component.css']
})
export class BrandChartComponent implements OnInit {

  brands: Brand[] = [];
  isFetchingBrands = false;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] =
    ['Acer', 'Alienware', 'Apple', 'Asus', 'Dell', 'Hp', 'Lenovo', 'Microsoft', 'msi', 'Razer', 'Thinkpad'];
  public pieChartData: SingleDataSet = [300, 500, 100, 300, 500, 100, 300, 500, 100, 300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private brandService: BrandService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    this.isFetchingBrands = true;
    this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    }, error => {
      console.log(error);
    }, () => {
      this.loadChart();
      this.isFetchingBrands = false;
    });
  }

  loadChart() {
    this.pieChartLabels = this.brands.map(b => b.brandName);
    this.pieChartData = this.brands.map(b => b.products.length);
  }
}
