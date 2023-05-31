
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(NgxWheelComponent, { static: false })
  wheel!: { reset: () => void; spin: () => void; };
user = [...Array(12).keys()];
  idToLandOn: any;
  items!: any[];
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL;
  textAlignment: TextAlignment = TextAlignment.OUTER;
 
  
  
  constructor(private httpClient: HttpClient) { }

ngOnInit(){
  this.httpClient.get('http://localhost:3000/user').subscribe((user:any) =>{
    console.log('res', user)
  });
this.idToLandOn = this.user[Math.floor(Math.random() * this.user.length)];
    const colors = ["#FF0000", "#000000"];
    this.items = this.user.map((value) => ({
      fillStyle: colors[value % 2],
      text: `Prize ${value}`,
      id: value,
      textFillStyle: "white",
      textFontSize: "16"
    }));
  }
  // reset() {
  //   this.wheel.reset();
  // }
  before() {
    alert("Your wheel is about to spin");
  }

  async spin(prize: any) {
    console.log(prize);
    this.idToLandOn = prize;
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.wheel.spin();
  }

  after() {
    alert(this.idToLandOn);
    setTimeout(() => {
      this.wheel.reset();
      this.idToLandOn = this.user[
        Math.floor(Math.random() * this.user.length)
      ];
    }, 2000);
  }
  
}
