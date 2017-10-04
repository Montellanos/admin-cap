import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleformat'
})
export class RoleformatPipe implements PipeTransform {

  transform(role: string, params: string): string {
    if (role !== null || role !== undefined) {
      if (role === 'admin') {
        return 'Administrador';
      } else {
        if (role === 'editor') {
          return 'Editor';
        } else {
          return role;
        }
      }
    }
  }

}
