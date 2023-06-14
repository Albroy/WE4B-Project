import { Component, OnInit } from '@angular/core';
import { User } from "../../classes/User";
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { FileUploadService } from '../file-upload.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  isModalOpen = false; //suivre l'état du modal

  user: User;
  userString: string | null = sessionStorage.getItem('user');
  file: File | null = new File([], "");
  filename: string = "../assets/profilepic1.png";
  pwd: string;
  newpwd: string = "";
  newpwdtmp: string = "";

  constructor(private userService: UserService, private datePipe: DatePipe, private modalService: NgbModal, private fileUploadService: FileUploadService, private router: Router) {
    // console.log(sessionStorage.getItem('user'));
    this.pwd = "";
    if (this.userString) { // Si on est connecté
      this.user = JSON.parse(this.userString);
      // console.log(this.user);
    } else {
      this.user = new User(0, "", "", "", "", 0, new Date(), "", "");
    }
  }


  onPwdInputChange(newValue: string) {
    this.newpwd = newValue;
    this.newpwdtmp = newValue;
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true }); // Ouvre le modal
    this.isModalOpen = true;
  }

  closeModal() {
    this.modalService.dismissAll(); // Ferme le modal
    this.isModalOpen = false;
  }
  onFileSelected(event: any) {
    const tmp: File = event.target.files[0];
    this.filename = this.user.id + "_pp.jpg";
    this.previewImage(tmp);
    console.log(this.file);
    this.file = new File([tmp], this.filename, { type: tmp.type });
    console.log(this.file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.user.user_pp = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.file) {
      // this.fileUploadService.upload(this.file).subscribe( : a completer
    }

  }
  onSubmitInfos() {
    console.log(this.isFormInfosValid());
    if (this.isFormInfosValid().valid) {
      this.user.user_desc ? this.user.user_desc : this.user.user_desc = "";
      this.userService.updateUser(this.user.id, this.filename, this.user.user_surname, this.user.user_name, this.user.user_phone, this.user.user_loc, this.user.user_desc).subscribe(data => {
        this.user = data;
        console.log(this.user);
      });
      //UPDATE SESSION

      window.location.reload();

    }
  }
  onSubmitMdp() {
    console.log(this.isPasswordValid());
    if (this.isPasswordValid().valid) {
      console.log(this.user.user_pwd);
      this.userService.updatePwd(this.user.id, this.newpwdtmp).subscribe(data => { this.user = data });
      console.log(this.user.user_pwd);
      //UPDATE SESSION
      // window.location.reload();
    }
  }

  ngOnInit() {
    this.userService.checkUserSession() ? '' : this.router.navigateByUrl('');
  }

  isFormInfosValid(): { valid: boolean, error: string } {
    const { user_name, user_surname, user_loc, user_phone } = this.user;
    const fromat_name = /^[a-zA-Z\s]*$/; //autoriser uniquement des lettres et des espaces
    const format_tel = /^[0-9]{10}$/; //autoriser uniquement des chiffres et 10 caractères
    // Vérification des champs requis
    if (!user_name || !user_surname || !user_loc || !user_phone) {
      return { valid: false, error: "Veuillez remplir tous les champs." };
    }
    if (!fromat_name.test(user_name) || !fromat_name.test(user_surname)) {
      console.log(" : ", fromat_name.test(user_name));
      return { valid: false, error: "Veuillez ne pas utiliser de caractères spéciaux." };
    }
    if (!format_tel.test(String(user_phone))) {
      return { valid: false, error: "Veuillez entrer un numéro de téléphone valide." };
    }
    return { valid: true, error: "" };
  }
  isPasswordValid(): { valid: boolean, error: string } {
    if (!bcrypt.compareSync(this.pwd, this.user.user_pwd)) {
      return { valid: false, error: "Mot de passe incorrect." };
    } else {
      this.newpwdtmp = bcrypt.hashSync(this.newpwdtmp, 10);
      return { valid: true, error: "" };
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('Utilisateur supprimé avec succès.');
      this.userService.deleteUserSession()
      window.location.reload();
    });
  }
  getUserService() {
    return this.userService;
  }

}
