import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';
import { Rol } from '../../../enums/rol.enum';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-c-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './c-crear.html',
  styleUrl: './c-crear.scss',
})
export class CCrear implements OnInit {
  tipo: 'peluqueria' | 'categoria' | null = null;
  peluqueriaForm!: FormGroup;
  categoriaForm!: FormGroup;
  usuarioForm!: FormGroup;
  productoForm!: FormGroup;
  roles = Object.values(Rol);
  usuarios: any[] = [];
  peluquerias: any[] = [];
  categorias: any[] = [];
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuarioService: UsuariosService,
    private productoService: ProductosService,
    private router: Router
  ) {
    this.initForms();
  }

  ngOnInit() {
    // Solo obtenemos el tipo de formulario a mostrar
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
    });
    this.usuarioService.getAvailable().subscribe((data) => {
      this.usuarios = data;
    });
    this.peluqueriasService.getPeluquerias().subscribe((data) => {
      this.peluquerias = data.data;
    });
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data.data;
    });
  }

  initForms() {
    // Formulario vacío para crear nueva peluquería
    this.peluqueriaForm = this.fb.group({
      usuarioId: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      municipio: ['', Validators.required],
    });

    // Formulario vacío para crear nueva categoría
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
    });

    this.usuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      contrasenya: ['', Validators.required],
      rol: ['', Validators.required],
    });

    this.productoForm = this.fb.group({
      categoriaId: ['', Validators.required],
      peluqueriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
    });
  }

  onSubmitPeluqueria() {
    if (this.peluqueriaForm.valid) {
      console.log('Nueva peluquería a crear:', this.peluqueriaForm.value);
      this.peluqueriasService.crearPeluqueria(this.peluqueriaForm.value).subscribe({
        next: () => {
          this.peluqueriaForm.reset();
          alert('Peluquería creada correctamente');
          this.router.navigate(['/peluquerias']);
        },
        error: (err) => {
          this.error = err.error?.message;
        },
      });
    }
  }

  onSubmitCategoria() {
    if (this.categoriaForm.valid) {
      console.log('Nueva categoría a crear:', this.categoriaForm.value);
      this.categoriasService.crearCategoria(this.categoriaForm.value).subscribe({
        next: () => {
          this.categoriaForm.reset();
          alert('Categoría creada correctamente');
          this.router.navigate(['/categorias']);
        },
        error: (err) => {
          this.error = err.error?.message;
        },
      });
    }
  }

  onSubmitUsuario() {
    if (this.usuarioForm.valid) {
      console.log('Nuevo usuario a crear:', this.usuarioForm.value);
      this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
        next: () => {
          this.usuarioForm.reset();
          alert('Usuario creado correctamente');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          this.error = err.error?.message;
        },
      });
    }
  }

  onSubmitProducto() {
    if (this.productoForm.valid) {
      console.log('Nuevo producto a crear:', this.productoForm.value);
      this.productoService.crearProducto(this.productoForm.value).subscribe({
        next: () => {
          this.productoForm.reset();
          alert('Producto creado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          this.error = err.error?.message;
        },
      });
    }
  }
}
