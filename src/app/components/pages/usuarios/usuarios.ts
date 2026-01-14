import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuarios/usuario';
import { SearchComponent } from '../../ui/search/search';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
  usuarios: Usuario[] = [];
  todosUsuarios: Usuario[] = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuarios = data.data;
      this.todosUsuarios = data.data;
    });
  }

  onSearch(term: string) {
    if (!term) {
      this.usuarios = this.todosUsuarios;
    } else {
      const lowerTerm = term.toLowerCase();
      this.usuarios = this.todosUsuarios.filter(u =>
        (u.nombre && u.nombre.toLowerCase().includes(lowerTerm)) ||
        (u.email && u.email.toLowerCase().includes(lowerTerm)) ||
        (u.rol && u.rol.toLowerCase().includes(lowerTerm))
      );
    }
  }
}
