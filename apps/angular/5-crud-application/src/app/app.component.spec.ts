import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TodoService } from './data-access/todo.service';
import { Todo } from './model/todo.model';

const resetSpy = (o: { [key: string]: jest.Mock }) => {
  for (const key in o) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      o[key].mockReset();
    }
  }
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const todoServiceSpy = {
    getAllTodos: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    loading: jest.fn().mockReturnValue(false),
    todos: jest.fn().mockReturnValue([]),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TodoService,
          useValue: todoServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    resetSpy(todoServiceSpy);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should load spinner when request loading', () => {
    todoServiceSpy.loading.mockReturnValue(true);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(
      By.directive(MatProgressSpinner),
    );
    expect(spinner).toBeDefined();
  });

  it('should load todo items when request completed', () => {
    const todo: Todo = {
      id: 1,
      title: 'title',
      completed: false,
      userId: 2,
      body: 'some body',
    };
    todoServiceSpy.loading.mockReturnValue(false);
    todoServiceSpy.todos.mockReturnValue([todo]);
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(
      By.directive(MatProgressSpinner),
    );
    expect(spinner).not.toBeTruthy();
    const todoItems = fixture.debugElement.queryAll(By.css('.todo-item'));
    expect(todoItems).toBeDefined();
  });
});
