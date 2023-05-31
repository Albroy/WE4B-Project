import { Component,OnInit,Input } from '@angular/core';
import { Comment } from '../../classes/Comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit{
  @Input() comment!: Comment;

  constructor() {}

  ngOnInit(): void {}

  decrement(){
    this.comment.likes >0 ? this.comment.likes -= 1 : "";
  }

  increment(){
    this.comment.likes += 1;
  }

}
