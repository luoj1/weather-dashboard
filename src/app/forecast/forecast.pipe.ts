import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'round'})
export class maths implements PipeTransform {
  transform(value: number, round: string): number {
    let r = parseInt(round);
    return Math.round(value);
  }
}
