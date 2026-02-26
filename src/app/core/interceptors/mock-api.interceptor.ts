import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MOCK_DASHBOARD_STATS } from '../../mock/dashboard.mock';
import { MOCK_COMPANIES } from '../../mock/companies.mock';
import { MOCK_EMPLOYEES } from '../../mock/employees.mock';
import { MOCK_RIDES } from '../../mock/rides.mock';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMocks) {
    return next(req);
  }

  const url = req.url;

  if (url.endsWith('/api/dashboard/stats')) {
    return of(new HttpResponse({ status: 200, body: MOCK_DASHBOARD_STATS })).pipe(delay(300));
  }

  if (url.endsWith('/api/companies')) {
    return of(new HttpResponse({ status: 200, body: MOCK_COMPANIES })).pipe(delay(300));
  }

  if (url.endsWith('/api/employees')) {
    return of(new HttpResponse({ status: 200, body: MOCK_EMPLOYEES })).pipe(delay(300));
  }

  if (url.endsWith('/api/rides')) {
    return of(new HttpResponse({ status: 200, body: MOCK_RIDES })).pipe(delay(300));
  }

  return next(req);
};
