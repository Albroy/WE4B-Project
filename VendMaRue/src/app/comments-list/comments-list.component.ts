import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/classes/Comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  CommentArray: Comment[] = [];
  @Input() idCard!: number;

  constructor(private service: CommentService) { }

  ngOnInit(): void {
    this.CommentArray = this.service.getComments(this.idCard);
    console.log("this idCard = " + this.idCard);
  }
}
