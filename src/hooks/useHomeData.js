import useApi from './useApi.js';
import { getDashboardSummary } from '../api/dashboardApi.js';
import { getRecords } from '../api/crudApi.js';
import { getHomeContent } from '../api/websiteApi.js';

export default function useHomeData() {
  return useApi(async () => {
    const [content, dashboard, apartments, owners] = await Promise.all([
      getHomeContent(),
      getDashboardSummary(),
      getRecords('/apartments'),
      getRecords('/owners'),
    ]);

    const availableApartments = Array.isArray(apartments)
      ? apartments.filter((item) => item.status?.toLowerCase() === 'available')
      : [];

    return {
      content,
      dashboard,
      properties: availableApartments.slice(0, 6),
      owners: Array.isArray(owners) ? owners.slice(0, 3) : [],
    };
  }, []);
}
