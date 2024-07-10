import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

export type PersonUtilFunctionName = keyof typeof PersonUtils;

export type Params<T extends PersonUtilFunctionName> = Parameters<
  (typeof PersonUtils)[T]
>;

export type FirstArg<Y> = Y extends [infer First, ...unknown[]] ? First : never;
export type LastArgs<Y> = Y extends [unknown, ...infer Rest] ? Rest : never;

@Pipe({
  name: 'utilsWrapper',
  standalone: true,
})
export class UtilsWrapperPipe implements PipeTransform {
  transform<T extends PersonUtilFunctionName>(
    value: FirstArg<Params<T>>,
    functionName: T,
    ...args: LastArgs<Params<T>>
  ): ReturnType<(typeof PersonUtils)[T]> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const func = PersonUtils[functionName] as Function;

    return func(value, ...args);
  }
}

// new UtilsWrapperPipe().transform('')
