import { Component, OnInit } from '@angular/core';
import { CPanel } from '../../ui/c-panel/c-panel';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CPanel],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
  peluqueriasCount: number = 0;
  categoriasCount: number = 0;
  usuariosCount: number = 0;
  productosCount: number = 0;

  constructor(
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuariosService: UsuariosService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.peluqueriasService.getPeluquerias().subscribe((data) => {
      this.peluqueriasCount = data.totalElements;
    });

    this.categoriasService.getCategorias().subscribe((data) => {
      this.categoriasCount = data.totalElements;
    });

    this.usuariosService.getUsuarios().subscribe((data) => {
      this.usuariosCount = data.totalElements;
    });
    this.productosService.getProductos().subscribe((data) => {
      this.productosCount = data.totalElements;
    });
  }
}
