import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from '../../classes/Card';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { EvaluationService } from '../evaluation.service';
import { Evaluation } from 'src/classes/Evaluation';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-popup-card',
  templateUrl: './popup-card.component.html',
  styleUrls: ['./popup-card.component.css']
})
export class PopupCardComponent implements OnInit, OnChanges {
  @Input() card!: Card;
  currentRate: number;
  currentEvalId: number = 0;
  list: number = 0;
  evallist: Evaluation[] = [];
  moyenne: number | null = null;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private evaluationService: EvaluationService
  ) {
    this.currentRate = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && !changes['card'].firstChange) {
      this.getMoyenne().then(newMoyenne => {
        this.moyenne = newMoyenne;
      }).catch(error => {
        console.log("Erreur lors du recalcul de la moyenne :", error);
      });
    }
  }
  

  ngOnInit(): void {
    this.getMoyenne().then(newMoyenne => {
      this.moyenne = newMoyenne;
    }).catch(error => {
      console.log("Erreur lors du calcul de la moyenne :", error);
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }

  ajouterPanier(): void {
    if (this.card.quantity > 0) {
      this.card.quantity -= 1;
    }
  }

  retirerPanier(): void {
    this.card.quantity += 1;
  }

  getUserService(): UserService {
    return this.userService;
  }

  createOrUpdateEvaluation(): void {
    const user_id = this.userService.getUserId();
    const card_id = this.card.id;
    const rate = this.currentRate;

    this.evaluationService.getData().subscribe(
      data => {
        this.evallist = data;

        this.evallist = this.evallist.filter(evaluation => evaluation.user_id === this.userService.getUserId() && evaluation.card_id === this.card.id);

        if (this.evallist.length > 0) {
          this.currentEvalId = this.evallist[0].id;
          this.evaluationService.updateEval(this.currentEvalId, rate).subscribe(() => {
            this.getMoyenne().then(newMoyenne => {
              this.moyenne = newMoyenne;
            }).catch(error => {
              console.log("Erreur lors du recalcul de la moyenne :", error);
            });
          });
        } else {
          //currentEvalId : autoincrement
          this.evaluationService.addEval({ id: this.currentEvalId, user_id: Number(user_id), card_id: card_id, rate: rate }).subscribe(
            () => {
              this.getMoyenne().then(newMoyenne => {
                this.moyenne = newMoyenne;
              }).catch(error => {
                console.log("Erreur lors du recalcul de la moyenne :", error);
              });
              console.log("Evaluation ajoutée");
            },
            (error: HttpErrorResponse) => console.log(error)
          );
        }
      },
      error => {
        console.log("Erreur lors de la récupération des évaluations :", error);
      }
    );
  }

  getMoyenne(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.evaluationService.getData().subscribe(
        data => {
          const fulllist: Evaluation[] = data.filter(evaluation => evaluation.card_id === this.card.id);

          let sum = 0;
          for (let i = 0; i < fulllist.length; i++) {
            // console.log("Rate : " + fulllist[i].rate)
            sum += fulllist[i].rate;
          }

          const moyenne = sum / fulllist.length;
          resolve(moyenne);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  get moyenneAffichage(): string {
    if (this.moyenne !== null) {
      // console.log("Moyenne : " + this.moyenne.toString());
      return this.moyenne.toString();
    } else {
      return "Aucun avis";
    }
  }
}
