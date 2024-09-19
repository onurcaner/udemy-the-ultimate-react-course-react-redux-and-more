import { appRevalidates } from '@/app/_appRevalidates';
import { getCabins } from '@/app/_services/apiCabins';

export const revalidate = appRevalidates.cabins;

export async function GET() {
  const cabins = await getCabins();

  return Response.json({
    status: 'success',
    data: {
      cabins,
    },
  });
}
