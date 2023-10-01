import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeVoteComponent } from './poke-vote.component';

describe('PokeVoteComponent', () => {
  let component: PokeVoteComponent;
  let fixture: ComponentFixture<PokeVoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeVoteComponent]
    });
    fixture = TestBed.createComponent(PokeVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
