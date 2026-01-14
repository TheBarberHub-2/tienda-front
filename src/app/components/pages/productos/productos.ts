import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { ProductoSummary } from '../../../models/productos/producto.summary';
import { SearchComponent } from "../../ui/search/search";

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos implements OnInit {
  productos: ProductoSummary[] = [];
  todosProductos: ProductoSummary[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProductos().subscribe((response: any) => {
      console.log('Productos loaded:', response);
      const data = response.data || response;
      this.productos = data;
      this.todosProductos = data;
    });
  }

  onSearch(term: string) {
    if (!term) {
      this.productos = this.todosProductos;
    } else {
      const lowerTerm = term.toLowerCase();
      this.productos = this.todosProductos.filter(p =>
        (p.id && p.id.toString().includes(lowerTerm)) ||
        (p.nombre && p.nombre.toLowerCase().includes(lowerTerm)) ||
        (p.peluqueria && p.peluqueria.toLowerCase().includes(lowerTerm)) ||
        (p.precio && p.precio.toString().includes(lowerTerm)) ||
        (p.duracion && p.duracion.toString().includes(lowerTerm))
      );
    }
  }
}
