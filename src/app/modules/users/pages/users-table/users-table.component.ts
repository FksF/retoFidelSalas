import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UsersService } from '../../services/users.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../../interfaces/users.interfaces';
import { of, timer, concatMap } from 'rxjs';
import { Routes } from 'src/app/shared/enums/_routes';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { NewPostDialogComponent } from '../../components/new-post-dialog/new-post-dialog.component';
import { Posts } from '../../interfaces/posts.interfaces';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UsersTableComponent implements OnInit {
  dataSource: any[] = [];
  columnsToDisplay = ['Nombre', 'Username', 'Direccion', 'Correo', 'Phone'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Users | null | undefined;
  public loading = false;
  public loaderPosts = false;
  source = of(0);
  currentPostsList: Posts[] = [];

  constructor(
    private usersService: UsersService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    timer(300000)
      .pipe(concatMap(() => this.source))
      .subscribe(() => {
        alert('Su sesion a terminado');
        this.sharedService.redirect(Routes.login);
      });
    this.loading = true;
    this.requestUsers();
  }

  public requestUsers() {
    this.usersService
      .getUsers()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (users) => {
          this.dataSource = users.map((user: Users) => {
            return {
              Nombre: user.name,
              Username: user.username,
              Direccion:
                user.address.suite +
                ' ' +
                user.address.street +
                ', ' +
                user.address.city,
              Correo: user.email,
              Phone: user.phone,
              id: user.id
            };
          });
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          alert('Ocurrio un problema');
        }
      );
  }

  getPosts(expandedElement: Users | null | undefined) {
    this.currentPostsList = [];
    this.loaderPosts = true;
    if (expandedElement) {
      this.usersService
        .getPostsByUser(expandedElement.id)
        .pipe(
          finalize(() => {
            this.loaderPosts = false;
          })
        )
        .subscribe(
          (posts) => {
            this.currentPostsList = posts;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
          }
        );
    }
  }

  getPostsByArrow(expandedElement: Users | null | undefined) {
    this.currentPostsList = [];
    this.loaderPosts = true;
    if (expandedElement) {
      this.usersService
        .getPostsByUser(expandedElement.id)
        .pipe(
          finalize(() => {
            this.loaderPosts = false;
          })
        )
        .subscribe(
          (posts) => {
            this.currentPostsList = posts;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
          }
        );
    }
  }

  createNewPost(user: Users | null | undefined) {
    if (user) {
      const dialogRef = this.dialog.open(NewPostDialogComponent, {
        width: '60%',
        data: user.id
      });
      dialogRef.afterClosed().subscribe((result) => {
        result ? this.getPosts(user) : '';
      });
    }
  }
}
