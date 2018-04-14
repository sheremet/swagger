import {DECORATORS} from '../constants';
import {IApiSecurityProperties} from '../decorators/api-security.decorator';

export const pushCustomSecurities = (security, method) => {
  const customSecurities: IApiSecurityProperties[] = Reflect.getMetadata(
    DECORATORS.API_SECURITY,
    method,
  );
  if (customSecurities && customSecurities.length) {
    for (const sec of customSecurities) {
      const customSecurity = {...sec};
      const propName = customSecurity.securityPropName;
      delete customSecurity.securityPropName;
      security.push({[propName]: customSecurity});
    }
  }
};

export const exploreGlobalApiSecurityMetadata = metatype => {
  const bearer = Reflect.getMetadata(DECORATORS.API_BEARER, metatype);
  const oauth2 = Reflect.getMetadata(DECORATORS.API_OAUTH2, metatype);

  const security = [];
  bearer && security.push({bearer});
  oauth2 && security.push({oauth2});
  pushCustomSecurities(security, metatype);
  return security.length > 0 ? {security} : undefined;
};

export const exploreApiSecurityMetadata = (instance, prototype, method) => {
  const bearer = Reflect.getMetadata(DECORATORS.API_BEARER, method);
  const oauth2 = Reflect.getMetadata(DECORATORS.API_OAUTH2, method);
  const security = [];
  bearer && security.push({bearer});
  oauth2 && security.push({oauth2});
  pushCustomSecurities(security, method);
  return security.length ? security : undefined;
};
