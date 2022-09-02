import {Component, OnInit} from '@angular/core'
import {Todo, TodosService} from './todos.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'httpClient-training';

  todos: Todo[] = []
  loading = false
  todoTitle = ''
  error = ''

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
   }
    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
      this.todos.push(todo)
      this.todoTitle = ''
    })
 }

   fetchTodos() {
    this.loading = true
    this.todosService.fetchTodos()
      .subscribe({
        next: todos => {this.todos = todos, this.loading = false},
        error: error => {this.error = error.message}
      })
}

removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id)
      })
}

completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(todo => {
      console.log(todo)
      const findTodos = this.todos.find(t => t.id === todo.id)
      // findTodos?.classList.add('bg-yellow');
    })
  }
 }

