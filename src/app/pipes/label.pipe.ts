import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/config/config.service';

@Pipe({
  name: 'label',
  standalone: true,
})
export class LabelPipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  transform(key: string, section: string = 'common'): string {
    return this.configService.getLabel(section, key);
  }
}
