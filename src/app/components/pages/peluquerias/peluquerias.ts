import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { PeluqueriaSummary } from '../../../models/peluquerias/peluqueria.summary';
import { SearchComponent } from '../../ui/search/search';

@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './peluquerias.html',
  styleUrl: './peluquerias.scss',
})
export class Peluquerias implements OnInit {
  peluquerias: PeluqueriaSummary[] = [];
  todasPeluquerias: PeluqueriaSummary[] = [];

  constructor(private peluqueriasService: PeluqueriasService) { }

  ngOnInit() {
    this.peluqueriasService.getPeluquerias().subscribe((response: any) => {
      console.log('Peluquerias loaded:', response);
      const data = response.data || response;
      this.peluquerias = data;
      this.todasPeluquerias = data;
    });
  }

  onSearch(term: string) {
    if (!term) {
      this.peluquerias = this.todasPeluquerias;
    } else {
      const lowerTerm = term.toLowerCase();
      this.peluquerias = this.todasPeluquerias.filter(p =>
        p.nombre.toLowerCase().includes(lowerTerm) ||
        (p.municipio && p.municipio.toLowerCase().includes(lowerTerm)) ||
        (p.direccion && p.direccion.toLowerCase().includes(lowerTerm)) ||
        (p.telefono && p.telefono.includes(lowerTerm))
      );
    }
  }
}
