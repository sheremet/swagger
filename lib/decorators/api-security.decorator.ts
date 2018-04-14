import {DECORATORS} from '../constants';
import {createMixedDecorator} from './helpers';

export interface IApiSecurityProperties {
  securityPropName: string;
  type: string;
  name: string;
  in: 'body' | 'query' | 'header';
}

export const ApiSecurity = (metadata: IApiSecurityProperties | IApiSecurityProperties[]) => {
  if (Array.isArray(metadata)) {
    return createMixedDecorator(DECORATORS.API_SECURITY, metadata);
  } else {
    return createMixedDecorator(DECORATORS.API_SECURITY, [metadata]);
  }
};
