import { Injectable } from '@angular/core';
import { Comment } from '../classes/Comment';
import { Card } from 'src/classes/Card';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  Array: Comment[] = []
  constructor() {
    this.Array.push(new Comment(1, "Comment 1", 0, 5, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 1));
    this.Array.push(new Comment(2, "Comment 2", 0, 3, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 1));
    this.Array.push(new Comment(3, "Comment 3", 0, 7, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 2));
    this.Array.push(new Comment(4, "Comment 4", 0, 2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 2));
    this.Array.push(new Comment(5, "Comment 5", 0, 1, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 3));
    this.Array.push(new Comment(6, "Comment 6", 0, 0, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 3));
    this.Array.push(new Comment(7, "Comment 7", 0, 4, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 4));
    this.Array.push(new Comment(8, "Comment 8", 0, 6, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 4));
    this.Array.push(new Comment(9, "Comment 9", 0, 2, "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", new Date(), 5));
   }

  

   getComments(idCard: number): Comment[] {
    const commentsForCard: Comment[] = this.Array.filter(comment => comment.cardid === idCard);
    return commentsForCard;
  }
  
}
