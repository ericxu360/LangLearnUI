import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListingComponent } from './chat-listing.component';

describe('ChatListingComponent', () => {
  let component: ChatListingComponent;
  let fixture: ComponentFixture<ChatListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
