import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-c-ver',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './c-ver.html',
    styleUrl: './c-ver.scss',
})
export class CVer implements OnInit {
    tipo: 'peluqueria' | 'categoria' | 'usuario' | 'producto' | null = null;
    id: number | null = null;

    data: any = null;

    constructor(
        private route: ActivatedRoute,
        private peluqueriasService: PeluqueriasService,
        private categoriasService: CategoriasService,
        private usuariosService: UsuariosService,
        private productosService: ProductosService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.tipo = params['tipo'];
            this.id = params['id'];

            if (!this.id) {
                console.error('Falta ID en los parámetros');
                return;
            }

            if (this.tipo === 'peluqueria') {
                this.loadPeluqueria(Number(this.id));
            } else if (this.tipo === 'categoria') {
                this.loadCategoria(Number(this.id));
            } else if (this.tipo === 'usuario') {
                this.loadUsuario(Number(this.id));
            } else if (this.tipo === 'producto') {
                this.loadProducto(Number(this.id));
            }
        });
    }

    private extractData(response: any): any {
        let extracted = response.data || response;
        if (Array.isArray(extracted)) {
            extracted = extracted.length > 0 ? extracted[0] : null;
        }
        return extracted;
    }

    loadUsuario(id: number) {
        this.usuariosService.verUsuario(id).subscribe({
            next: (res) => {
                console.log('Usuario raw:', res);
                this.data = this.extractData(res);
                console.log('Usuario extracted:', this.data);
            },
            error: (err) => console.error('Error cargando usuario:', err)
        });
    }

    loadPeluqueria(id: number) {
        this.peluqueriasService.verPeluqueria(id).subscribe({
            next: (res) => {
                console.log('Peluqueria raw:', res);
                this.data = this.extractData(res);
                console.log('Peluqueria extracted:', this.data);
            },
            error: (err) => console.error('Error cargando peluquería:', err)
        });
    }

    loadCategoria(id: number) {
        this.categoriasService.verCategoria(id).subscribe({
            next: (res) => {
                console.log('Categoria raw:', res);
                this.data = this.extractData(res);
                console.log('Categoria extracted:', this.data);
            },
            error: (err) => console.error('Error cargando categoría:', err)
        });
    }

    loadProducto(id: number) {
        this.productosService.verProducto(id).subscribe({
            next: (res) => {
                console.log('Producto raw:', res);
                this.data = this.extractData(res);
                console.log('Producto extracted:', this.data);
            },
            error: (err) => console.error('Error cargando producto:', err)
        });
    }
}
