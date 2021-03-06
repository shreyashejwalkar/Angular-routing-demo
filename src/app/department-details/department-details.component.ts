import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap,} from '@angular/router';

@Component({
  selector: 'app-department-details',
  template: `
    <p>
      You selected Department with Id : {{departmentId}}
    </p>
    <p>
      <button (click)="showOverview()">Overview</button>
      <button (click)="showContact()">Contact</button>
    </p>
    <router-outlet></router-outlet>
    <a (click)="goPrevious()">Previous</a>
    <a (click)="goNext()">Next</a>

    <!--Optional route parameter -->
    <a (click)="gotoDepartments()">Back</a>
  `,
  styles: []
})
export class DepartmentDetailsComponent implements OnInit 
{

  public departmentId;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit()
  {
   // let id= parseInt(this.route.snapshot.paramMap.get('id'));
   // this.departmentId=id;
    this.route.paramMap.subscribe((params: ParamMap) => 
    {
      let id = parseInt(params.get('id'));
      this.departmentId = id;
    });
   
  }
  goPrevious() {
    let previousId = this.departmentId - 1;
    this.router.navigate(['/departments', previousId]);
  }
  goNext() {
    let nextId = this.departmentId + 1;
    this.router.navigate(['/departments', nextId]);
  }
  gotoDepartments()
  {
    let selectedId = this.departmentId ? this.departmentId : null;
    //this.router.navigate(['/departments', {id: selectedId}]); 
    this.router.navigate(['../',{id: selectedId}], {relativeTo: this.route});
  }
  showOverview()
  {
    this.router.navigate(['overview'],{relativeTo: this.route});
  }
  showContact()
  {
    this.router.navigate(['contact'],{relativeTo: this.route});
  }
}
