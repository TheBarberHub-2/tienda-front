import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../models/categorias/categoria';
import { SearchComponent } from '../../ui/search/search';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];
  todasCategorias: Categoria[] = [];

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe((response: any) => {
      console.log('Categorias loaded:', response);
      const data = response.data || response;
      this.categorias = data;
      this.todasCategorias = data;
    });
  }

  onSearch(term: string) {
    if (!term) {
      this.categorias = this.todasCategorias;
    } else {
      const lowerTerm = term.toLowerCase();
      this.categorias = this.todasCategorias.filter(c =>
        (c.nombre && c.nombre.toLowerCase().includes(lowerTerm)) ||
        (c.descripcion && c.descripcion.toLowerCase().includes(lowerTerm))
      );
    }
  }
}
