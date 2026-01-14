import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-eliminar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './c-eliminar.html',
  styleUrl: './c-eliminar.scss',
})
export class CEliminar implements OnInit {
  tipo: 'peluqueria' | 'categoria' | 'usuario' | null = null;
  id: number | null = null;

  // Data for display
  itemNombre: string = '';
  itemDetalles: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuariosService: UsuariosService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.id = params['id'];
    });
  }

  eliminar() {
    if (!this.id) return;

    if (this.tipo === 'peluqueria') {
      this.peluqueriasService.eliminarPeluqueria(Number(this.id)).subscribe(() => {
        alert('Peluqueria eliminada');
        this.router.navigate(['/peluquerias']);
      });
    } else if (this.tipo === 'usuario') {
      this.usuariosService.eliminarUsuario(Number(this.id)).subscribe(() => {
        alert('Usuario eliminado');
        this.router.navigate(['/usuarios']);
      });
    } else if (this.tipo === 'categoria') {
      this.categoriasService.eliminarCategoria(Number(this.id)).subscribe(() => {
        alert('Categoria eliminada');
        this.router.navigate(['/categorias']);
      });
    } else if (this.tipo === 'producto') {
      this.productosService.eliminarProducto(Number(this.id)).subscribe(() => {
        alert('Producto eliminado');
        this.router.navigate(['/productos']);
      });
    }
  }
}
