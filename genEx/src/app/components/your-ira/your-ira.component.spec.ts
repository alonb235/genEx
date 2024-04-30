import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourIraComponent } from './your-ira.component';

describe('YourIraComponent', () => {
  let component: YourIraComponent;
  let fixture: ComponentFixture<YourIraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourIraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourIraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
