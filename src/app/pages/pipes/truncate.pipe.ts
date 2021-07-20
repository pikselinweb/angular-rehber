import { Pipe, PipeTransform } from '@angular/core';
interface TRUNCATE_PIPE {
  limit?: number;
  ellipsis?: string;
}
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: unknown, opt?: TRUNCATE_PIPE): string {
    // metin limiti
    const truncateLimit: number = opt?.limit || 15;
    // değeri metne çevirmek
    const tText: string = `${value}`;
    // metin sonu üç nokta veya ayarlanan şey
    const elipsisType: string = opt?.ellipsis || '...';
    return tText.length > truncateLimit
      ? tText.substring(0, truncateLimit) + elipsisType
      : tText;
  }
}
